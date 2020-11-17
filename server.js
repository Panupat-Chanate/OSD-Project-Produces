// Importing Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql')
var session = require('express-session')

// importing files
const routes = require('./routes');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1

app.use(session({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: true
   })
)

// Step 2
// mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://panu_backend:15515511@clusterdb.1wuju.mongodb.net/TutorialDB?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});