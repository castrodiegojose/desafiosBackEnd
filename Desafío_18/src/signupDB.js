import mongoose from "mongoose";
import key from './options/keysMongo.js';

mongoose.connect(key.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
        .then ((db) => console.log('Mongo Atlas is connected ☁'))
        .catch (err => console.log(err));