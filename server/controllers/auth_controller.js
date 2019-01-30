const users = require('./../models/users')

// Info: A user object looks like: { id: integer, username: string, password: string }
// *** add an id variable that equals 1.***
// Info: We'll increment this by one to make sure no users can have the same id.

let id = 1

//export an object with a login, register, signout, and getUser method. 
//Each method should capture req, res, and next as parameters.

module.exports = {
    login: (req, res, next) => {
// This method should use username and password from the request body to
// find a user object in the users array with the same user/pass combination.
        const {session} = req;
        const {username, password} = req.body;
//If it finds a user with that combination, it should update the value of 
//username on the request session's user object to value of username from the request body.
        const user = users.find(user => user.username === username && user.password === password);
        if (user){
            session.user.username = user.username
//send a status of 200 with the updated user object. If it doesn't find a user it should send a status of 500.
        res.status(200).send(session.user);        
        } else {
        res.status(500).send('Unathorized.')
        }
    },

    register: (req, res, next) => {
//This method should look for a username and password on the request body and then create a user object.
//It should use the global id variable for the id.
        const {session} = req;
        const {username, password} = req.body;

//After pushing the new user object to the users array it should increment the value of id by one so we 
//can keep the value of id unique
        users.push({id, username, password});
        id++;
//It should then set the value of username on the request session's user object to the value of username 
//from the request body.
        session.user.username = username;
//The method should return the updated user object with a status of 200.
        res.status(200).send(session.user)
    },

    signout: (req, res, next) => {
// This method is responsible for destroying the session and returning the session 
//(which should be undefined at that point )
        const {session} = req;
        session.destroy();
        res.status(200).send(req.session)
    },

    getUser: (req, res, next) => {
// This method is responsible for reading the user object off of session and return it with a status of 200.
        const {session} = req;
        res.status(200).send(session.user);
    }
}

