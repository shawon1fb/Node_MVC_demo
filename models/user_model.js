//name ,email , password , profile


const {Schema, model} = require('mongoose')

const bcrypt = require('bcrypt')

//const Profile = require('./profile_model')

const userSchema = new Schema({

    username: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },

}, {
    timestamps: true,
})


/// hash password
userSchema.pre('save', async function (next) {
    const user = this;

    console.log("just before saving");

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

const User = model("User", userSchema)
module.exports = User