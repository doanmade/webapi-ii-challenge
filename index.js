const express = require("express");

const postRouter = require("./DB/Post/post-router.js");

const server = express();

const port = 8080;
server.use(express.json());

server.use("/api/post", postRouter);

// server.get("/", (req, res) => {
//   res.send(`
//     <h2>Lambdas API</h>
//     <p>Welcome to the Lambda API</p>
//   `);
// });

server.listen(port, () => {
  console.log(`\n *** server is listing one port ${port}\n`);
});
