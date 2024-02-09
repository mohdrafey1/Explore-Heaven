const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passortLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema( {
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passortLocalMongoose);

module.exports = mongoose.model("User", userSchema);