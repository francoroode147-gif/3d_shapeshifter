/* =========================================================
   3D SHAPESHIFTER — WEBSITE INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     MOBILE NAVIGATION
     --------------------------------------------------------- */

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");

      menu.setAttribute("aria-expanded", open);

      // Optional visual feedback
      menu.classList.toggle("active", open);
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menu.classList.remove("active");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* ---------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ---------------------------------------------------------
     GALLERY FILTERS
     --------------------------------------------------------- */

  const filterButtons =
    document.querySelectorAll(".filters button");

  const galleryItems =
    document.querySelectorAll(".gallery-item");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter = button.dataset.filter;

      // Update active button
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");


      // Filter gallery
      galleryItems.forEach(item => {

        const category = item.dataset.category;

        const show =
          filter === "all" ||
          category === filter;


        if (show) {

          item.classList.remove("hidden");

          // Small animation reset
          requestAnimationFrame(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          });

        } else {

          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";

          setTimeout(() => {
            item.classList.add("hidden");
          }, 200);

        }

      });

    });

  });


  /* ---------------------------------------------------------
     LIGHTBOX
     --------------------------------------------------------- */

  const lightbox =
    document.getElementById("lightbox");

  if (lightbox) {

    const lightboxArt =
      lightbox.querySelector(".lightbox-art");

    const lightboxTitle =
      lightbox.querySelector("h3");

    const closeButton =
      lightbox.querySelector(".lightbox-close");


    function openLightbox(item) {

      const object =
        item.querySelector(".placeholder-object");

      if (!object) return;


      lightboxArt.style.background =
        item.style.getPropertyValue("--bg");

      lightboxArt.innerHTML =
        object.outerHTML;

      lightboxTitle.textContent =
        item.dataset.title || "3D Shapeshifter";


      lightbox.classList.add("open");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );

      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    }


    function closeLightbox() {

      lightbox.classList.remove("open");

      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.style.overflow = "";
    }


    // Open
    galleryItems.forEach(item => {

      item.addEventListener("click", () => {
        openLightbox(item);
      });

    });


    // Close button
    closeButton?.addEventListener(
      "click",
      closeLightbox
    );


    // Click outside
    lightbox.addEventListener("click", event => {

      if (event.target === lightbox) {
        closeLightbox();
      }

    });


    // ESC key
    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeLightbox();
      }

    });

  }


  /* ---------------------------------------------------------
     QUOTE FORM
     --------------------------------------------------------- */

  const form =
    document.getElementById("quoteForm");


  if (form) {

    const message =
      form.querySelector(".form-message");

    const submitButton =
      form.querySelector("button[type='submit']");


    form.addEventListener("submit", event => {

      event.preventDefault();


      const data =
        new FormData(form);


      const name =
        data.get("name")?.trim();

      const email =
        data.get("email")?.trim();

      const phone =
        data.get("phone")?.trim();

      const project =
        data.get("project")?.trim();

      const description =
        data.get("description")?.trim();

      const quantity =
        data.get("quantity")?.trim();

      const file =
        data.get("file");


      /* -------------------------------------------------------
         BASIC VALIDATION
         ------------------------------------------------------- */

      if (!name || !email || !project || !description) {

        message.textContent =
          "Please complete all required fields.";

        message.classList.add("error");

        return;
      }


      message.classList.remove("error");


      /* -------------------------------------------------------
         BUTTON LOADING STATE
         ------------------------------------------------------- */

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.dataset.originalText =
          submitButton.innerHTML;

        submitButton.innerHTML =
          "Preparing Quote Request...";
      }


      /* -------------------------------------------------------
         EMAIL CONTENT
         ------------------------------------------------------- */

      const subject = encodeURIComponent(
        `3D Shapeshifter Quote Request — ${project}`
      );


      const body = encodeURIComponent(
`Hello 3D Shapeshifter,

I would like to request a quote.

━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

PROJECT DETAILS

Project: ${project}
Quantity: ${quantity || "Not specified"}

DESCRIPTION

${description}

REFERENCE FILE

${file?.name || "No file attached"}

PREFERRED CONTACT

${phone ? "Phone / WhatsApp" : "Email"}

━━━━━━━━━━━━━━━━━━━━━━

Thank you,
${name}`
      );


      /* -------------------------------------------------------
         OPEN EMAIL
         ------------------------------------------------------- */

      setTimeout(() => {

        window.location.href =
          `mailto:KianbothaMTB@gmail.com?subject=${subject}&body=${body}`;


        message.textContent =
          "Your quote request has been prepared. Your email application should open now.";

        message.classList.add("success");


        if (submitButton) {

          submitButton.disabled = false;

          submitButton.innerHTML =
            submitButton.dataset.originalText ||
            "Request My Quote";

        }

      }, 500);

    });

  }


  /* ---------------------------------------------------------
     SMOOTH SCROLL
     --------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetID =
        link.getAttribute("href");

      const target =
        document.querySelector(targetID);


      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ---------------------------------------------------------
     HEADER SCROLL EFFECT
     --------------------------------------------------------- */

  const header =
    document.querySelector("header");


  if (header) {

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

      const currentScroll =
        window.scrollY;


      if (currentScroll > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }


      // Don't hide header on mobile
      if (window.innerWidth > 768) {

        if (
          currentScroll > lastScroll &&
          currentScroll > 200
        ) {

          header.classList.add("hide");

        } else {

          header.classList.remove("hide");

        }

      }


      lastScroll = currentScroll;

    }, {
      passive: true
    });

  }


  /* ---------------------------------------------------------
     BUTTON PRESS EFFECT
     --------------------------------------------------------- */

  document.querySelectorAll(".button").forEach(button => {

    button.addEventListener("mousedown", () => {
      button.classList.add("pressed");
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove("pressed");
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("pressed");
    });

  });


  /* ---------------------------------------------------------
     PHONE / WHATSAPP ANALYTICS
     --------------------------------------------------------- */

  document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      const href =
        link.getAttribute("href") || "";


      if (href.includes("wa.me")) {
        console.log("3D Shapeshifter: WhatsApp clicked");
      }

      if (href.startsWith("tel:")) {
        console.log("3D Shapeshifter: Phone clicked");
      }

      if (href.startsWith("mailto:")) {
        console.log("3D Shapeshifter: Email clicked");
      }

    });

  });


  /* ---------------------------------------------------------
     CONSOLE BRANDING
     --------------------------------------------------------- */

  console.log(
    "%c3D SHAPESHIFTER",
    "font-size:20px;font-weight:bold;color:#CCFF00;"
  );

  console.log(
    "%cTurning Ideas Into Reality, Layer by Layer.",
    "color:#888;font-size:12px;"
  );

});
