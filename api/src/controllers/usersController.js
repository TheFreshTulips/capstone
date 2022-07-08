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
  knex("users")
    .join("organizations", "organizations.id", "=", "users.org_id")
    .select(
      "users.id as user_id",
      "users.name as user_name",
      "users.rank as user_rank",
      "organizations.id as org_id",
      "organizations.name as org_name",
      "users.email as user_email"
    )
    .where("users.id", "=", req.params.userid)
    .then((data) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    });
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
};

//returns 200 on success, 400 on invalid email, returns 404 on other invalid request
const register = (req, res, next) => {
  console.log(`working on post for /register`);

  let keys = ["name", "rank", "email", "position_id", "password"];

  if (
    req.body[keys[0]] &&
    req.body[keys[1]] &&
    req.body[keys[2]] &&
    req.body[keys[3]] &&
    req.body[keys[4]]
  ) {
    userNamePromise = knex("users")
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

//returns 200 on success, 400 on invalid email, 401 on other invalid logins
const login = async (req, res) => {
  //super hacky knex stuff but it works
  console.log(`working on post for /login`);
  let keys = ["email", "password"];

  if (req.body[keys[0]] && req.body[keys[1]]) {
    knex("users")
      .select("*")
      .where({ email: req.body.email })
      .then((user) => {
        user = user[0];
        if (user === undefined) {
          res.status(400).send("Cannot find user");
        } else {
          bcrypt
            .compare(req.body.password, user.password)
            .then(function (result) {
              if (result) {
                return knex("positions").then((data) => data);
              } else {
                res.status(404).send("cannot login user");
                return;
              }
            })
            .then((position) => {
              if (position) {
                let sendPosition = position.filter(
                  (ele) => user.position_id === ele.id
                );

                res.json({
                  body: {
                    id: user.id,
                    org_id: user.org_id,
                    position: sendPosition[0].name,
                  },
                });
              } else {
                res.status(405).send("an error occurred");
                return;
              }
            });
        }
      });
  }
};

const update = (req, res) => {
  console.log(`working on patch for /users/${req.params.userid}`);
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
};

const remove = (req, res) => {
  console.log(`working on delete for /users/${req.params.userid}`);
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
};

module.exports = { profile, all, byOrg, register, login, update, remove };
