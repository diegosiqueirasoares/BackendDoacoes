const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let db;

(async () => {
    db = await open({
        filename: './src/database/database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS centros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            endereco TEXT,
            necessita_alimentos BOOLEAN,
            necessita_roupas BOOLEAN,
            necessita_agua BOOLEAN
        );

        CREATE TABLE IF NOT EXISTS doacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item TEXT,
            quantidade INTEGER,
            centro_id INTEGER,
            FOREIGN KEY (centro_id) REFERENCES centros(id)
        );
    `);
})();

// Rotas
app.get('/centros', async (req, res) => {
    const centros = await db.all('SELECT * FROM centros');
    res.json(centros);
});

app.post('/doacoes', async (req, res) => {
    const { item, quantidade, centro_id } = req.body;
    await db.run('INSERT INTO doacoes (item, quantidade, centro_id) VALUES (?, ?, ?)', 
        [item, quantidade, centro_id]);
    res.status(201).send({ message: "Doação registrada!" });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});