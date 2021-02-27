const express = require("express");
const router = express.Router();
const Pirate = require("../models/pirate.model");
const { body, validationResult } = require("express-validator");

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
  })
    .collation({ locale: "en" })
    .sort({
      name: 1,
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

router.post(
  "/",
  body("name").notEmpty(),
  body("imageUrl").notEmpty(),
  body("catchPhrase").notEmpty(),
  body("position").custom(value => {
    if (value === "Captain") {
      return Pirate.find({
        position: "Captain",
      }).then((result) => {
        if (result.length > 0) {
          return Promise.reject({
            error: "captain_already_exists",
          });
        }
        return true;
      });
    }
    return true;
  }),
  body('nbTreasureChest').custom(value => {
    if (value < 0) {
      return Promise.reject({
        param: 'nbTreasureChest'
      });
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
);

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
        data: result
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
      data: result,
    });
  });
});

module.exports = router;
