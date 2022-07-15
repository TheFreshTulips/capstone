const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);
const bcrypt = require("bcryptjs");

const checkKeys = (validKeys, bodyKeys) => {
  console.log(validKeys);
  console.log(bodyKeys);
  return bodyKeys.every((element) => {
    return validKeys.includes(element);
  });
};

const profile = (req, res) => {
  console.log(`working on get for /users/${req.params.userid}`);
  //{id, name, rank, organization, email}
  if (!isNaN(parseInt(req.params.userid))) {
    knex("users")
      .join("organizations", "organizations.id", "=", "users.org_id")
      .join("positions", "positions.id", "=", "users.position_id")
      .select(
        "users.id as user_id",
        "users.name as user_name",
        "users.rank as user_rank",
        "organizations.id as org_id",
        "organizations.name as org_name",
        "users.email as user_email",
        "positions.id as position_id",
        "positions.name as position_name"
      )
      .where("users.id", "=", req.params.userid)
      .then((data) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
      });
  } else {
    res.status(404).send()
  }
};
const all = (req, res) => {
  console.log(`working on post for /users`);
  knex("users")
    .join("organizations", "organizations.id", "=", "users.org_id")
    .join("positions", "positions.id", "=", "users.position_id")
    .select(
      "users.id as user_id",
      "users.name as user_name",
      "users.rank as user_rank",
      "organizations.id as org_id",
      "organizations.name as org_name",
      "users.email as user_email",
      "positions.id as position_id",
      "positions.name as position_name"
    )
    .then((data) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    });
};

const byOrg = (req, res) => {
  console.log(`working on post for /users/orgs/${req.params.id}`);
  //add condition for if id is a number
  if (!isNaN(parseInt(req.params.id))) {
    knex("users")
      .join("organizations as org", "org.id", "=", "users.org_id")
      .join("positions", "positions.id", "=", "users.position_id")
      .select(
        "users.id as user_id",
        "users.name as user_name",
        "users.rank as user_rank",
        "org.id as org_id",
        "org.name as org_name",
        "users.email as user_email",
        "positions.id as position_id",
        "positions.name as position_name"
      )
      .where("users.org_id", "=", req.params.id)
      .then((data) => {
        console.log(data);
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
      });
  } else {
    res.status(404).send();
  }
};

//returns 200 on success, 400 on invalid email, returns 404 on other invalid request
const register = (req, res, next) => {
  console.log(`working on post for /register`);

  let keys = ["name", "rank", "email", "position_id", "password", "org_id"];

  if (
    req.body[keys[0]] &&
    req.body[keys[1]] &&
    req.body[keys[2]] &&
    req.body[keys[3]] &&
    req.body[keys[4]]
  ) {
    knex("users")
      .where("email", "=", req.body.email)
      .select("*")
      .then((data) => {
        if (data.length < 1) {
          bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
            return knex("users")
              .insert({
                name: req.body.name,
                rank: req.body.rank,
                email: req.body.email,
                position_id: req.body.position_id,
                password: hashedPassword,
                org_id: req.body.org_id,
              })
              .returning(["id", "email"])
              .then((users) => {
                res.json(users[0]);
              })
              .catch((error) => next(error));
          });
        } else {
          res.status(400).send();
        }
      });
  } else {
    res.status(404).send();
  }
};

/*
Current bug with login:
  working on post for /login
  api    | node:internal/errors:477
  api    |     ErrorCaptureStackTrace(err);
  api    |     ^
  api    |
  api    | Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  api    |     at new NodeError (node:internal/errors:388:5)
  api    |     at ServerResponse.setHeader (node:_http_outgoing:603:11)
  api    |     at ServerResponse.header (/app/node_modules/express/lib/response.js:776:10)
  api    |     at ServerResponse.send (/app/node_modules/express/lib/response.js:170:12)
  api    |     at /app/src/controllers/usersController.js:160:33 {
  api    |   code: 'ERR_HTTP_HEADERS_SENT'
*/

//returns 200 on success, 400 on invalid email, 401 on other invalid logins
const login = async (req, res) => {
  //super hacky knex stuff but it works
  console.log(`working on post for /login`);
  let keys = ["email", "password"];
  let isAuthenticated = false;

  if (req.body[keys[0]] && req.body[keys[1]]) {
    knex("users")
      .select("*")
      .where({ email: req.body.email })
      .then((results) => {
        if (results.length === 0) {
          res.status(404).send("Cannot find user");
        } else {
          let user = results[0];
          bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
              if (result) {
                isAuthenticated = true;
                return knex("positions").then((data) => data);
              } else {
                res.status(400).send("invalid password");
                return;
              }
            })
            .then((position) => {
              if (isAuthenticated) {
                let sendPosition = position.filter(
                  (ele) => user.position_id === ele.id
                );

                res.json({
                  id: user.id,
                  org_id: user.org_id,
                  position: sendPosition[0].name,
                });
              }
            });
        }
      });
  } else {
    res.status(404).send('invalid request')
  }
};

const update = (req, res) => {
  console.log(`working on patch for /users/${req.params.userid}`);
  if (!isNaN(parseInt(req.params.userid))) {
    if (
      checkKeys(
        ["name", "rank", "org_id", "email", "position_id", "password"],
        Object.keys(req.body)
      )
    ) {
      knex("users")
        .where("id", "=", parseInt(req.params.userid))
        .update(req.body)
        .returning("*")
        .then((data) => {
          res.status(200).send(data);
        });
    } else {
      res.status(404).send("invalid keys");
    }
  } else {
    res.status(404).send()
  }
};

const remove = (req, res) => {
  console.log(`working on delete for /users/${req.params.userid}`);
  if (!isNaN(parseInt(req.params.userid))) {
    knex("users_tasks") // remove inputs for user in users_tasks table
      .where("user_id", "=", parseInt(req.params.userid))
      .update({ task_id: null })
      .del()

      .then(() => {
        knex("comments") // remove the user's comments from the comments table
          .where("user_id", "=", parseInt(req.params.userid))
          .del()

          .then(() => {
            knex("tasks") // set user_id on tasks to null
              .where("author_id", "=", parseInt(req.params.userid))
              .update({ author_id: null })

              .then(() => {
                knex("users") // now you can delete the user from the user's table
                  .where("id", "=", parseInt(req.params.userid))
                  .del()
                  .then((data) => {
                    res.status(200).json(`Number of users deleted: ${data}`);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(404).json({
                      message: "There was a problem deleting this user",
                    });
                  });
              });
          });
      });
  } else {
    res.status(404).send()
  }
};

module.exports = { profile, all, byOrg, register, login, update, remove };
