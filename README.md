# Meeting Notes App

Meeting Notes App is a note-taking application that allows users to view, edit, and manage meeting notes, including adding action items, marking them complete, and adding or deleting actions.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Navigate to the frontend directory and install frontend dependencies:
    ```bash
        cd meeting-notes-app
        npm install

3. Navigate to the backend directory and install backend dependencies:
    ```bash
        cd meeting-notes-service
        npm install

4. Setup environment variables: 
   Create a `.env` file in the `meeting-notes-service` directory and add the following environment variables, replacing `<your_credentials>` with your MongoDB credentials:

   ```plaintext
   PORT=3000
   MONGO_CONNECTION=<your_credentials>


## Usage
1. To start the frontend application locally, follow these steps:

    ```bash 
        cd meeting-notes-app
        npm run dev
2. To start the backend application locally, follow these steps:
    ```bash 
        cd meeting-notes-service
        node server.js

## Contributing
Contributions are welcome! If you would like to contribute to the project, please follow these steps:

* Fork the repository
* Create your feature branch (git checkout -b feature/YourFeature)
* Commit your changes (git commit -am 'Add some feature')
* Push to the branch (git push origin feature/YourFeature)
* Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Make sure to replace `<repository_url>` with the URL of your Git repository. This single file contains all the sections from the previous example, providing instructions for installation, usage, contributing, and licensing of the project.