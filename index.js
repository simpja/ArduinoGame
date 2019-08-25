var five = require("johnny-five"),
  board,
  potentiometer;
var http = require("http");
var fs = require("fs");
var board = new five.Board();
var potentionmeterData = 12;

http
  .createServer(function(req, res) {
    console.log("req", req.url);
    if (req.url === "/data") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ potentionmeterData }));
      res.end(); //end the response
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    // const html = renderToString(
    //   <GameApp controllerValue={potentionmeterData} />
    // ); // react
    res.write(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Http Fun on a friday</title>
        </head>

        <body>
          <h1 id="data-placeholder">Ingenting</h1>
          <button onclick="postMessage('UP')">UP</button>
          <button onclick="postMessage('DOWN')">DOWN</button>
        </body>

        <script>
          async function postMessage(direction) {
            const API_ENDPOINT = "http://localhost:8080/data";

            const response = await fetch(API_ENDPOINT, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            });

            const json = await response.json();

            document.getElementById(
              "data-placeholder"
            ).innerHTML = "New Value: " + json.potentionmeterData;
            console.log(json);
          }
        </script>
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
