# Wolfstream Backend

This is the backend for **Wolfstream**, a personal social network designed to manage posts, comments, likes, and authentication. This project is part of my portfolio to showcase my web development skills.

---

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Turso SQL**: Database used for data persistence.
- **Socket.io**: Used for real-time functionality for posts, comments, and likes.

---

## Local Installation and Execution

Follow these steps to get the project running in your local development environment:

1.  **Clone the repository**:

    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd wolfstream-backend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Configure environment variables**:

    This project uses sensitive environment variables (such as database credentials and secret keys). You'll need to create a `.env` file in the project root and configure them appropriately.

    _Joee: You should list the specific environment variables your project requires here (e.g., `DATABASE_URL`, `JWT_SECRET`, etc.), without their values. This is crucial for others to know what to set up._

4.  **Start the server in development mode**:

    ```bash
    npm run dev
    ```

    The server will be available at `http://localhost:3000`.

---

## Production Execution

For optimized execution in a server environment:

1.  Make sure you've installed dependencies (`npm install`).
2.  Configure your production environment variables.
3.  Start the server:

    ```bash
    npm run start
    ```

---

## Deployment

The project includes a **Dockerfile** with the necessary instructions to build and deploy the application in a Docker container. Refer to the Dockerfile for more details on the build and execution process in a containerized environment.

---

## Key Endpoints

The Wolfstream backend manages the following core functionalities:

- **User Authentication**: Registration, login, and session management.
- **Posts**: Creation, viewing, editing, and deletion of posts.
- **Comments**: Creation, viewing, and management of comments on posts.
- **Likes**: Functionality to "like" posts and comments.
- **Real-time Features**: Posts, comments, and likes update in real-time thanks to Socket.io.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
