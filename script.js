document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            loadMetaData(data.meta);
            loadAbout(data.about);
            loadProjects(data.projects);
            loadSkills(data.skills);
            loadContact(data.contact);
        })
        .catch(error => console.error("Error loading JSON data:", error));

    // Responsive Navbar Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Toggle navbar for burger icon click
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    // Close navbar on link click for smaller devices
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        });
    });
});

function loadMetaData(meta) {
    document.getElementById("meta-description").setAttribute("content", meta.description);
    document.getElementById("meta-author").setAttribute("content", meta.author);
    document.getElementById("meta-keywords").setAttribute("content", meta.keywords.join(", "));
    document.getElementById("favicon").setAttribute("href", meta.logo);
    const ogImage = document.querySelector('meta[property="og:image"]');
    ogImage.setAttribute("content", meta.logo);
}

function loadAbout(aboutArray) {
    const aboutSection = document.getElementById("about-text");
    aboutSection.innerHTML = ''; // Clear existing content
    aboutArray.forEach(line => {
        const paragraph = document.createElement('p');
        paragraph.textContent = line;
        aboutSection.appendChild(paragraph);
    });
}

function loadProjects(projects) {
    const projectsList = document.getElementById("projects-list");
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;
        projectsList.appendChild(projectCard);
    });
}

function loadSkills(skills) {
    const skillsList = document.getElementById("skills-list");
    skills.forEach(skill => {
        const skillBadge = document.createElement("div");
        skillBadge.classList.add("skill-badge");

        skillBadge.innerHTML = `
            <div class="skill-badge-inner skill-badge-front">${skill.name}</div>
            <div class="skill-badge-inner skill-badge-back">Click for Info</div>
        `;

        skillBadge.addEventListener("click", () => {
            openPopup(skill.name, skill.description);
        });

        skillsList.appendChild(skillBadge);
    });
}

function loadContact(contact) {
    document.getElementById("contact-email").textContent = contact.email;
    // document.getElementById("contact-phone").textContent = contact.phone;

    const socialMediaLinksDiv = document.getElementById("social-media-links");
    socialMediaLinksDiv.innerHTML = ''; // Clear existing content

    for (const [platform, url] of Object.entries(contact.socialMedia)) {
        const link = document.createElement('a');
        link.href = url;
        link.target = "_blank"; // Open in new tab
        link.textContent = platform.charAt(0).toUpperCase() + platform.slice(1); // Capitalize platform name
        link.style.marginRight = '15px'; // Add some spacing between links
        socialMediaLinksDiv.appendChild(link);
    }
}

function openPopup(skillName, skillDescription) {
    const popup = document.getElementById("skill-info-popup");
    const popupText = document.getElementById("skill-info-text");

    popupText.textContent = `${skillName}: ${skillDescription}`;
    popup.style.display = "block";

    const closeBtn = document.querySelector(".popup .close");
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });
}

window.onclick = function(event) {
    const popup = document.getElementById("skill-info-popup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
};
