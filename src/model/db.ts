import * as mongoose from 'mongoose';

const mongoURL: string = "mongodb://localhost:27017/mtl";

mongoose.connect(mongoURL, {useNewUrlParser: true});

mongoose.connection.on("connected", () => console.log("mongoose connected"))
mongoose.connection.on("disconnected", () => console.log("mongoose disconnected"))
mongoose.connection.on("error", () => console.log("mongoose error"))

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
