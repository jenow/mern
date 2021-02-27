const express = require("express");
const router = express.Router();
const Pirate = require("../models/pirate.model");

router.get("/", async (req, res, next) => {
  Pirate.find({}, (err, result) => {
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
  }).sort({
    name: -1,
  });
});

router.get("/:id", (req, res, next) => {
  Pirate.findById(req.params.id, (err, result) => {
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

/*
    Creates a new pirate
  */
router.post("/", (req, res, next) => {
  console.log(req.body);
  const newPirate = {
    name: req.body.name,
    position: req.body.position,
    imageUrl: req.body.imageUrl,
    nbTreasureChest: req.body.nbTreasureChest,
    pegLeg: req.body.pegLeg,
    eyePatch: req.body.eyePatch,
    hookHand: req.body.hookHand,
    catchPhrase: req.body.catchPhrase,
  };

  if (newPirate.position === "Captain") {
    Pirate.find(
      {
        position: "Captain",
      },
      (err, result) => {
        if (err) {
          console.error(err);
        }
        if (result.length === 0) {
          Pirate.create(newPirate, (err, result) => {
            if (err) {
              res.status(400).send({
                success: false,
                error: err.message,
              });
            }
            res.status(201).send({
              success: true,
              data: result,
            });
          });
        } else {
          res.status(400).send({
            success: false,
            error: "captain_already_exists",
          });
        }
      }
    );
  } else {
    Pirate.create(newPirate, (err, result) => {
      if (err) {
        res.status(400).send({
          success: false,
          error: err.message,
        });
      }
      res.status(201).send({
        success: true,
        data: result,
      });
    });
  }
});

router.patch("/:post_id", (req, res, next) => {
  let fieldsToUpdate = req.body;
  Pirate.findByIdAndUpdate(
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

router.delete("/:id", (req, res, next) => {
  Pirate.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send({
        success: false,
        error: err.message,
      });
    }
    res.status(200).send({
      success: true,
      data: result
    });
  });
});

module.exports = router;
