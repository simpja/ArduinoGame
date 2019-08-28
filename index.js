var five = require("johnny-five"),
  board,
  potentiometer;
var http = require("http");
var fs = require("fs");
var board = new five.Board();
var potentiometerData = 12;

http
  .createServer(function(req, res) {
    console.log("req", req.url);
    if (req.url === "/data") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ potentiometerData }));
      res.end(); //end the response
      return;
    }

    fs.readFile("./index.html", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
    // const html = renderToString(
    //   <GameApp controllerValue={potentiometerData} />
    // ); // react
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
    //console.log(this.value);
    potentiometerData = this.value;
  });
});
