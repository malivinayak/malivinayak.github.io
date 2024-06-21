// document.addEventListener('DOMContentLoaded', function() {
//     const projects = [
//       {
//         "name": "Auxpert - Your Automotive Expert",
//         "technologies": "Figma, Canva, Dart, TypeScript, Node.js, Firebase",
//         "description": "Developed a cross-platform mobile application for car service booking."
//       },
//       {
//         "name": "Trip Management System",
//         "technologies": "Bootstrap, Express.js, Oracle DB",
//         "description": "Implemented advanced database concepts and developed user-friendly interfaces."
//       },
//       {
//         "name": "Message Encryption Decryption System",
//         "technologies": "Java, Android Studio",
//         "description": "Developed an Android application for secure message encryption and decryption."
//       }
//     ];
  
//     const projectsContainer = document.getElementById('projects-container');
  
//     projects.forEach(project => {
//       const projectDiv = document.createElement('div');
//       projectDiv.className = 'project';
//       projectDiv.innerHTML = `
//         <h3>${project.name}</h3>
//         <p><strong>Technologies:</strong> ${project.technologies}</p>
//         <p>${project.description}</p>
//       `;
//       projectsContainer.appendChild(projectDiv);
//     });
//   });
  
  document.addEventListener('DOMContentLoaded', function() {
    fetch('projects.json')
      .then(response => response.json())
      .then(projects => {
        const projectsContainer = document.getElementById('projects-container');
        projects.forEach(project => {
          const projectDiv = document.createElement('div');
          projectDiv.className = 'project';
          projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <p><strong>Technologies:</strong> ${project.technologies}</p>
            <p>${project.description}</p>
          `;
          projectsContainer.appendChild(projectDiv);
        });
      })
      .catch(error => console.error('Error fetching projects:', error));
  });
   