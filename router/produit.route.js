const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_produits'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL :', err);
  } else {
    console.log('Connexion réussie à la base de données MySQL');
  }
});

// Middleware pour traiter les données JSON
app.use(bodyParser.json());

// Routes
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des produits depuis MySQL.' });
    } else {
      res.json(results);
    }
  });
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Nom et prix du produit requis.' });
  }

  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
  const values = [name, price];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de l\'ajout du produit dans MySQL.' });
    } else {
      res.status(201).json({ id: result.insertId, name, price });
    }
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
