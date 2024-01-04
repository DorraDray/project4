import Database from "better-sqlite3";
const db = new Database("database.db");

import express, { json } from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
  response.json("You are looking at my root route. How roude!");
});
app.get("/messages", function(request, response) {
  let messages = [];
  // check if the user has provided a query in the URL (/messages?id=2)
  if (request.query.id) {
    messages = db
      .prepare(`SELECT * FROM messages WHERE id=${request.query.id}`)
      .all();
  } else {
    // if the URL has no query, get ALL the jokes
    messages = db.prepare("SELECT * FROM messages").all();
  }
  response.json(messages);
});

app.delete("/messages/:id", function(request, response) {
  let id = request.params.id;
  db
    .prepare(`DELETE FROM messages WHERE id = ?`)
    .run(id);
    response.json("");
});

app.post("/messages", function(request, response) {
  console.log(request.body);
  const name = request.body.name;
  const message = request.body.message;
  const smiley = request.body.smiley;
  console.log(smiley);

  const newMessage = db
    .prepare(`INSERT INTO messages (name, message, smiley) VALUES (?, ?, ?)`)
    .run(name, message, smiley);

  response.json(newMessage);
});



app.listen(8080, function () {
  console.log("IT'S WORKING!");
});