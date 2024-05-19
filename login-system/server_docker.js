const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files

// Database setup
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'sriram',
  password: process.env.DB_PASSWORD || 'Sriram#2225',
  database: process.env.DB_NAME || 'login_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Register endpoint
app.post('/register', (req, res) => {
  const { name, username, password, email } = req.body;

  // Check if username already exists
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkQuery, [username], (err, results) => {
    if (err) {
      console.error('Error checking username:', err.message);
      return res.status(500).send('Server error');
    }
    if (results.length > 0) {
      return res.status(400).send('Username already taken');
    } else {
      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert user into the database
      const query = 'INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?)';
      db.query(query, [name, username, hashedPassword, email], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err.message);
          return res.status(500).send('Server error');
        }
        res.send('User registered successfully!');
      });
    }
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err.message);
      return res.status(500).send('Server error');
    }
    if (results.length > 0) {
      // Compare passwords
      const user = results[0];
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  });
});

// Reset password endpoint
app.post('/reset_password', (req, res) => {
  const { username, newPassword } = req.body;

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  // Update the user's password in the database
  const query = 'UPDATE users SET password = ? WHERE username = ?';
  db.query(query, [hashedPassword, username], (err, result) => {
    if (err) {
      console.error('Error updating password:', err.message);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows > 0) {
      res.send('Password reset successful!');
    } else {
      res.status(404).send('User not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
