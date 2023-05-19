const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "CRUD_DB",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "Select * from studentdb";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  res.send("This is active");
  const sqlInsert = "Insert into studentdb (name,age) Values (?,?)";
  db.query(sqlInsert, [name, age], (err, result) => {
    console.log("Value Added");
  });
});

app.delete("/api/delete/:id", (req, res) => {
  console.log("function called");
  const id = req.params.id;
  const sqlDelete = "Delete from studentdb where id=?";
  db.query(sqlDelete, id, (err, result) => {
    console.log("value deleted");
  });
});

app.listen(3001, () => {
  console.log("Backend running");
});
