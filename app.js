const express = require("express");
const app = express();
const genres = [
  { id: 1, name: "Drama" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Animated" }
];
app.use(express.json()); //middleware

// REST API
app.get("/", (req, res) => {
  //GET MAIN PAGE LOCALHOST
  res.send("Main Page of Unit");
});

// GET ALL GENRES
app.get("/api/genres", (req, res) => {
  res.send(genres);
});
// POST A GENRE
app.post("/api/genres", (req, res) => {
  genres.push({ id: genres.length + 1, name: req.body.name });
  res.send(genres);
});
// GET ONE GENRE
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(e => e.id === parseInt(req.params.id));
  !genre ? res.status(404).send("No Match") : res.send(genre);
});
// CHANGE ONE GENRE
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find(e => {
    return e.id == parseInt(req.params.id);
  });
  if (!genre) {
    return res.status(404).send("NO MATCH");
  } else {
    genre.name = req.body.name;
    res.send(genre);
  }
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find(e => e.id === parseInt(req.params.id));
  !genre ? res.status("404").send("NO MATCH") : null;
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genres);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
