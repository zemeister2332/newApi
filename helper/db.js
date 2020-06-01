const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect(
        'mongodb+srv://user_newApi:qwerty123@cluster0-fcay4.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }

        );

    mongoose.connection.on('open', () => {
       // console.log("MongoDB Is Online!");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB Is Not Connected!!!",err);
    });
}
