const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const criarBanco = async () => {

    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS doacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            endereco TEXT NOT NULL,
            status TEXT NOT NULL,
            agua TEXT NOT NULL,
            alimentos TEXT NOT NULL,
            roupas TEXT NOT NULL,
            higiene TEXT NOT NULL
        )
    `)

    console.log('✅ Banco de dados configurado: Tabela de centro de doações criada!')

    // Verificar se já existem dados
const checagem = await db.get(`SELECT COUNT(*) AS total FROM doacoes`)

    if (checagem.total === 0) {
        console.log('📝 Inserindo dados de centros de doacoes')
        await db.exec(`    
            INSERT INTO doacoes
            (nome, endereco, status, agua, alimentos, roupas, higiene)
            VALUES
            ('ginasio municipal centro', 'rua das flores 123', 'critico', 'estavel', 'cheio', 'critico', 'cheio'),
            ('igreja santa maria', 'av principal 500', 'estavel', 'critico', 'estavel', 'estavel', 'cheio')
        `)
        console.log('✅ 2 centros de doacoes localizados com sucesso!')
    } else {
        console.log('ℹ️ centros de doacoes já existem no banco de dados.')
    }

    // Consultas de exemplo
    console.log('\n📊 TOTAL DE DOACOES:')
    const totaldoacoes = await db.all(`SELECT * FROM doacoes`)
    console.log(totaldoacoes)


    return db;
}

module.exports = { criarBanco }

