let url = "http://127.0.0.1:3000";

let firebaseConfig = {
    apiKey: "AIzaSyAao3z-m_bfaVk6LdAKn1CmOMkMmvFSFZk",
    authDomain: "helpinghand-tsrn.firebaseapp.com",
    databaseURL: "https://helpinghand-tsrn.firebaseio.com",
    projectId: "helpinghand-tsrn",
    storageBucket: "helpinghand-tsrn.appspot.com",
    messagingSenderId: "470363894886",
    appId: "1:470363894886:web:1689fe883434cc644b29a7",
    measurementId: "G-CNTZX4JBX7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

function doCall(url, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getBal(){
    doCall(`${url}/ethBalance?address=${addr}`, (res) => {
        // Change necessary values
    })
}

getBal()

function createCause(){
    // Get value of variables
    let addr;
    let req;

    doCall(`${url}/createCause?address=${addr}&requirement=${req}`, (res) => {
        firebase.database().ref('causes').push({
            id: res.id,
            creator: addr,
            requirement: req,
            donated: 0,
            withdrawn: 0
        });
    })
}

function donate(){
    let addr;
    let id;
    let amt;
    doCall(`${url}/donate?address=${addr}&id=${id}&amt=${amt}`, (res) => {
        let database = firebase.database().ref('causes');
        database.on('value', function(snapshot){
            snapshot.forEach(snap => {
                if(JSON.parse(snap.val().id) == id) {
                    new_donated = snap.val().donated + amt;
                    let db = firebase.database().ref('causes/' + snap.key);
                    db.update({
                        donated: new_donated
                    })
                }
            })
        })
    })
}

function withdraw(){
    let addr;
    let id;
    doCall(`${url}/withdraw?address=${addr}&id=${id}`, (res) => {
        let database = firebase.database().ref('causes');
        database.on('value', function(snapshot){
            snapshot.forEach(snap => {
                if(JSON.parse(snap.val().id) == id) {
                    new_withdrawn = snap.val().donated;
                    let db = firebase.database().ref('causes/' + snap.key);
                    db.update({
                        withdrawn: new_withdrawn
                    })
                }
            })
        })
    })
}

function tip(){
    let addr;
    let volunteer;
    let amt;
    doCall(`${url}/tip?address=${addr}&volunteer=${volunteer}&amt=${amt}`, (res) => {
        console.log(res);
        getBal()
    })
}

function retrieveCauses(){
    let database = firebase.database().ref('causes');
    database.on('value', function(snapshot){
        snapshot.forEach(snap => {
            // Fill in relevant place
        })
    })
}

function retrieveAidsNeeded(){
    let service_type;
    let database = firebase.database().ref('services/' + service_type);
    database.on('value', function(snapshot){
        snapshot.forEach(snap => {
            // Fill in relevant place
        })
    })
}

function newAidNeeded(){
    let name;
    let res_addr;
    let descr;
    let payment_mode;
    let service_type;
    firebase.database().ref('services/' + service_type).push({
        id: Math.floor((Math.random() * 100000) + 1),
        name: name,
        res_addr: res_addr,
        descr: descr,
        payment_mode: payment_mode,
        status: "Help Needed",
    })
}

function matchAidWithVolunteer(){
    let id;
    let service_type;
    let volunteer;
    let database = firebase.database().ref('services/' + service_type);
        database.on('value', function(snapshot){
            snapshot.forEach(snap => {
                if(JSON.parse(snap.val().id) == id) {
                    new_withdrawn = snap.val().donated;
                    let db = firebase.database().ref('services/' + service_type + snap.key);
                    db.update({
                        status: "Volunteer: " + volunteer
                    })
                }
            })
        })
}


