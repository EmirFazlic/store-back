const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    itemOrdered: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    itemSeller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemBuyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true},
    confirmation: { type: Boolean, required: true},
});


module.exports = mongoose.model('Order', orderSchema);
