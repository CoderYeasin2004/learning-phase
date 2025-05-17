import express from "express";
import db from "./db.js";

const port = 5000
const app = express();
const { connectTodb, getDb } = db;
let dbInstance;
app.use(express.json());

connectTodb((err) =>{
    if(!err){
        app.listen(port, () => console.log(`server is listening on port ${port}`))
        dbInstance = getDb();
    }
})

app.post ("/books", (req, res) => {
    const book = req.body;

    dbInstance.collection("blogs")
    .insertOne(book)
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        res.status(500).json({error: "failed"});
    })
})

app.get("/",(req, res) => {
    let books = [];
    dbInstance.collection("blogs")
    .find()
    .forEach((data) => {
        books.push(data);
    })
    .then(() => {
        res.status(200).json(books)
    })
    .catch(err => {
        res.status(500).json({error: "failed"});
    })
})