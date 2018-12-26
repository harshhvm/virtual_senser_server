const request = require('request');

function intervalFunc() {

var fun=Math.floor((Math.random()*25));

payload={
 Sensor: "Ultrasonic Sensor" ,
 distance : fun,
 units: "cm"
}
z

// Options for GET 
var options = {
  uri: "http://localhost:4000/",
  headers: {
    'Content-Type': "application/json"

},
body:JSON.stringify(payload)
};


request.post(options, (err, res, body) => {
console.log(body);
})

}
setInterval(intervalFunc, 5000);
