const {
  formatDateToWIB,
  calculateDuration,
  renderTechIcons,
} = require("../utils/time");

function renderHome(req, res) {
  res.render("index");
}

// Project

let projects = [];

function renderProject(req, res) {
  const objectToSend = {
    projects: projects,
  };
  res.render("project", objectToSend);
}

function renderProjectAdd(req, res) {
  res.render("project-add");
}

function addProject(req, res) {
  console.log("Form Submitted");

  const { project_name, description, start_date, end_date, tech } = req.body;

  const duration = calculateDuration(start_date, end_date);

  let selectedTechnologies = Array.isArray(tech) ? tech : [tech];

  if (end_date < start_date) {
    return res.render("project", {
      errorMessage: "End date must be later than start date.",
    });
  }

  let project = {
    project_name,
    description,
    duration,
    image: req.body.image || "../assets/images/blog-img-detail.png",
    technologies: selectedTechnologies,
    postedAt: new Date(),
    postedAtFormatted: formatDateToWIB(new Date()),
  };
  projects.push(project);
  console.log(projects);

  res.redirect("/project");
}

function renderContact(req, res) {
  res.render("contact");
}

function renderTestimonial(req, res) {
  res.render("testimonial");
}

function render404(req, res) {
  res.send("Halaman tidak ditemukan");
}

module.exports = {
  renderHome,
  renderContact,
  renderTestimonial,
  renderProject,
  renderProjectAdd,
  addProject,
  render404,
};
