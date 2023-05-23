const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 3000
var items = ["Breakfast", "Lunch", "Dinner"];
let workItems = [];
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.use(express.static('public'))
var today = new Date();

var options = { weekday: 'long', month: 'long', day: 'numeric' };

app.get("/", function (req, res) {
    var day = today.toLocaleDateString("en-US", options);
    res.render("index", { listTitle: day, newlistitems: items });
});


app.post("/", function (req, res) {
    let item = req.body.newitem;
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item)

        res.redirect('/');
    }
})

app.get('/work', function (req, res) {

    res.render("index", { listTitle: "Work List", newlistitems: workItems })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))