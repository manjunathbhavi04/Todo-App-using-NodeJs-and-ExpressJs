import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const date = new Date();
let dayt = date.getDate();
let month = date.getMonth();
let day = date.getDay();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let year = date.getFullYear();

var todayWork = ["Eat", "Sleep", "Run", "Gym"];
var work = ["cs", "js", "java", "c++"];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

function checkAndClearArrays(req, res, next) {
    const currentDate = new Date();
    if (currentDate.getDate() !== dayt) {
      work = [];
      todayWork = [];
      dayt = currentDate.getDate();
      month = currentDate.getMonth();
      day = currentDate.getDay();
      year = currentDate.getFullYear();
    }
    next();
  }
  
  app.use(checkAndClearArrays);

app.get("/", (req,res) => {
    res.render("today.ejs",{newListItems: todayWork});
});

app.get("/work", (req, res) => {
    res.render("work.ejs",{newItems: work});
})

app.post("/workadder", (req,res, next) => {
    var newWorkJob = req.body["newWork"];
    work.push(newWorkJob);
    res.redirect("/work")

})

app.post("/todaywork", (req, res, next) => {
    var newJob = req.body["newWork"]
    todayWork.push(newJob);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`listening to port ${port}.`);
})