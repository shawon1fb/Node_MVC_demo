const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

exports.sessionStore = new MongoDBStore(
    {
        uri: 'mongodb://127.0.0.1:27017/',
        databaseName: 'connect_mongodb_session_test',
        collection: 'mySessions',
        expires: 60 * 60 * 2000
    },
    function (error) {
        // Should have gotten an error
    },
);



