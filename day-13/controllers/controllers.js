const {
  formatDateToWIB,
  calculateDuration,
  renderTechIcons,
} = require("../utils/time");

function renderHome(req, res) {
  res.render("index");
}

// Project

let projects = [
  // {
  //   project_name: "Test",
  //   description: "dqwdqwdqw",
  //   duration: 2,
  //   start_date: "2024-10-04",
  //   end_date: "2024-12-27",
  //   image: "https://picsum.photos/id/1/200/100",
  //   technologies: ["check-reactjs", "check-typescript"],
  //   postedAt: new Date(),
  // },
  // {
  //   project_name: "Tesqwdt",
  //   description: "dqwdqwdqw",
  //   duration: 2,
  //   start_date: "2024-10-04",
  //   end_date: "2024-12-27",
  //   image: "https://picsum.photos/id/1/200/100",
  //   technologies: ["check-reactjs", "check-typescript"],
  //   postedAt: new Date(),
  // },
];

function renderProject(req, res) {
  const objectToSend = {
    projects: projects,
  };
  res.render("project", objectToSend);
}

function renderProjectDetail(req, res) {
  const index = req.params.index;

  res.render("project-detail", { data: projects[index] });
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
    start_date,
    end_date,
    image: "/assets/images/blog-img-detail.png",
    technologies: selectedTechnologies,
    postedAt: new Date(),
    postedAtFormatted: formatDateToWIB(new Date()),
  };
  projects.push(project);
  console.log(projects);

  res.redirect("/project");
}

function updateProjects(req, res) {
  const index = req.params.index;

  const { project_name, description, start_date, end_date, tech } = req.body;

  const duration = calculateDuration(start_date, end_date);

  let selectedTechnologies = Array.isArray(tech) ? tech : [tech];

  let updatedProject = {
    project_name,
    description,
    duration,
    start_date,
    end_date,
    image: "https://picsum.photos/id/1/200/100",
    technologies: selectedTechnologies,
    postedAt: new Date(),
  };

  console.log(updatedProject);
  projects[index] = updatedProject;
  console.log("Request Body:", req.body);

  res.redirect("/project");
}

function editProjects(req, res) {
  const index = req.params.index;
  const dataEditProject = projects[index];
  res.render("edit-project", { data: dataEditProject, index });
}

function deleteProjects(req, res) {
  const index = req.params.index;

  projects.splice(index, 1);

  res.redirect("/project");
}

function renderContact(req, res) {
  res.render("contact");
}

function addProjects(req, res) {
  res.render("add-project");
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
  addProjects,
  deleteProjects,
  editProjects,
  updateProjects,
  renderProjectDetail,
};
