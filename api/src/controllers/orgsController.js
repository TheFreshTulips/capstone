const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

const checkKeys = (validKeys, bodyKeys) => {
  console.log(validKeys);
  console.log(bodyKeys);
  return bodyKeys.every((element) => {
    return validKeys.includes(element);
  });
};

const request = (req, res) => {
  console.log(`working on GET for /orgs`);
  // {id, img_url, name, parent_id, parent_name}
  knex("organizations as org")
    .leftJoin("organizations as parent", "parent.id", "org.parent_id")
    .select(
      "org.id as org_id",
      "org.img_url as org_img_url",
      "org.name as org_name",
      "org.parent_id as org_parent_id",
      "parent.name as parent_name"
    )
    .then((data) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    });
};

const detailedRequest = (req, res) => {
  console.log(`working on GET for /orgs/${req.params.id}`);
  // {id, img_url, name, parent_id, parent_name}
  if (!isNaN(parseInt(req.params.id))) {
    knex("organizations as org")
      .where("org.id", "=", parseInt(req.params.id))
      .leftJoin("organizations as parent", "parent.id", "org.parent_id")
      .select(
        "org.id as org_id",
        "org.img_url as org_img_url",
        "org.name as org_name",
        "org.parent_id as org_parent_id",
        "parent.name as parent_name"
      )
      .then((data) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
      });
  } else {
    res.status(404).send();
  }
};

const childRequest = (req, res) => {
  console.log(`working on GET for /orgs/${req.params.id}/children`)
  if (!isNaN(parseInt(req.params.id))) {
    knex("organizations as org")
      .where("org.parent_id", "=", parseInt(req.params.id))
      .select(
        "org.id as org_id",
        "org.name as org_name"
      )
      .then((data) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.status(200).send(data);
      });
  } else {
    res.status(404).send();
  }
}

const add = (req, res) => {
  console.log(`working on POST for /orgs`);

  //add is done, but not check
  let body = req.body;

  if (body.parent_id) {
    //check for foriegn key of parent org
    knex("organizations")
      .select("*")
      .where("id", "=", body.parent_id)
      .then((data) => {
        console.log("data: ", data);

        if (data.length > 0) {
          knex("organizations")
            .insert({
              img_url: body.img_url,
              name: body.name,
              parent_id: body.parent_id,
            })
            .returning("*")
            .then((data) => {
              res.status(200).send(data);
            });
        } else {
          res.status(404).send("invalid parent org");
        }
      });
  } else {
    knex("organizations")
      .insert({
        img_url: body.img_url,
        name: body.name,
        parent_id: 1,
      })
      .returning("*")
      .then((data) => {
        res.status(200).send(data);
      });
  }
};
const update = (req, res) => {
  console.log(`working on PATCH for /orgs/${req.params.id}`);
  let body = req.body;
  if (!isNaN(parseInt(req.params.id))) {
    if (body.parent_id) {
      //check for foriegn key of parent org
      knex("organizations")
        .select("*")
        .where("id", "=", body.parent_id)
        .then((data) => {
          console.log("data: ", data);

          if (
            data.length > 0 &&
            checkKeys(["img_url", "name", "parent_id"], Object.keys(body))
          ) {
            knex("organizations")
              .where("id", "=", req.params.id)
              .update(body)
              .returning("*")
              .then((data) => {
                res.status(200).send(data);
              });
          } else {
            res.status(404).send("invalid parent org or keys");
          }
        });
    } else {
      if (checkKeys(["img_url", "name", "parent_id"], Object.keys(body))) {
        knex("organizations")
          .where("id", "=", req.params.id)
          .update(body)
          .returning("*")
          .then((data) => {
            res.status(200).send(data);
          });
      } else {
        res.status(404).send("invalid parent org or keys");
      }
    }
  } else {
    res.status(404).send()
  }
};

const remove = (req, res) => {
  console.log(`working on delete for 'organizations/${req.params.id}'`);
  if (!isNaN(parseInt(req.params.id))) {
    if (req.params.id === 1) {
      res.status(404).json({
        message: "Why would you try that? Don't do it again"
      })
    } else {
      knex("users")
        .where("org_id", "=", req.params.id)
        .update({ org_id: null })
        .then(() => {
          knex("organizations")
            .where("parent_id", "=", req.params.id)
            .update({ parent_id: null })
            .then(() => {
              knex("tasks")
                .where("tasks.org_id", "=", req.params.id)
                .update({ org_id: null })
                .then(() => {
                  knex("organizations")
                    .where("id", "=", parseInt(req.params.id))
                    .del()
                    .catch((err) => {
                      console.log(err);
                      res.status(404).json({
                        message: "There was a problem deleting this organization",
                      });
                    })
                    .then((data) => {
                      res.status(200).json(`Number of records deleted: ${data}`);
                    });
                });
            });
        });
    }
  } else {
    res.status(404).send()
  }
};

module.exports = { request, detailedRequest, childRequest, add, update, remove };
