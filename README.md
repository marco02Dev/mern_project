Full Stack Web Application for Course Management

This application was developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) as a portfolio project to showcase Full Stack web development skills.

Key features include:
- Responsive user interface optimized for both desktop and mobile devices;
- Global state management with Redux for greater data efficiency and control;
- Light/dark theme implemented using styled-components and CSS-in-JS techniques, enabling flexible UI customization;
- Secure authentication with advanced password encryption;
- Email sending functionality via a contact form integrated with the back-end;
- Dedicated admin panel for creating, editing, and deleting courses dynamically;
- Custom animated transitions for smooth navigation between pages;
- Real-time database integration to display available courses;
- Scalable and secure architecture designed for easy maintenance and future project expansion;

Instructions:
- Replace .env.example files with the correct values;
- For the development environment, add ssl-cert.pem and ssl-key.pem files to the root of the project directory. (It is recommended to use a mkcert development certificate for consistency with the Vite mkcert dependency installed in the frontend.) Note: The SSL certificates are not required in production, as the application has been deployed and tested on Render.
- Use npm run build to install all dependencies, then npm run start to launch the backend in production mode, or npm run dev to start the Vite development server and the Node.js application server concurrently.

