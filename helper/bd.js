const mongoose = require('mongoose');



module.exports = () => {
    mongoose.connect('mongodb+srv://user_newAPI:3152155@cluster0-ieplk.mongodb.net/test', {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true});

    const db =  mongoose.connection;
    db.on('open', () => {
        console.log("Mongoga onlayn ulandik");
    })

    db.on('error', (err) => {
        console.log("Mongoda Hatolik bor", err);
    })

    // mongoose.Promise = global.Promise
}



