const express = require("express");
const path = require("path");
const {
  formatDateToWIB,
  getRelativeTime,
  calculateDuration,
  renderTechIcons,
} = require("./utils/time");

const hbs = require("hbs");

const {
  renderHome,
  renderContact,
  addProject,
  renderProject,
  render404,
  renderTestimonial,
} = require("./controllers/controllers");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "./assets")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("calculateDuration", calculateDuration);
hbs.registerHelper("renderTechIcons", renderTechIcons);

app.get("/", renderHome);
app.get("/contact", renderContact);
app.post("/add-project", addProject);
app.get("/project", renderProject);
app.get("/testimonial", renderTestimonial);
app.get("*", render404);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
