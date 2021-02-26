const express = require("express");
const router = express.Router();
const Post = require("../models/sample.model");

module.exports = (io) => {
  /* Get all Posts */
  router.get("/", async (req, res, next) => {
    io.sockets.emit('notify', {foo: 'bar'});
    Post.find({}, (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          error: err.message,
        });
      }
      res.status(200).send({
        success: true,
        data: result,
      });
    });
  });

  /* Get Single Post */
  router.get("/:post_id", (req, res, next) => {
    Post.findById(req.params.post_id, (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          error: err.message,
        });
      }
      res.status(200).send({
        success: true,
        data: result,
      });
    });
  });

  /* Add Single Post */
  router.post("/", (req, res, next) => {
    let newPost = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
    };
    Post.create(newPost, (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          error: err.message,
        });
      }
      res.status(201).send({
        success: true,
        data: result,
        message: "Post created successfully",
      });
    });
  });

  /* Edit Single Post */
  router.patch("/:post_id", (req, res, next) => {
    let fieldsToUpdate = req.body;
    Post.findByIdAndUpdate(
      req.params.post_id,
      { $set: fieldsToUpdate },
      { new: true },
      (err, result) => {
        if (err) {
          res.status(400).send({
            success: false,
            error: err.message,
          });
        }
        res.status(200).send({
          success: true,
          data: result,
          message: "Post updated successfully",
        });
      }
    );
  });

  /* Delete Single Post */
  router.delete("/:post_id", (req, res, next) => {
    Post.findByIdAndDelete(req.params.post_id, (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          error: err.message,
        });
      }
      res.status(200).send({
        success: true,
        data: result,
        message: "Post deleted successfully",
      });
    });
  });

  return router;
}



// module.exports = router;
