# 🍗 Nas's Fried Chicken (NFC) - Backend API

## Project Description
This is the backend server and RESTful API for Nas's Fried Chicken, a fullstack food ordering system. It connects the frontend user interface to a persistent PostgreSQL database, handling menu retrieval, dynamic searching, filtering, and order processing.

## Features Implemented
* **RESTful API Endpoints:** Handles GET and POST requests for menu items and orders.
* **Database Integration:** Fully connected to a persistent PostgreSQL database hosted on Neon.
* **Advanced Feature - Search:** Handles query parameters to search for specific menu items.
* **Advanced Feature - Filtering:** Handles query parameters to filter menu items by category (Spicy, Original, Sides).
* **Error Handling:** Includes data validation and returns appropriate HTTP status codes (e.g., 201 for creation, 400 for bad requests, 500 for server errors).

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL (Hosted via Neon)
* **Deployment:** Render

## API Endpoint Summary
| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/menu` | Fetches all menu items. | `?search=[string]` & `?category=[string]` |
| `POST`| `/api/orders`| Submits a new customer order. | None (Requires JSON body: `customer_name`, `total_price`) |

## Setup Instructions & Running Locally
1. Clone this repository to your local machine.
2. Open your terminal and navigate to the project directory.
3. Run `npm install` to install all required dependencies (Express, CORS, pg).
4. Create a PostgreSQL database and update the connection details in `server.js`.
5. Run `npm start` to launch the server.
6. The server will run locally at `http://localhost:3000`.

## Deployed Project
* **Live API Base URL:** [INSERT_YOUR_RENDER_URL_HERE]