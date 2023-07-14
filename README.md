#

ValueMesh is a web application that allows users to manage their connections. It provides features such as filtering connections based on industry, sorting connections, and adding new connections.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

ValueMesh is built using React and connects to a backend API for managing connections. It utilizes the Supabase authentication and authorization library for user authentication. The application allows users to view, filter, and sort their connections based on different criteria.

## Installation

To run the ValueMesh locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the backend API:

   - Make sure you have the necessary MongoDB instance running.
   - Update the MongoDB connection details in the `utils/mongoDB.js` file.

5. Start the development server:

   ```bash
   npm start
   ```

6. Open your web browser and access the application at `http://localhost:3000`.

## Usage

Once the ValueMesh is running, you can perform the following actions:

- View your connections: The dashboard displays a list of connections retrieved from the backend API.
- Filter connections: Use the filter buttons to display connections based on industry categories, such as "Investor," "Accelerator," "Professor," "Internship?," or "Others."
- Sort connections: Select a sort option from the dropdown menu to sort connections in increasing or decreasing order.
- Add new connections: Click on the "Add Connection" button to open a modal form where you can enter details for a new connection.
- Sign out: Click on the "Sign Out" button to log out from the application.

## Contributing

Contributions to the ValueMesh project are welcome! If you have any ideas, bug fixes, or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request explaining your changes.

Please ensure that your code follows the project's coding conventions and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions regarding the ValueMesh project, you can contact the project creator:

- GitHub: [ryantzr](https://github.com/ryantzr)

Feel free to reach out with any feedback or inquiries.
