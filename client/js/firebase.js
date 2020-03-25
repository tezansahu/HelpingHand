let url = "http://127.0.0.1:3000";

let requests = {};

var firebaseConfig = {
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
    let addr;
    doCall(`${url}/ethBalance?address=${addr}`, (res) => {
        // Change necessary values
    })
}

// getBal()

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
    let service_types = ["medicines", "daily_essentials", "physical_assistance"];

    for(i =0; i < service_types.length; i++){
        let service_type = service_types[i];
        let database = firebase.database().ref('services/' + service_type);
        database.on('value', function(snapshot){
            snapshot.forEach(snap => {
                console.log(snap.val())
                console.log(`${service_type}_table_body`)
                document.getElementById(`${service_type}_table_body`).innerHTML += 
                    `<tr class="clickable-row" value=${snap.key}>
                    <th scope="row">${snap.key}</th>
                    <td>${snap.val()["name"]}</td>
                    <td>${snap.val()["res_addr"]}</td>
                    <td>${snap.val()["descr"]}</td>
                    <td>${snap.val()["status"]}</td>
                    </tr>
                    `
                requests[snap.key] = {
                    "name": snap.val()["name"],
                    "addr": snap.val()["res_addr"],
                    "descr": snap.val()["descr"],
                    "status": snap.val()["status"],
                    "type": service_type
                }
            })
        })
    }
    
}

retrieveAidsNeeded()

function newAidNeeded(){
    let name = document.getElementById("service_name").value;
    let res_addr = document.getElementById("service_addr").value;
    let descr = document.getElementById("service_descr").value;
    // let payment_mode;
    let service_type = document.getElementById("service_type").value;
    console.log(name, res_addr, descr, service_type);


    firebase.database().ref(`services/${service_type}`).push({
        name: name,
        res_addr: res_addr,
        descr: descr,
        status: "Help Needed",
    });

    alert("Request for Assistance has been recorded")
}

function matchAidWithVolunteer(){
    let id = document.getElementById("volunteer_id").value;
    let service_type;
    try{
        service_type = requests[id]["type"];
    }
    catch {
        alert("Invalid ID");
        return
    }
    
    let volunteer = "Mr. X";
    try{
        let database = firebase.database().ref('services/' + service_type);
        database.on('value', function(snapshot){
            snapshot.forEach(snap => {
                if(snap.key == id) {
                    alert("Found")
                    let db = firebase.database().ref('services/' + service_type + "/" + snap.key);
                    db.update({
                        status: "Volunteer: " + volunteer
                    })
                }
            })
        })
        
    }
    catch{
        alert("Sorry! Could not process your request")
        return;
    }
    alert("You have been successfully matched to " + requests[id]["name"])
    
}

function getUserDetails(){
    let database = firebase.database().ref('users');
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


