const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port  = "3000";

app.use(bodyParser.json());

//SERVER API Data 
let dataStore = {1:{id:"1", data:"testValData"}};


// the id will be an object from the url 
app.get('/items/:id',(req,res)=>{
    const {id} = req.params // all the parms, and the objects that a user has sent 
    if( dataStore[id])
    {
        res.json(dataStore[id]) // by default status is 200 when json is sent 
    }else{
        res.status(404).send('Item not found');
    }

});

app.post('/items/',(req,res)=>{
    const {id, item} = req.body;
    dataStore[id] = item;
    console.log(dataStore);
    res.status("201").send(`Item Added id:${id}`)


});


// in general we send an id where i want the data to be updated 
app.put('/items/:id',(req,res)=>{
    const {id, item} = req.body;

    if (!dataStore[id]){
        res.status('404').send('Item not found');
    }
    dataStore[id] = item;
    res.status("201").send(dataStore[id])


});



app.delete('/items/:id',(req,res)=>{
    const {id} = req.params;

    if (!dataStore[id]){
        res.status('404').send('Item not found');
    }
    delete dataStore[id]; 
    res.status("204").send(dataStore[id])


});
// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


