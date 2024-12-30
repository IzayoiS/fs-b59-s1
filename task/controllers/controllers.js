const {
  formatDateToWIB,
  calculateDuration,
  renderTechIcons,
} = require("../utils/time");

const { Sequelize, QueryTypes } = require("sequelize");
const { projects } = require("../models");
const config = require("../config/config.json");

const sequelize = new Sequelize(config.development);

function renderHome(req, res) {
  res.render("index");
}

// Project

// let projects = [
//   {
//     project_name: "Test",
//     description: "dqwdqwdqw",
//     duration: 2,
//     start_date: "2024-10-04",
//     end_date: "2024-12-27",
//     image: "https://picsum.photos/id/1/200/100",
//     technologies: ["check-reactjs", "check-typescript"],
//     postedAt: new Date(),
//   },
//   {
//     project_name: "Tesqwdt",
//     description: "dqwdqwdqw",
//     duration: 2,
//     start_date: "2024-10-04",
//     end_date: "2024-12-27",
//     image: "https://picsum.photos/id/1/200/100",
//     technologies: ["check-reactjs", "check-typescript"],
//     postedAt: new Date(),
//   },
//   {
//     project_name: "Tesqwdt",
//     description: "dqwdqwdqw",
//     duration: 2,
//     start_date: "2024-10-04",
//     end_date: "2024-12-27",
//     image: "https://picsum.photos/id/1/200/100",
//     technologies: ["check-reactjs", "check-typescript"],
//     postedAt: new Date(),
//   },
// ];

async function renderProject(req, res) {
  const query = `SELECT * FROM public."projects"`;
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
    duration,
    start_date,
    end_date,
    image,
    technologies,
  } = req.body;

  const query = `
    INSERT INTO public."projects"
    (project_name, description, duration, start_date, end_date, image, technologies, posted_at)
    VALUES
    ('${project_name}', '${description}', ${duration}, '${start_date}', '${end_date}', '${image}', '{${technologies.join(
    ","
  )}}', NOW())
    RETURNING *;
  `;

  const result = await sequelize.query(query, {
    type: QueryTypes.INSERT,
  });

  console.log("Created project: ", result);
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
    duration,
    start_date,
    end_date,
    image,
    technologies,
  } = req.body;

  const query = `
    UPDATE public."projects"
    SET 
      project_name = '${project_name}',
      description = '${description}',
      duration = ${duration},
      start_date = '${start_date}',
      end_date = '${end_date}',
      image = '${image}',
      technologies = '{${technologies.join(",")}}'
    WHERE id = ${id};
  `;

  await sequelize.query(query, {
    type: QueryTypes.UPDATE,
  });

  console.log("Updated project ID: ", id);
  res.redirect(`/project-detail/${id}`);
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

function editProjects(req, res) {
  const { id } = req.params;

  projects.findByPk(id).then((project) => {
    res.render("edit-project", { data: project });
  });
}

// OLD WITHOUT SEQUELIZE

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

// function updateProjects(req, res) {
//   const index = req.params.index;

//   const { project_name, description, start_date, end_date, tech } = req.body;

//   const duration = calculateDuration(start_date, end_date);

//   let selectedTechnologies = Array.isArray(tech) ? tech : [tech];

//   let updatedProject = {
//     project_name,
//     description,
//     duration,
//     start_date,
//     end_date,
//     image: "https://picsum.photos/id/1/200/100",
//     technologies: selectedTechnologies,
//     postedAt: new Date(),
//   };

//   console.log(updatedProject);
//   projects[index] = updatedProject;
//   console.log("Request Body:", req.body);

//   res.redirect("/project");
// }

// function editProjects(req, res) {
//   const index = req.params.index;
//   const dataEditProject = projects[index];
//   res.render("edit-project", { data: dataEditProject, index });
// }

// function deleteProjects(req, res) {
//   const index = req.params.index;

//   projects.splice(index, 1);

//   res.redirect("/project");
// }

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
