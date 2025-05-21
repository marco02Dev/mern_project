# Full Stack Web Application for Course Management

Web app to manage online courses — a **Full Stack TypeScript SPA portfolio project**, developed using modern CSR frontend technologies and I/O non-blocking server infrastructures. Implemented using the **MERN stack** (_MongoDB, Express.js, React.js, Node.js_), and deployed on **Render**.

## Key Features

- **Scalable and secure architecture** designed for easy maintenance and future project expansion, applying **Node.js** and **React.js** design patterns 
- **Responsive user interface** optimized for both desktop and mobile devices without CSS media queries, using custom React hooks, and advanced **CSS4** techniques, combined with custom animated transitions to ensure smooth navigation between pages
- **Global state management** with **Redux** for greater data efficiency and control  
- **Light/dark theme** implemented using **styled-components** and **CSS-in-JS** techniques, enabling flexible UI customization  
- **Real-time database integration** with **MongoDB Atlas** to display available courses  
- **Secure authentication** implemented with **Passport.js** (local strategy) and **bcrypt** for advanced password hashing  
- **Dedicated admin panel and user panel** built using **Vite** multipage mode and Rollup to create separate private and public JavaScript bundles with shared components
- **Email sending functionality** via a contact form integrated with the back-end using **Nodemailer** with a custom transport 
- **Integration with image hosting** to enhance RAM usage, using **Cloudinary** for image upload and hosting of course thumbnails and product images  


## Instructions

- Replace `.env.example` files with the correct values  
- For the development environment, add `ssl-cert.pem` and `ssl-key.pem` files to the root of the project directory  
  - _(It is recommended to use a mkcert development certificate for consistency with the Vite mkcert dependency installed in the frontend.)_  
  - **Note**: The SSL certificates are not required in production, as the application has been deployed and tested on Render  
- Use `npm run build` to install all dependencies and compile the source code. 
- Then run:
  - `npm run start` to launch the backend in production mode  
  - `npm run dev` to start the Vite development server and the Node.js application server concurrently 

## License

This project is intended solely as a **personal portfolio** to demonstrate development skills.  
**It is allowed to download and modify this project only for private, personal use.**  
**Copying, redistributing, publishing, or using this project or its components** for commercial or non-commercial purposes is not permitted.

By viewing or downloading this project, you agree to respect its intended purpose as a personal showcase only.

[![Creative Commons License](https://mirrors.creativecommons.org/presskit/icons/cc.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![BY](https://mirrors.creativecommons.org/presskit/icons/by.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![NC](https://mirrors.creativecommons.org/presskit/icons/nc.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![ND](https://mirrors.creativecommons.org/presskit/icons/nd.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

**MERN Project Web Courses Portfolio** © 2025 by [Marco Sacco](https://github.com/marco02Dev) is licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)

--- 
