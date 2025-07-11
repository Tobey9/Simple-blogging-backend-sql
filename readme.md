# 📝 Personal Blogging Platform API

A simple RESTful API for a personal blogging platform built with **Node.js**, **Express**, and **MySQL** (using `mysql2` directly, without an ORM).

## roadmap.sh link: https://roadmap.sh/projects/blogging-platform-api

## 📌 Features

- Create, read, update, and delete blog posts
- Search posts by title, content, or category
- Input and store tags as an array
- Uses raw SQL queries (no ORM)
- JSON-based responses
- Built with clean, modular controller structure

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MySQL (accessed via `mysql2` library)
- **Environment Management**: dotenv

---

## 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/Tobey9/Simple-blogging-backend-sql.git
cd Simple-blogging-backend-sql
```

2. **Install dependencies**

```bash
npm install
```

3. Create a .env file

```bash
cp .env.example .env
```

_Then edit .env and update with your MySQL config_

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blog_platform
```

4. Start the server

```bash
npm run dev
```

## API ENDPOINTS

**Create Post**
POST `/posts`

```json
{
  "title": "My Blog Title",
  "content": "Blog content here...",
  "category": "Tech",
  "tags": ["Node.js", "API"]
}
```

- Returns: 201 Created + the new post

**Get all posts**
GET `/posts`
Optional Search `GET /posts?term=tech`

- Returns: 200 OK + array of posts

**Get single post**
GET `/posts/:id`

- Returns: 200 OK or 404 Not Found

**Update post**
PUT `/posts/:id`

```json
{
  "title": "Updated title",
  "content": "Updated content",
  "category": "Life",
  "tags": ["Updated", "Tags"]
}
```

- Returns: 200 OK + updated post
- Or 404 Not Found

**Delete post**
DELETE `/posts/:id`

- Returns: `204 No Content`
- Or `404 Not Found`

## Database schema

```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  tags JSON NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Folder structure

```bash
blogging-platform-node/
├── controllers/
│   └── postControllers.js
├── routes/
│   └── postRoutes.js
├── db.js
├── app.js
├── .env
├── package.json
└── README.md
```

## Testing

Use **Postman, Thunder Client** or any HTTP client to test the endpoint
Set `Content-Type: application/json` in your headers
