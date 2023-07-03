const express = require('express');

const Item = require('../models/item');
const Order = require('../models/order');
const checkAuth = require('../middleware/auth');
const item = require('../models/item');

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const order = new Order ({
        itemOrdered: req.body.itemId,
        itemSeller: req.body.sellerId,
        itemBuyer: req.userData.userId,
        address: req.body.userName + ' ' + req.body.address,
        confirmation: false
    });
    console.log(req.body.sellerId)
    order.save().then(result => {
        res.status(201).json({
            message: 'Order created'
        })
    })
});

router.get("/:buyer", checkAuth, (req, res, next) => {
    if(req.params.buyer === "true") {
        Order.find({itemBuyer: req.userData.userId}).populate("itemOrdered").then(orders => {
            if (orders) {
                res.status(201).json({
                    message: "Orders fetched succesfully",
                    orders: orders ,
                 });
            }
        });
    } else {
        Order.find({itemSeller: req.userData.userId}).populate("itemOrdered").then(orders => {
            if (orders) {
                res.status(201).json({
                    message: "Orders fetched succesfully",
                    orders: orders 
                    
                 });
            }
        });
    }
})

router.put('/confirm', checkAuth, (req, res, next) => {
    const orderId = req.body.orderId;
    Order.findById(orderId).then(result => {
        result.confirmation = true;
        console.log(result)
        return Order.updateOne({orderId}, result)
    }).then(result => {
        res.status(200).json({ message: "Update successful!" });
    })
})


router.delete('/:orderId', checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;

    Order.deleteOne({orderId}).then(result => {
        res.status(200).json({ message: "Deletion successful!" });

    })
})



module.exports = router;
