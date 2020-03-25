function logIn(){

}

function checkLoggedIn(){
    fs.readFile('../file/login_details.json', function(err, data) {
        console.log(data)
    });
}

checkLoggedIn()