# React + Vite Project Documentation

## Project Overview
This project is a React application built using Vite, designed to provide a fast and efficient development experience. It includes features such as Hot Module Replacement (HMR) for seamless updates during development and ESLint for code quality.

## Installation Instructions
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage
To run the project locally, use the following command:
```bash
npm run dev
```
This will start the development server, and you can access the application at `http://localhost:3000`.

## Components
The project consists of several components, including:

- **AppLayout**: The main layout component for the application.
- **Contact**: A component for the contact page.
- **ForgotPassword**: A component for the password recovery page.
- **Loader**: A loading spinner component.
- **MobileMenu**: A responsive menu for mobile devices.
- **NavBar**: The navigation bar component.
- **Projects**: Displays a list of projects.
- **SignIn**: The sign-in form component.
- **SignUp**: The sign-up form component.
- **Welcome**: A welcome message component.

## Context and State Management
The project uses React Context for state management, allowing for global state access across components. The `ThemeContext` is used to manage theme-related state.

## Assets
The project includes various assets such as images and icons located in the `public` and `src/assets` directories.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your branch and create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
