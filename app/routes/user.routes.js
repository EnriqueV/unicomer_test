module.exports = app => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new users
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAllusers);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single users with id
  router.get("/:id", users.findOne);

  // Update a users with id
  router.put("/:id", users.update);

  // Delete a users with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use('/api/unicomer', router);
};
