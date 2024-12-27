let testimonials = [
  {
    author: "Leo G",
    rating: 5,
    content: "Keren banget websitenya!",
    image: "blog-img-detail.png",
  },
  {
    author: "Nur M Arofiq",
    rating: 2,
    content: "Mantaapp! Terima kasih.",
    image: "blog-img-detail.png",
  },
  {
    author: "Rendy Zulfan",
    rating: 3,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea reiciendis qui molestias blanditiis inventore reprehenderit nesciunt sequi pariatur quaerat? Error?",
    image: "blog-img-detail.png",
  },
  {
    author: "Syifa Maulaya",
    rating: 4,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, commodi obcaecati necessitatibus totam reprehenderit fuga.",
    image: "blog-img-detail.png",
  },
  {
    author: "Pandu Rizky",
    rating: 5,
    content: "Keren bener gannn",
    image: "blog-img-detail.png",
  },
];

const testimonialsContainer = document.getElementById("testimonialsContainer");

const testimonialsHTML = (daftarTestimoni) => {
  return daftarTestimoni
    .map(
      (testimonial) => `
      <div class="card my-3 p-2 col-4" style="width: 18rem">
        <img
          src="assets/images/${testimonial.image}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <p class="card-text">
            ${testimonial.content}
          </p>
          <p>- ${testimonial.author}</p>
          <p>${testimonial.rating}⭐</p>
        </div>
      </div>
    `
    )
    .join("");
};

function showAllTestimonials() {
  testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

function filterTestimonialByStar(rating) {
  const filteredTestimonial = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );

  console.log(filteredTestimonial);

  if (filteredTestimonial.length === 0) {
    return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
  }

  setTimeout(() => {
    testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonial);
  }, 1000);
}
