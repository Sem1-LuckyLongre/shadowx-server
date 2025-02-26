<<<<<<< HEAD
# Hello i'm ShadowX. 
## This is My Portfolio Project...
=======
# React + Vite Portfolio Project Documentation
>>>>>>> b9ef2c1937ddab1db0108230409f26d9cc742447

## Project Overview
This project is a personal portfolio website built using **React** and **Vite**, designed for fast performance and efficient development. The portfolio showcases projects, skills, and other professional details. It includes features such as **Hot Module Replacement (HMR)** for seamless updates during development and **ESLint** for maintaining code quality.

## Features
- **Responsive Design**: Optimized for desktop and mobile devices.
- **React Components**: Modular and reusable components for maintainability.
- **Dark Mode Support**: Implemented using **ThemeContext** for theme toggling.
- **Contact Form**: Users can send messages via a functional contact form.
- **Project Showcase**: Displays projects dynamically with details.
- **Navigation Bar**: Includes links to different sections with smooth scrolling.

## Installation Instructions
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
To start the development server, run:
```bash
npm run dev
```
This will launch the application at `http://localhost:5173` (or another available port).

## Components
The project consists of the following key components:

- **AppLayout**: Manages the overall structure and layout.
- **About**: Displays information about the portfolio owner.
- **Contact**: Includes a form for users to get in touch.
- **Footer**: Contains links and social media handles.
- **Header**: The top navigation bar for easy access to sections.
- **Hero**: The landing section with a welcome message.
- **Loader**: A loading animation component.
- **MobileMenu**: A collapsible menu for mobile users.
- **NavBar**: The primary navigation bar.
- **Projects**: Displays a list of projects dynamically.
- **Skills**: Lists technical skills and tools.
- **ThemeToggle**: Handles dark/light mode toggling.

## Context and State Management
The project uses **React Context API** for managing global state, including:
- `ThemeContext`: Manages theme preferences (light/dark mode).

## Assets
The project includes various assets such as images, icons, and fonts, located in:
- `public/`: Static assets.
- `src/assets/`: Component-related assets.

## Deployment
The project can be deployed using **Vercel**, **Netlify**, or **GitHub Pages**. To build for production, run:
```bash
npm run build
```
This generates an optimized `dist/` folder ready for deployment.

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch for your feature.
3. Make changes and commit them.
4. Push to your branch and create a pull request.

## License
This project is licensed under the **MIT License**. See the LICENSE file for more details.

