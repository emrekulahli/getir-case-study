const mongoose = require('mongoose')

const connect = () => {

    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, auto_reconnect: true});

    mongoose.connection.on('connected', () => {
        console.log("MongoDB connected");
    });

    mongoose.connection.on('error', (err) => {
        console.log("MongoDB default connection has occured:", err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log("MongoDB connection is disconnected")
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log("MongoDB connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}

const disconnect = () => mongoose.disconnect()

module.exports = {
    connect,
    disconnect
}