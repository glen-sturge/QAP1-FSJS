//Please run httpServer.js first.
//Simple http request in node.

const http = require("http");

const url = "http://localhost:3000/users";

http.get(url, (res) => {
  //initialize 'data' to hold incomming response data
  let data = "";

  // data event emitted
  // 'chunk' is received and is add it to 'data'
  res.on("data", (chunk) => {
    data += chunk;
    console.log("data recieved...");
  });

  // 'end' event emitted
  res.on("end", () => {
    //store object in 'users'
    const users = JSON.parse(data);
    //log users object to console
    console.log(users);
    //log the user based on id
    console.log(users.find((user) => user.id === 1));
    //loop through users logging details
    for (let user of users) {
      console.log(`User-ID: ${user.id}`);
      console.log(`Username: ${user.name}`);
    }
  });
});
