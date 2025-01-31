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
      //   server.put('/product/:id', (req, res) => {
      //       const id = parseInt(req.params.id); // Parse the id from the URL
      //       const item = items.find(item => item.id === id);
         
      //       if (!item) {
      //          return res.status(404).json({ error: 'Item not found' });
      //       }
         
      //       // Update the item's name
      //       item.name = req.body.name || item.name;
         
      //       res.status(200).json({ message: 'Item updated successfully', item });
      //    });
      //  server.listen(port);





 const express = require('express'); 
 const server = express();  
const port = 5000;
       
       server.use(express.json());
       
   const items = [
           { id: 1, name: 'jeans' }
       ];
       
       // Root Route
       server.get('/', (req, res) => {
           res.send("Server is running"); 
       });
       
       // GET all products
       server.get('/product', (req, res) => {
           res.json(items);
       });
       
       // POST a new product
       server.post('/product', (req, res) => {
           const newItem = req.body;
           if (!newItem.id || !newItem.name) {
               return res.status(400).json({ error: "ID and name are required" });
           }
           items.push(newItem);
           res.status(201).json(newItem);
       });
       
       // DELETE a product
       server.delete('/product/:id', (req, res) => {
           const itemId = parseInt(req.params.id, 10);
           const itemIndex = items.findIndex((item) => item.id === itemId);
           
           if (itemIndex !== -1) {
               const deletedItem = items.splice(itemIndex, 1);
               res.json({ message: 'Item deleted successfully', deletedItem });
           } else {
               res.status(404).json({ error: 'Item not found in database' });
           }
       });
       
       // UPDATE (PUT) a product
       server.put('/product/:id', (req, res) => {
           const itemId = parseInt(req.params.id, 10);
           const updatedItem = req.body;
           
           const itemIndex = items.findIndex((item) => item.id === itemId);
           if (itemIndex !== -1) {
               items[itemIndex] = { ...items[itemIndex], ...updatedItem };
               res.json(items[itemIndex]);
           } else {
               res.status(404).json({ error: 'Item not found' });
           }
       });
       
       // Start the server
       server.listen(port, () => {
           console.log(`Server is running on http://localhost:${port}`);
       });
       