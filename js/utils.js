function scrollToSection(section) {
    const element = document.querySelector(section);
    element.scrollIntoView({ behavior: "smooth" });
    }