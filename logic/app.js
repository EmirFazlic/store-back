const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");


const userRoutes = require('../routes/user');
const itemRoutes = require('../routes/item');
const orderRoutes = require('../routes/order');


const app = express();

mongoose.connect("mongodb+srv://fazla:13231232@storedb.zw0hfdk.mongodb.net/?retryWrites=true&w=majority").then(() =>{
        console.log('Conected to the database');
    }).catch(()=> {
        console.log('Connection faild');
    });


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());


app.use("/api/user", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/order", orderRoutes);
app.use("/images", express.static(path.join("images")));


module.exports = app; 