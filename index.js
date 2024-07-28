var express = require("express");
var mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Instead of bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Instead of bodyParser.urlencoded()
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/MoneyList', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/add", (req, res) => {
    var category_select = req.body.category_select;
    var amount_input = req.body.amount_input;
    var info = req.body.info;
    var date_input = req.body.date_input;

    var data = {
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
        res.send("Record Inserted Successfully"); // Sending a response to the client
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('index.html');
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});
