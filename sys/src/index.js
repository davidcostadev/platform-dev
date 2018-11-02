import express from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';

import bodyParser from 'body-parser';
//import reload from 'express-reload';

//React Server-side rendering 
import React from "react";
import { renderToString } from 'react-dom/server'; // <-- renderToString() will take our React app and turn it into a string to be inserted into our Html template function.
import { ServerStyleSheet } from 'styled-components'; // <-- importing ServerStyleSheet

import App from './client/App';
import Html from './client/Html';

import routers from './server/routers';

var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(routers);

//session
app.use(session({
    secret: '3dPc7PCn8JVgf4LJ',
    resave: true,
    saveUninitialized: true
}));


//--------server-side rendering
// app.get('/app', async (req, res) => {
//     const sheet = new ServerStyleSheet(); // <-- creating out stylesheet
//     const body = renderToString(sheet.collectStyles(<App />)); // <-- collecting styles
//     const styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
//     const title = 'Home';
//     res.send(
//         Html({
//             body,
//             styles, // <-- passing the styles to our Html template
//             title
//         })
//     );
// });

app.use('/public', express.static(path.join(__dirname + '/client/public')));

app.use('/static', express.static(__dirname + '/client/team/static'));


const port = process.env.PORT;

app.listen(process.env.PORT || 8080);


console.log(`🚀Running a GraphQL API server at localhost:${process.env.PORT}/graphql`);
console.log(`Serving at http://localhost:${port}`);
