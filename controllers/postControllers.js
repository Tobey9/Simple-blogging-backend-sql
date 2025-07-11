const db = require("../db");

function parseTags(str) {
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
}

module.exports.createPost = async (req, res) => {
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql =
    "INSERT INTO posts (title, content, category, tags) VALUES (?, ?, ?, ?)";
  const [result] = await db.execute(sql, [
    title,
    content,
    category,
    JSON.stringify(tags || []),
  ]);

  const [rows] = await db.execute("SELECT * FROM posts WHERE id = ?", [
    result.insertId,
  ]);
  rows[0].tags = parseTags(rows[0].tags);
  res.status(201).json(rows[0]);
};

module.exports.getAllPosts = async (req, res) => {
  const term = req.query.term;
  let sql = "SELECT * FROM posts";
  let params = [];

  if (term) {
    sql += "WHERE title LIKE ? OR content LIKE ? OR category LIKE ?";
    params = [`%${term}%`, `%${term}%`, `%${term}%`];
  }

  const [rows] = await db.execute(sql, params);
  rows.forEach((post) => (post.tags = parseTags(post.tags)));
  res.status(200).json(rows);
};

module.exports.getPostById = async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM posts WHERE id = ?", [
    req.params.id,
  ]);
  if (!rows.length) return res.status(404).json({ message: "Post not found" });
  rows[0].tags = parseTags(rows[0].tags);
  res.status(200).json(rows[0]);
};

module.exports.updatePost = async (req, res) => {
  const { title, content, category, tags } = req.body;
  const sql = `UPDATE posts SET title = ?, content = ?, category = ?, tags = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;

  const [result] = await db.execute(sql, [
    title,
    content,
    category,
    JSON.stringify(tags || []),
    req.params.id,
  ]);

  if (result.affectedRows === 0)
    return res.status(404).json({ message: "Post not found" });

  const [rows] = await db.execute("SELECT * FROM posts WHERE id = ?", [
    req.params.id,
  ]);
  rows[0].tags = JSON.parse(rows[0].tags || "[]");

  res.status(200).json(rows[0]);
};

module.exports.deletePost = async (req, res) => {
  const [result] = await db.execute("DELETE FROM posts WHERE id = ?", [
    req.params.id,
  ]);
  if (result.affectedRows === 0)
    return res.status(400).json({ message: "Post not found" });
  res.status(204).send();
};
