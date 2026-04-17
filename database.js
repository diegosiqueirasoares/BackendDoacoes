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
            status TEXT DEFAULT(situacao IN ('critico', 'estavel', 'cheio')),
            agua TEXT NOT NULL,
            alimentos TEXT NOT NULL,
            roupas TEXT NOT NULL,
            higiene TEXT DEFAULT 
        )
    `)

    console.log('✅ Banco de dados configurado: Tabela de centro de doações criada!')

    // Verificar se já existem dados
    const checagem = await db.get(`SELECT COUNT(*) AS total FROM nome, endereco, status, agua, alimentos, roupa, higiene`)

    if (checagem.total === 0) {
        console.log('📝 Inserindo dados de centros de doacoes')
        await db.exec(`    
            INSERT INTO centro de doacoes
            (nome, endereco, status, agua, alimentos, roupas, higiene)
            VALUES
            ('ginasio municipal centro', 'rua das flores 123, 'critico', 'estavel', 'cheio', 'critico'),
            ('igreja santa maria', 'av principal 500', 'estavel', 'critico', 'estavel', 'estavel'),
        `)
        console.log('✅ 2 centros de doacoes localizados com sucesso!')
    } else {
        console.log('ℹ️ centros de doacoes já existem no banco de dados.')
    }

    // Consultas de exemplo
    console.log('\n📊 TOTAL DE DOACOES:')
    const totaldoacoes = await db.all(`SELECT * FROM centro de doacoes`)
    console.log(totaldoacoes)

    // Atualizar status
    await db.run(`
        UPDATE doacoes
        SET status = 'critico', 'estavel', 'cheio'
        WHERE funcao = 'agua', 'alimentos', 'roupas', 'higiene'
    `)
    console.log('\n🔄 Status do centro de doacoes atualizado para "critico', 'estavel', 'cheio')


    return db;
}

module.exports = { criarBanco }