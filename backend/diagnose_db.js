const mongoose = require('mongoose');
require('dotenv').config();

const diagnose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to DB: ${process.env.MONGO_URI}`);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections found:", collections.map(c => c.name));

        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col.name).countDocuments();
            console.log(`Collection '${col.name}' has ${count} documents.`);
            if (count > 0) {
                const sample = await mongoose.connection.db.collection(col.name).findOne();
                console.log(`Sample document from '${col.name}':`, sample);
            }
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

diagnose();
