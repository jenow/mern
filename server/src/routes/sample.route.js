const express = require("express");
const router = express.Router();
const Post = require("../models/sample.model");

/* Get all Posts */
router.get("/", async (req, res, next) => {
  Post.find({}, function (err, result) {
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
  Post.findById(req.params.post_id, function (err, result) {
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
  Post.create(newPost, function (err, result) {
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
    function (err, result) {
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
  Post.findByIdAndDelete(req.params.post_id, function (err, result) {
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

module.exports = router;
