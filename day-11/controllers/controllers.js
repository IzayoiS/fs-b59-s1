function renderHome(req, res) {
  res.render("index");
}

function renderProject(req, res) {
  res.render("project");
}

function renderContact(req, res) {
  res.render("contact");
}

function render404(req, res) {
  res.send("Halaman tidak ditemukan");
}

module.exports = {
  renderHome,
  renderContact,
  renderProject,
  render404,
};
