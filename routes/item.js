const express = require('express');
const Item = require('../models/item');
const checkAuth = require('../middleware/auth');
const extractFile = require("../middleware/file");


const router = express.Router();

router.post("",checkAuth, extractFile, (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        creator: req.userData.userId,
        image: imagePath,
    });
    item.save();
    res.status(201).json({message: 'item is added'});
});


router.get("",(req, res, next) => {
    Item.find().then(item => {
        res.json({
            message: "Items fetched succesfully",
            items: item 
            
         });

    });
});

router.get("/user/:id",(req, res, next) => {
    Item.find({ creator: req.params.id }).then(item => {
        // console.log(item)
        if (item) {
            res.status(200).json({
                message: "Items fetched succesfully",
                items: item 
                
             });
        } else {
            res.status(404).json({ message: "Item not found!" });
        }
    });
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Item.findById(id).then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "Item not found!" });
      }
    });
  });

router.put("", checkAuth, extractFile, (req, res, next) => {
    let image = req.body.image;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      image = url + "/images/" + req.file.filename;
    }
    const item = new Item({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        creator: req.userData.userId,
        image: image
    });
    Item.updateOne({_id: req.body.id}, item).then(result => {
        res.status(200).json({ message: "Update successful!" });
    })
});

// item {}

router.delete("/:id", (req, res, next) => {
    Item.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({ message: "Item deleted" });
    });
}), 

module.exports = router