const API_URL = 'http://localhost:3001/doacoes';

// Função para buscar dados da sua API
async function buscarCentros() {
    try {
        const response = await fetch(API_URL);
        const centros = await response.json();
        renderizarCentros(centros);
    } catch (error) {
        console.error("Erro ao carregar centros:", error);
    }
}

// Função para criar o HTML dos cards
function renderizarCentros(centros) {
    const container = document.getElementById('centros-container');
    container.innerHTML = '';

    centros.forEach(centro => {
        const card = document.createElement('div');
        card.className = `card border-${centro.status}`;
        
        card.innerHTML = `
            <h3>${centro.nome}</h3>
            <p>📍 ${centro.endereco}</p>
            <div>
                <span class="badge bg-${centro.agua}">Água</span>
                <span class="badge bg-${centro.alimentos}">Alimentos</span>
                <span class="badge bg-${centro.roupas}">Roupas</span>
                <span class="badge bg-${centro.higiene}">Higiene</span>
            </div>
            <p><strong>Status Geral:</strong> ${centro.status.toUpperCase()}</p>
        `;
        container.appendChild(card);
    });
}

// Lógica de envio do formulário
document.getElementById('doacao-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoCentro = {
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        status: document.getElementById('status').value,
        agua: document.getElementById('agua').value,
        alimentos: document.getElementById('alimentos').value,
        roupas: 'estavel', // Valores padrão simplificados
        higiene: 'estavel'
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoCentro)
        });
        
        e.target.reset(); // Limpa o formulário
        buscarCentros();  // Atualiza a lista
    } catch (error) {
        alert("Erro ao salvar doação.");
    }
});

// Iniciar busca ao carregar a página
buscarCentros();