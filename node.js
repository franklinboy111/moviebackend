import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const MongoClient = mongodb.MongoClient;

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const uri = `mongodb://${mongo_username}:${mongo_password}@ac-b88kav0-shard-00-00.ta49mih.mongodb.net:27017,ac-b88kav0-shard-00-01.ta49mih.mongodb.net:27017,ac-b88kav0-shard-00-02.ta49mih.mongodb.net:27017/?ssl=true&replicaSet=atlas-g3wjq1-shard-0&authSource=admin&appName=Cluster0`;

console.log("Username:", mongo_username || "not found");
console.log("Password:", mongo_password || "not found");

const port = 8000;

MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    connectTimeoutMS: 60000,
    serverSelectionTimeoutMS: 60000
})
.catch(err => {
    console.error("MongoDB Error:", err);
    process.exit(1);
})
.then(async client => {

    console.log("MongoDB connected");

    await ReviewsDAO.injectDB(client);

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });

});