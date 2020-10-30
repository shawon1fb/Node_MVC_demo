//name ,email , password , profile


const {Schema, model} = require('mongoose')
const validator = require('validator')
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
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
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


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error("No user exists");
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("password does not match");
    }

    return user;
}

const User = model("User", userSchema)
module.exports = User