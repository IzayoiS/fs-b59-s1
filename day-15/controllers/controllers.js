const { calculateDuration } = require("../utils/time");

const { Sequelize, QueryTypes } = require("sequelize");
const { projects } = require("../models");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

function renderHome(req, res) {
  res.render("index");
}

// Project

async function renderProject(req, res) {
  const query = `SELECT * FROM public."projects" order by "createdAt" ASC`;
  const projects = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  console.log(projects);

  res.render("project", { projects: projects });
}

async function addProject(req, res) {
  const {
    project_name,
    description,
    start_date,
    end_date,
    image = "https://picsum.photos/id/1/200/100",
    tech,
  } = req.body;

  const duration = calculateDuration(start_date, end_date);

  const techArray = Array.isArray(tech) ? tech : [tech];

  const query = `
    INSERT INTO public."projects" (project_name, duration, description, start_date, end_date, image, technologies)
    VALUES ('${project_name}', '${duration}', '${description}', '${start_date}', '${end_date}','${image}', ARRAY['${techArray.join(
    "','"
  )}'])
    RETURNING *;
  `;

  const [result] = await sequelize.query(query, {
    type: QueryTypes.INSERT,
  });

  console.log("Project created:", result);

  res.redirect("/project");
}

async function renderProjectDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM public."projects" WHERE id = ${id}`;
  const project = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  console.log("hasil query: ", project[0]);

  res.render("project-detail", { data: project[0] });
}

async function updateProjects(req, res) {
  const { id } = req.params;
  const {
    project_name,
    description,
    start_date,
    end_date,
    image = "https://picsum.photos/id/1/200/100",
    tech,
  } = req.body;

  const duration = calculateDuration(start_date, end_date);

  const techArray = Array.isArray(tech) ? tech : [tech];

  const query = `
    UPDATE public."projects"
    SET 
      project_name = '${project_name}',
      description = '${description}',
      start_date = '${start_date}',
      end_date = '${end_date}',
      image = '${image}',
      duration = ${duration},
      technologies = ARRAY['${techArray.join("','")}']
    WHERE id = ${id}
    RETURNING *;
  `;

  const [updatedProject] = await sequelize.query(query, {
    type: QueryTypes.UPDATE,
  });

  res.redirect("/project");
}

async function deleteProjects(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public."projects" WHERE id = ${id}`;

  await sequelize.query(query, {
    type: QueryTypes.DELETE,
  });

  console.log("Deleted project ID: ", id);

  res.redirect("/project");
}

async function editProjects(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM public."projects" WHERE id = ${id}`;
  const projectToEdit = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  res.render("edit-project", {
    data: {
      ...projectToEdit[0],
      start_date: formatDate(projectToEdit[0].start_date),
      end_date: formatDate(projectToEdit[0].end_date),
    },
  });
}

function renderProjectAdd(req, res) {
  res.render("project-add");
}

function renderContact(req, res) {
  res.render("contact");
}

async function addProjects(req, res) {
  res.render("add-project");
}

function renderTestimonial(req, res) {
  res.render("testimonial");
}

function render404(req, res) {
  res.render("page-404");
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
