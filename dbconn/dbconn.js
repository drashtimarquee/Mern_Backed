const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mproject").then(() => {
    
    console.log("Database Connection successfully..");
}).catch((e) => {
    console.log("Connection failed:", e);
});

// async function shoes() {
//     try {
//         const dataset = await client.db('mproject').collection('users').find().toArray();
//         return JSON.stringify(dataset);
//     }
//     catch {
//         console.log("db closed");
//         await client.close();
//     }
// }
// module.exports = {shoes};