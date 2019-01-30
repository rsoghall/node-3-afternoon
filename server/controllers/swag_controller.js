const swag = require('./../../server/models/swag');


//Export an object with a read method that has a req, res, and next parameter.
//The read method should use res to send a status of 200 with the swag array.
module.exports = {
    read: (req, res, next) => {
        res.status(200).send(swag);
    }
}