# URL Shortener API

Link : https://url-shortener-assignment-production.up.railway.app/api/v1/



https://github.com/user-attachments/assets/57b9bea0-3d55-4eeb-becd-15ad94787ba5



A simple URL shortener service that allows users to shorten long URLs and retrieve their original URLs, along with viewing statistics such as the number of clicks and last accessed time.

## API Endpoints

### 1. Shorten URL
**Endpoint**: `https://url-shortener-assignment-production.up.railway.app/api/v1/shorten`  
**Method**: `POST`  
**Description**: This endpoint accepts a long URL as input and generates a shortened URL. The shortened URL can later be used to redirect to the original URL.

#### Request Body:
- `originalUrl`: The original URL that needs to be shortened.

### Response

#### Success (201)

```json
{
  "shortUrl": "https://url-shortener-assignment-production.up.railway.app/api/v1//shortenedID"
}
```

#### Error (400):

```json
{
  "error": "Invalid URL"
}
```

### 2. Redirect to Original URL
**Endpoint**: `https://url-shortener-assignment-production.up.railway.app/api/v1/{shortId}`  
**Method**: `GET`  
**Description**: This endpoint takes the `shortId` (generated short URL ID) and redirects the user to the original URL associated with it.

#### URL Parameters:
- `shortId`: The unique identifier for the shortened URL.

#### Success (302)

Redirects to the original URL

#### Error (404):

```json
{
  "error": "Short URL not found"
}
```

### 3. URL Stats
**Endpoint**: `https://url-shortener-assignment-production.up.railway.app/api/v1/stats/{shortId}`  
**Method**: `GET`  
**Description**: This endpoint retrieves statistics for a specific shortened URL. The statistics include the number of clicks and the last accessed time.

#### URL Parameters:
- `shortId`: The unique identifier for the shortened URL.

#### Success (201)

```json
{
  "clicks": 5,
  "lastAccessed": "2024-11-26T14:00:00Z"
}
```

#### Error (404):

```json
{
  "error": "Short URL not found"
}

```

### 4. Swagger API Page
**Endpoint**: `https://url-shortener-assignment-production.up.railway.app/api-docs`  
**Method**: `GET`  
**Description**: This endpoint retrieves the Swagger API page.

## Setup & Deployment Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or MongoDB Atlas)
- Prisma ORM

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/oohsai/URL-Shortener-assignment
   cd url-shortener

2. Install dependencies:
    ```bash
   npm install

3. Set up your environment variables:
    Create a .env file in the root directory.
    Add the following variables:
    ```bash
    DATABASE_URL="mongodb://localhost:27017/url_shortener"
    PORT=4000


4. Run Prisma migration to set up the database schema:
    ```bash
    npx prisma migrate dev
    Start the server:

5. Start the server
    ```bash
    npm start

The API will be available at https://url-shortener-assignment-production.up.railway.app/api/v1/.

### Development

## Run Development Server

To run the development server with hot reloading:

    npm run start

## License
This project is licensed under the MIT License - see the LICENSE file for details.
