var five = require("johnny-five"),
  board,
  potentiometer;
var http = require("http");
var fs = require("fs");
var board = new five.Board();
var potentionmeterData;

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("hello world: " + potentionmeterData.toString());
    res.end();
  })
  .listen(8080);

board.on("ready", function() {
  // Create a new 'potentiometer' hardware instance
  potentiometer = new five.Sensor({
    pin: "A3",
    freq: 250
  });

  // Inject the 'sensor' hardware into
  // the repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer
  });

  // "data" get the current reading from the potentiometer
  potentiometer.on("data", function() {
    console.log(this.value);
    potentionmeterData = this.value;
  });
});
