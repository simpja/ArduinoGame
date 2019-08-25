var five = require("johnny-five"),
  board,
  potentiometer;
var http = require("http");
var fs = require("fs");
var board = new five.Board();
var potentionmeterData = 12;

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    // const html = renderToString(
    //   <GameApp controllerValue={potentionmeterData} />
    // ); // react
    res.write(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>ArduinoGame</title>
      </head>
      <body>
       <h1>Hi! This is the value: ${potentionmeterData}</h1> 
      </body>
      </html>
    `);
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
