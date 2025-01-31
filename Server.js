// const http=require("http");

// const server= http.createServer((req,res) => 
//          res.end("server is running")
// );
// const port=3000;
// server.listen(port);

//importing express
const express =require('express');
//creating a server
const server =express();

//env config
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
// (req,res) => {
//  server.get('/user',   res.end(`server is running on the port 5050`)
//     })
  //middlewares to regulate the request and response cycle.
  server.use(express.json());
    server.get('/product',(req,res) => {
       res.json(items);
        });
       server.post('/product',(req,res) => {
            newitem={id:items.length+1,name:req.body.name};//this add the element id by default by checking the previous array items.
            items.push(newitem);// pushing the value
        res.status(201).json(newitem);
        });
        server.delete('/product/:id', (req, res) => {
          const id = parseInt(req.params.id); // Get the item ID from the route parameter.
          const itemIndex = items.findIndex(item => item.id === id); // Find the index of the item.
       
          if (itemIndex === -1) {
             
             return res.status(404).json({ error: 'Item not found' });
          }
          
       
          
          const deletedItem = items.splice(itemIndex, 1);
       
          // Respond with the deleted item.
          res.status(200).json({ message: 'Item deleted successfully', deletedItem });
       });
        // server.put('/product/:id',(req,res) => {
        //     const itemid=parseInt(req.params.id);
        //     const updateditem=items.findIndex((item) => item.id===itemid);
        //     if(updateditem !== -1){
        //            items[updateditem].name=req.body.name;
        //            res.json(items[updateditem]);
        //     }
        //     else{
        //         res.status(404).json("item not found in data base");
        //     }
        // });
        server.put('/product/:id', (req, res) => {
            const id = parseInt(req.params.id); // Parse the id from the URL
            const item = items.find(item => item.id === id);
         
            if (!item) {
               return res.status(404).json({ error: 'Item not found' });
            }
         
            // Update the item's name
            item.name = req.body.name || item.name;
         
            res.status(200).json({ message: 'Item updated successfully', item });
         });
       server.listen(port);