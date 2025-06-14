import {Db, MongoClient} from "mongodb";

let db: Db
let client: MongoClient;

const connect = async () => {
    client = await MongoClient.connect('mongodb://localhost');
    db = client.db('homework-96');
}

const disconnect = async () => {
    await client.close();
}

const mongoDb = {
    connect,
    disconnect,
    getDb: () => db,
}

export default mongoDb;