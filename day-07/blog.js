let blogs = [];

function addBlog(e) {
  e.preventDefault();
  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let imageInput = document.getElementById("input-blog-image").files[0];

  if (title == "" || content == "" || !imageInput) {
    return alert("All input fields cannot be empty");
  }

  let image = URL.createObjectURL(imageInput);

  let blog = {
    author: "Karunia Leo G",
    title: title,
    image: imageInput,
    content: content,
    postedAt: new Date(),
  };

  blogs.push(blog);

  renderBlog();
}

function renderBlog() {
  let blogContainer = document.querySelector(".blog-container .blog-list");
  blogContainer.innerHTML = ""; // Membersihkan kontainer sebelum menambahkan blog baru

  blogs.forEach((blog) => {
    let blogElement = `
      <div class="blog-list-item">
        <div class="blog-image">
          <img src="${blog.image}" alt="blog-image" />
        </div>
        <div class="blog-content">
          <h1>${blog.title}</h1>
          <div class="detail-blog-content">
            ${formatDate(blog.postedAt)} | ${blog.author}
          </div>
          <p class="blog-text">${blog.content}</p>
        </div>
      </div>
    `;
    blogContainer.innerHTML += blogElement;
  });
}

// Fungsi untuk memformat tanggal
function formatDate(date) {
  let d = new Date(date);
  return `${d.getDate()} ${d.toLocaleString("default", {
    month: "short",
  })} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}
