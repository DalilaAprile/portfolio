function scrollToFirst(el, offset = 0) {
  if (!el) return;
  const headerHeight = document.querySelector("header")?.offsetHeight || 0;
  const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerHeight - offset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

function closeMobileMenu() {
  const menuMobile = document.querySelector(".menu-mobile");
  if (menuMobile.classList.contains("open")) {
    menuMobile.classList.remove("open");
  }
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle.classList.contains("open")) {
    menuToggle.classList.remove("open");
  }
  document.body.classList.remove("mobile-menu-open");
}

function scrollToFirstFigure() {
  const firstFigure = document.querySelector("figure");
  closeMobileMenu();
  scrollToFirst(firstFigure, 80);
}

function scrollToContact() {
  const contact = document.getElementById("contact");
  closeMobileMenu();
  scrollToFirst(contact);
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function playFirstVideoOnScroll() {
  const video = document.querySelector("video");
  if (video && video.paused) {
    video
      .play()
      .then(() => {
        window.removeEventListener("scroll", onScrollPlayVideo);
      })
      .catch(console.error);
  }
}

function sendEmail(event) {
  event.preventDefault();

  const name = document.getElementById("input_name").value.trim();
  const lastName = document.getElementById("input_last_name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !lastName || !message) {
    alert("Please fill in all the fields");
    return;
  }

  const emailBody = encodeURIComponent(message);
  const mailtoLink = `mailto:dalilaprl3@gmail.com?subject=${encodeURIComponent(
    `Contact request from ${name} ${lastName}`
  )}&body=${emailBody}`;

  window.location.href = mailtoLink;
}

const onScrollPlayVideo = debounce(playFirstVideoOnScroll, 200);

window.addEventListener("load", () => {
  const projectsLinks = document.getElementsByClassName("projects-link");
  for (const link of projectsLinks) {
    link.addEventListener("click", scrollToFirstFigure);
  }

  const contactsLink = document.getElementsByClassName("contact-link");
  for (const link of contactsLink) {
    link.addEventListener("click", scrollToContact);
  }

  if (window.location.hash === "#projects") {
    scrollToFirstFigure();
  }

  if (window.SimpleLightbox !== undefined) {
    new window.SimpleLightbox(".project-detail a", {});
  }

  window.addEventListener("scroll", onScrollPlayVideo);

  const submitButton = document.querySelector(".contact__submit");

  submitButton.addEventListener("click", sendEmail);

  const menuToggle = document.querySelector(".menu-toggle");
  const menuMobile = document.querySelector(".menu-mobile");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    menuMobile.classList.toggle("open");
    document.body.classList.toggle("mobile-menu-open");
  });

  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      backToTop.style.opacity = 1;
    } else {
      backToTop.style.opacity = 0;
    }
  });

  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const images = document.querySelectorAll(".project-detail__product img");
  if (images.length) {
    new SimpleParallax(images, {
      delay: 0,
      orientation: "down",
      scale: 5,
      // overflow: true,
      // customContainer: '.container',
      customWrapper: '.project-detail__product'
    });
  }
});
