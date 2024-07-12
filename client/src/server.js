const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'employability_survey',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.post('/submit-survey', (req, res) => {
  const { name, email, employmentStatus, jobRelevance, skillsUtilized, satisfaction } = req.body;
  const sql = 'INSERT INTO surveys (name, email, employmentStatus, jobRelevance, skillsUtilized, satisfaction) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [name, email, employmentStatus, jobRelevance, skillsUtilized, satisfaction], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Survey submitted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
