const express = require('express');
const {criarBanco} = require('./database')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



// Rotas
app.get('/doacoes', async (req, res) => {
    const db = await criarBanco()
    const doacoes = await db.all('SELECT * FROM doacoes');
    res.json(doacoes);
});

app.post('/doacoes', async (req, res) => {
    const { nome, endereco, status, agua, alimentos, roupas, higiene } = req.body;
    const db = await criarBanco()
    await db.run('INSERT INTO doacoes (nome, endereco, status, agua, alimentos, roupas, higiene) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [nome, endereco, status, agua, alimentos, roupas, higiene]);
    res.status(201).send({ message: "Doação registrada!" });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.static('public')); // Se os arquivos estiverem na pasta 'public'