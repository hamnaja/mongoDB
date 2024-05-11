const { MongoClient } = require('mongodb');

const db_protocol = 'mongodb+srv://';
const db_path = '/';
const db_host = 'hamcluster.lazop7e.mongodb.net';
const db_port = '';
const db_url = db_protocol + db_host + db_port + db_path;

const authuser = {
    username: 'phothikornhaam',
    password: 'Haam0856689085'
};

const authmech = 'SCRAM-SHA-1';

const options = {
    auth: authuser,
    authMechanism: authmech
};

async function connect(db_url, options) {
    const client = new MongoClient(db_url, options);
    return client.connect();
}

async function runMongo(db_url, options, dbname, collection, data) {
    const conn = await connect(db_url, options);
    const db = conn.db(dbname);
    const col = db.collection(collection);
    
    try {
        const result = await col.insertOne(data);
        console.log('Inserted document:', result.insertedId);
    } catch (err) {
        console.error('Error inserting document:', err);
    } finally {
        await conn.close();
    }
}

const input_data = {
    player_id: '15003',
    username: 'kerry',
    level: 1
};

runMongo(db_url, options, 'your_db_name', 'your_collection_name', input_data);
