import { MongoClient } from "mongodb"

let dbConnection;

export default {
    connectTodb: (cb) => {
        MongoClient.connect("mongodb+srv://hyeasin59:hyeasin59@learning01.utvnfst.mongodb.net/?retryWrites=true&w=majority&appName=learning01")
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        })
    },
    getDb: () => dbConnection
}