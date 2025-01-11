# MERN Stack Product Transactions Dashboard

## Overview

This project is a MERN stack-based application designed to fetch product transaction data from a third-party API, initialize a database with seed data, and provide various APIs to analyze and display this data in a dynamic and interactive dashboard. The dashboard allows users to view product transactions in a table, display statistical data, and generate visual charts such as bar and pie charts based on the transaction data.

## Features

### Backend:
- **Database Initialization API**: Fetches product transaction data from a third-party API and populates the database with seed data.
- **Transaction Listing API**: Fetches all transactions, supports pagination and search based on title, description, and price.
- **Statistics API**: Returns total sale amount, total number of sold items, and total number of unsold items for a selected month.
- **Bar Chart API**: Returns data for generating a bar chart based on price ranges for a selected month.
- **Pie Chart API**: Returns the number of items in each unique category for the selected month.
- **Combined Data API**: Fetches data from all the above APIs and returns a combined response.

### Frontend:
- **Transaction Table**: Displays a table with transaction data for the selected month, supporting search, pagination, and data sorting.
- **Statistics Display**: Shows the total sale amount, sold items, and unsold items for the selected month.
- **Bar Chart**: Displays a bar chart with price ranges and item counts for the selected month.
- **Pie Chart**: Displays a pie chart showing the number of items per category for the selected month.

## Technologies Used

- **Frontend**:
  - React.js
  - Axios (for API requests)
  - Chart.js (for charts)
  - Bootstrap (for styling)
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)
  - Mongoose (for MongoDB interactions)

## API Endpoints

### 1. **Initialize Database**
- **Method**: `GET`
- **URL**: `/api/initialize`
- **Description**: Fetches data from the third-party API and initializes the database with product transaction records.
- **Response Format**: JSON

### 2. **List All Transactions**
- **Method**: `GET`
- **URL**: `/api/transactions`
- **Query Parameters**:
  - `month`: (string) The selected month (e.g., January, February, etc.)
  - `page`: (integer) The page number for pagination.
  - `perPage`: (integer) The number of items per page for pagination.
  - `search`: (string) The search term to filter transactions by title, description, or price.
- **Response Format**: JSON

### 3. **Transaction Statistics**
- **Method**: `GET`
- **URL**: `/api/statistics`
- **Query Parameters**:
  - `month`: (string) The selected month (e.g., January, February, etc.)
- **Response Format**: JSON
- **Fields**:
  - `totalSaleAmount`: (number) Total sale amount for the selected month.
  - `totalSoldItems`: (integer) Total number of sold items for the selected month.
  - `totalNotSoldItems`: (integer) Total number of unsold items for the selected month.

### 4. **Bar Chart Data**
- **Method**: `GET`
- **URL**: `/api/bar-chart`
- **Query Parameters**:
  - `month`: (string) The selected month (e.g., January, February, etc.)
- **Response Format**: JSON
- **Fields**:
  - `priceRange`: (string) The price range of items (e.g., `0-100`, `101-200`, etc.).
  - `count`: (integer) The number of items in the respective price range.

### 5. **Pie Chart Data**
- **Method**: `GET`
- **URL**: `/api/pie-chart`
- **Query Parameters**:
  - `month`: (string) The selected month (e.g., January, February, etc.)
- **Response Format**: JSON
- **Fields**:
  - `category`: (string) The category name.
  - `count`: (integer) The number of items in the respective category.

### 6. **Combined Data**
- **Method**: `GET`
- **URL**: `/api/combined`
- **Query Parameters**:
  - `month`: (string) The selected month (e.g., January, February, etc.)
- **Response Format**: JSON
- **Description**: Combines data from the statistics, bar chart, and pie chart APIs and returns a single response.

## Setup and Installation

### Prerequisites
- Node.js and npm (Node Package Manager) installed.
- MongoDB running locally or via a cloud service (e.g., MongoDB Atlas).

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/mern-transactions-dashboard.git
   cd mern-transactions-dashboard
