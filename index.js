var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")



const app= express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

// URI for connecting to your MongoDB database
const uri = 'mongodb+srv://RegisterPage:register123@cluster0.wq0fc.mongodb.net/moneyTracker';

// Connecting to the database
mongoose.connect(uri, {});
// Get the connection instance
const db = mongoose.connection;
// Handle connection errors
db.on('error', (error) => {
  console.error('Error in connecting to the Database:', error);
});
// Confirm successful connection
db.on('open', () => {
  console.log('Connected to Database successfully');
});




    app.post("/add", (req,res) =>{
        var category_select = req.body.category_select
        var amount_input= req.body.amount_input
        var info = req.body.info
        var date_input = req.body.date_input
    
        var data={
            "Category": category_select,
            "Amount" : amount_input,
            "Info": info,
            "Date": date_input
        }
        db.collection('users').insertOne(data, (err,collection) => {
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully")
    
        })
    })







app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000, () => {
    console.log("Listening on port 3000")
})