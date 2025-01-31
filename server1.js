const express =require('express');
const server =express();
require('dotenv').config();
const mongoose=require('mongoose');

const mongoURI=process.env.mongo_uri;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => console.error('MongoDB connection error:', error));

const productschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
const Item = mongoose.model('Item', productschema);

//creating and assigning a port number..
const port=5050;

const items=[
    {id:1,name:'jeans'},
    {id:2,name:'kurti'},
    {id:3,name:'shirt'}
];
server.get('/',(req,res) => {
res.end(`server is running in port 5050 new 1`);
});