const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



// app.use is called middleware

app.use((req , res , next) => {
    var now = new Date().toString();

    console.log(`${now}: ${req.method}  ${req.url}`);

    var log = `${now}: ${req.method}  ${req.url}`;

    fs.appendFile('server.log' , log + '\n' ,(error) => {
        if ( error ){
            console.log('unable to log the data to the file');
        }
    });
    next();
    
});

// app.use(( req , res , next )=>{
//     res.render( 'maintainance.hbs' );
// });

app.use(express.static( __dirname + '/public'));

hbs.registerHelper( 'getCurrentYear' , () => {
    return new Date().getFullYear();
});

hbs.registerHelper( 'screamIt' , (text) => {
    return text.toUpperCase();
});

hbs.registerHelper('testHelper', ( text ) => {
    return text.toLowerCase();
});

app.get('/', ( req , res ) => {

    res.render( 'home.hbs', {
        welcomeMessage : 'Welcome to node and express modules. This is a new website',
        pageTitle : 'Home page',
        testMessage : 'THIS IS A NORMAL TEST MESSAGE'

    });

    // res.send('<h1>Hello this is node with express!</h1>');
    // res.send({
    //     title:'This is a title',
    //     id : 0
    // });
});

app.get('/about', (req , res) => {
    res.render('about.hbs' , {
        pageTitle : 'About page'
    });
    // res.send('This is a simple page');
});

app.get('/bad' , ( req , res ) =>{
    res.send({
        error:'There was some error.'
    });
});

app.listen(3000 , () => {
    console.log('listening to server at localhost:3000');
});
