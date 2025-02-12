# Live Code Collaboration Tool

A real-time code collaboration platform built using **MERN (MongoDB, Express, React, Node.js)** and **Socket.io**, allowing users to create/join rooms, write and execute code, and share results in real-time.

## Features

- **Create or Join Rooms**: Users can create private rooms or join existing ones.
- **Real-Time Code Editing**: Changes made by any user are reflected instantly for all connected users.
- **Live Code Execution**: Run code and share results in real-time.
- **Multi-Language Support**: Execute code in multiple programming languages via Judge0 API.
- **Collaborative Environment**: Supports multiple users working together simultaneously.

## Tech Stack

- **Frontend**: React, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Real-Time Communication**: WebSockets (Socket.io)
- **Code Execution**: Judge0 API

## Installation

### Prerequisites

- Node.js & npm installed

### Steps to Run Locally

1. **Clone the Repository**

   ```sh
   git clone https://ankitray-03/CodeCollab.git
   cd CodeCollab
   ```

2. **Install Dependencies**

   - Backend
     ```sh
     npm install
     ```
   - Frontend
     ```sh
     cd client
     npm install
     ```

3. **Setup Environment Variables**

   - Create a `.env` file in the `server` directory and add:
     ```env
     PORT=5000
     API_KEY=your_third_party_api_key
     ```

4. **Run the Server**

   ```sh
   npm run dev
   ```

5. **Run the Client**

   ```sh
   cd client
   npm run dev
   ```

6. **Access the App**
   Open `http://localhost:5173` in your browser.

## Contributing

Feel free to submit pull requests, create issues, or suggest features!

## License

MIT License

## Developer

Ankit Kumar Ray
ankitray0308@gmail.com
