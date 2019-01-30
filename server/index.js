
//imports
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
require('dotenv').config()

//imports internally
const checkSession = require('./middlewares/checkForSession')
const swagc = require('./controllers/swag_controller') 
const auth = require('./controllers/auth_controller')
const cartc = require('./controllers/cart_controller')
const searchc = require('./controllers/search_controller')


// applies express to app
//Create a variable called app and set it equal to express invoked.
const app = express()

// json is middleware
//app.use () is top level middleware
//add bodyParser.json so we can read JSON from the request body 
app.use (bodyParser.json());

//add session so we can create sessions. he object should have a secret, resave, 
//and saveUninitialized property.
app.use (session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//middleware
app.use (checkSession);
app.use (express.static(`${__dirname}/../build`));



//make a GET endpoint at /api/swagthat calls the read method on our swag_controller
app.get ('/api/swag', swagc.read)
app.post ('/api/login', auth.login)
app.post ('/api/register', auth.register)
app.post ('/api/signout', auth.signout)
app.get ('/api/user', auth.getUser)
app.post ('/api/cart', cartc.add)
app.post ('/api/cart/checkout', cartc.checkout)
app.delete ('/api/cart', cartc.delete)
app.get ('/api/search', searchc.search)



const PORT = process.env.SERVER_PORT
app.listen(PORT, () => console.log(`Server is listening on.. ${PORT}`))
