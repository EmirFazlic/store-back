const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true},

});


module.exports = mongoose.model('Item', itemSchema);
