const admin = require('firebase-admin');
const functions = require('firebase-functions');


const config = {
    apiKey: "AIzaSyDdBrcA_slQq6owvm3Q5_waRJAA0PjyzhI",
    authDomain: "nlpf-1570028868321.firebaseapp.com",
    databaseURL: "https://nlpf-1570028868321.firebaseio.com",
    projectId: "nlpf-1570028868321",
    storageBucket: "nlpf-1570028868321.appspot.com",
    messagingSenderId: "811645163630",
    appId: "1:811645163630:web:5af5ebe66a950db88a6e7f",
    measurementId: "G-CDS8G5F4XD"
};
admin.initializeApp(config);
let db = admin.firestore();

exports.ping = functions.https.onRequest(async (req, res) => {
    res.json("pong");
});


exports.iot = functions.https.onRequest(async (req, res) => {
    let data = req.body;
    db.collection('iot-data').add(data);
    res.send("Added to database: " + JSON.stringify(req.body));
});
