# Doações

## 1. Apresentação da Ideia
Este projeto foi desenvolvido com base no desafio de enchentes no Brasil. Ao analisar o cenário, foi identificado que a falta de visibilidade sobre o estoque dos pontos de coleta causa desperdício e escassez simultânea. Esta solução centraliza o status de necessidade de cada local em tempo real.

## 2. Problema Escolhido
O problema focado foi a **má distribuição de suprimentos**. 
- **Dificuldade:** Doadores entregam itens em locais saturados, enquanto outros centros ficam desabastecidos.
- **Impactados:** Desabrigados que não recebem itens básicos e voluntários sobrecarregados com triagem de itens desnecessários.
- **Relevância:** Em desastres, logística eficiente salva vidas.

## 3. Solução Proposta
Uma plataforma onde administradores de abrigos atualizam o nível de urgência de categorias (Água, Alimentos, Roupas, Higiene).
- **Diferencial:** Indicador visual de prioridade (Vermelho: Crítico, Amarelo: Estável, Verde: Cheio), permitindo que o doador escolha o destino antes de sair de casa.

## 4. Estrutura do Sistema
- **Backend:** Node.js com Express simulando uma API REST.
- **Banco de Dados:** Arquivo JSON para persistência simples e rápida, armazenando locais, endereços e níveis de estoque.
- **Frontend:** HTML, SCSS