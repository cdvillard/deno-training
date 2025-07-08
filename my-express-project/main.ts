// @ts-types="npm:@types/express@4.17.15"
import express from "express";
import data from "./data.json" with { type: "json" };

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Dino API!");
})

app.get("/api", (req, res) => {
  res.send(data);
})

app.get("/api/:dinosaur", (req, res) => {
  if (req?.params?.dinosaur) {
    const found = data.find((item) =>
      item.name.toLowerCase() === req.params.dinosaur.toLowerCase()
    );

    if (found) {
      res.send(found);
    } else {
      res.send("No dinos found.");
    }
  }
});

app.listen(8000);
console.log('Server is running on http://localhost:8000');