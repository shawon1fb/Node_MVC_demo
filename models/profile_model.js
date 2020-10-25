/// user , title, bio, profilePics,links :{fb,twi}, posts,bookmark ...

const {Schema, model} = require('mongoose')

const profileSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        trim: true,
        maxLength: 100,
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 500,
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    bookmarks: {
        type: Schema.Types.ObjectId,
        ref: "bookmark",
    }
}, {
    timestamps: true,
})

const Profile = model('Profile', profileSchema)

module.exports = Profile