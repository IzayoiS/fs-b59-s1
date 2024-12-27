const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {
  renderHome,
  renderContact,
  renderProject,
  render404,
} = require("./controllers/controllers");

const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "./assets")));
hbs.registerPartials(__dirname + "/views/partials", function (err) {});

app.get("/", renderHome);

app.get("/contact", renderContact);

app.get("/project", renderProject);

app.get("*", render404);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
