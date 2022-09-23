const express = require("express");
const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost/acme_db");

const Thing = db.define("thing", {
  name: Sequelize.DataTypes.STRING,
});

const app = express();
const path = require("path");

app.use(express.json());
app.use("/dist", express.static("dist"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

const port = process.env.PORT || 3000;

app.get("/things", async (req, res) => {
  res.send(await Thing.findAll());
});

app.post("/thing", async (req, res) => {
  res.send(await Thing.create({ name: req.body.name }));
});

app.delete("/thing/:id", async (req, res) => {
  const thing = await Thing.findByPk(req.params.id);
  await thing.destroy();
  res.sendStatus(204);
});

app.put("/thing/:id", async (req, res) => {
  const thing = await Thing.findByPk(req.params.id);
  thing.name = req.body.name;
  await thing.save();

  res.send(thing);
});

const init = async () => {
  //sync database and seed data here
  await db.sync({ force: true });
  const things = [
    "computer",
    "mouse",
    "keyboard",
    "imjustlookingatthingsonmydesk",
    "laptop",
    "camera",
    "microphone",
  ];

  await Promise.all(things.map((thing) => Thing.create({ name: thing })));

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
