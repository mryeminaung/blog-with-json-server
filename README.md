# Lightweight Blogging Application with JSON Server

A simple, lightweight blogging application that uses **JSON Server** as a mock REST API backend. This project is designed to demonstrate how to interact with a RESTful service to perform CRUD operations (Create, Read, Update, Delete) without the need for a complex database setup.

## Features

- **Full CRUD Support**: Create new posts, read existing ones, update content, and delete entries.
- **Mock Backend**: Uses `json-server` to simulate a real-world API environment.
- **Persistent Storage**: All changes are automatically saved to a local `db.json` file.
- **Easy Setup**: Get up and running in minutes.

## Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mryeminaung/blog-with-json-server.git
    cd blog-with-json-server
    ```

2.  **Install the dependencies:**
    _(Assuming you have Node.js installed)_

    ```bash
    npm install
    ```

3.  **Start the JSON Server:**
    This command starts the mock API on port 8000:

    ```bash
    npm run serve-json
    ```

4.  **Launch the App:**
    This command runs the App on port 3000:
    ```bash
    npm run dev
    ```
    Open `localhost:3000` in your favorite browser
