// require/enable http module
const http = require("http");

//using http module, create a server and store it in the variable 'server'
const server = http.createServer((req, res) => {
  //Request handling logic
  //log the request url
  console.log(`Request url: ${req.url}\n`);

  //set the response content-type to text/html
  res.setHeader("Content-type", "text/html");
  //switch statement, allows for different routes based on the request url.
  switch (req.url) {
    case "/":
      //set response status code
      res.statusCode = 200;
      //log where the user is on the website.
      console.log("Connected user on the root of the page!");
      //because only demonstrating http in this example
      //just writing some basic html elements to the response.
      //this patern is repeated for each route.
      res.write("<h1>This is the root of the website! Welcome!<h1/>");
      res.write("<h2>Basic info header</h2>");
      res.write("<p>Root page paragraph!</p>");
      res.end();
      break;
    case "/about":
      res.statusCode = 200;
      console.log("Connected user on the 'about' route of the page!");
      res.write("<h1>This is the about page of the website! Welcome!<h1/>");
      res.write("<h2>Basic info header</h2>");
      res.write("<p>about page paragraph!</p>");
      res.end();
      break;
    //case demonstrating a permanant redirect
    case "/about-old":
      // The HTTP response status code 301 Moved Permanently is used for permanent redirecting,
      res.statusCode = 301;
      console.log("Redirecting user...");
      //set Location url to desired redirect
      res.setHeader("Location", "/about");
      res.end();
      break;
    case "/keyin":
      res.statusCode = 200;
      console.log("Connected user on the 'keyin' route of the page!");
      res.write("<h1>This is the 'keyin' route of the website! Welcome!<h1/>");
      res.write("<h2>Basic info header</h2>");
      res.write("<p>keyin page paragraph!</p>");
      res.end();
      break;
    case "/users":
      res.statusCode = 200;
      console.log("Connected user on the 'users' route of the page!");
      res.setHeader("Content-type", "application/json");
      res.write(
        JSON.stringify([
          { id: 1, name: "Andy Andrews" },
          { id: 2, name: "Billy Bob" },
          { id: 3, name: "Candice Collins" },
        ])
      );
      res.end();
      break;
    default:
      res.statusCode = 404;
      console.log(
        "Whoops! 404: Connected user attempted to reach undefined resource!"
      );
      console.log(res.statusCode);
      res.write(
        `<h1>${res.statusCode}: Whoops! That resource doesn't exist!<h1/>`
      );
      res.end();
      break;
  }
});

// a count for connections since server restart
let connectionCount = 0;

// when a connection event is emitted from the server
// increment connection count and display a message in server console
server.on("connection", (socket) => {
  // console.log(socket); //pretty big object!
  connectionCount++;
  console.log(
    `\nNew connection...\nTotal connections since server restart: ${connectionCount}\n`
  );
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
