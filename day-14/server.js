const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
require("dotenv").config();

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
  addProjects,
  deleteProjects,
  editProjects,
  updateProjects,
  renderProjectDetail,
} = require("./controllers/controllers");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("calculateDuration", calculateDuration);
hbs.registerHelper("renderTechIcons", renderTechIcons);
hbs.registerHelper("isSelected", function (array, value) {
  return array.includes(value) ? "checked" : "";
});

app.get("/", renderHome);

app.get("/project", renderProject);
app.get("/project-detail/:index", renderProjectDetail);
app.post("/add-project", addProject);
app.get("/add-project", addProjects);
app.get("/edit-project/:index", editProjects);
app.patch("/update-project/:index", updateProjects);
app.delete("/delete-project/:index", deleteProjects);

app.get("/contact", renderContact);

app.get("/testimonial", renderTestimonial);

app.get("/page-404", render404);
app.get("*", render404);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
