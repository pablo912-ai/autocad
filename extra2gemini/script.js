/**
 * ARCHVIEW - Sistema de Visualização de Plantas
 * Lógica do Front-end (Vanilla JS)
 */

// 1. BANCO DE DADOS DE EXEMPLO (Array de Objetos)
// Substitua os caminhos de 'fileUrl' e 'thumbnail' pelos seus arquivos reais.
const projetos = [
    {
        id: 1,
        titulo: "Planta 1",
        descricao: "Layout detalhado do pavimento térreo com cotas e áreas técnicas.",
        tipo: "png",
        thumbnail: "scr/img/planta1.png",
        fileUrl: "scr/img/planta1.png"
    },
    {
        id: 2,
        titulo: "Planta 2",
        descricao: "Visualização vertical mostrando níveis de forro e fundações.",
        tipo: "png",
        thumbnail: "scr/img/planta2.png",
        fileUrl: "scr/img/planta2.png"
    },
    {
        id: 3,
        titulo: "Planta 3",
        descricao: "Representação das texturas e materiais aplicados na fachada principal.",
        tipo: "png",
        thumbnail: "scr/img/planta3.png",
        fileUrl: "scr/img/planta3.png"
    },
    {
        id: 4,
        titulo: "Planta 4",
        descricao: "Documentação técnica completa com detalhes construtivos.",
        tipo: "png",
        thumbnail: "scr/img/planta4.png",
        fileUrl: "scr/img/planta4.png"
    },
    {
        id: 5,
        titulo: "Planta 5",
        descricao: "Arquivo de projeto estrutural com elementos de fundação.",
        tipo: "png",
        thumbnail: "scr/img/planta5.png",
        fileUrl: "scr/img/planta5.png"
    },
    {
        id: 6,
        titulo: "Planta 6",
        descricao: "Projeto hidráulico com detalhes de tubulações.",
        tipo: "png",
        thumbnail: "scr/img/planta6.png",
        fileUrl: "scr/img/planta6.png"
    },
    {
        id: 7,
        titulo: "Planta 7",
        descricao: "Sistema elétrico com circuitos e pontos de energia.",
        tipo: "png",
        thumbnail: "scr/img/planta7.png",
        fileUrl: "scr/img/planta7.png"
    },
    {
        id: 8,
        titulo: "Planta 8",
        descricao: "Projeto de iluminação com distribuição de pontos.",
        tipo: "png",
        thumbnail: "scr/img/planta8.png",
        fileUrl: "scr/img/planta8.png"
    },
    {
        id: 9,
        titulo: "Planta 9",
        descricao: "Detalhes de acabamento e revestimentos.",
        tipo: "png",
        thumbnail: "scr/img/planta9.png",
        fileUrl: "scr/img/planta9.png"
    },
    {
        id: 10,
        titulo: "Planta 10",
        descricao: "Projeto de paisagismo e áreas externas.",
        tipo: "png",
        thumbnail: "scr/img/planta10.png",
        fileUrl: "scr/img/planta10.png"
    },
    {
        id: 11,
        titulo: "Planta 11",
        descricao: "Detalhes adicionais e especificações técnicas.",
        tipo: "jpeg",
        thumbnail: "scr/img/planta11.jpeg",
        fileUrl: "scr/img/planta11.jpeg"
    }
    
];

// 2. SELETORES DOM
const plansGrid = document.getElementById('plans-grid');
const modal = document.getElementById('viewer-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalDownloadBtn = document.getElementById('modal-download-btn');

// 3. FUNÇÃO PARA RENDERIZAR OS CARDS
function renderCards() {
    plansGrid.innerHTML = ''; // Limpa o grid

    projetos.forEach(projeto => {
        const card = document.createElement('article');
        card.className = 'plan-card';
        
        card.innerHTML = `
            <div class="card-thumb">
                <img src="${projeto.thumbnail}" alt="${projeto.titulo}" loading="lazy">
                <!-- 
                <span class="file-type-badge">${projeto.tipo}</span>
                -->
            </div>
            <div class="card-body">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <div class="card-actions">
                    <button class="btn btn-view" onclick="openViewer(${projeto.id})">Visualizar</button>
                    <a href="${projeto.fileUrl}" class="btn btn-download" download>Baixar</a>
                </div>
            </div>
        `;
        plansGrid.appendChild(card);
    });
}

// 4. LÓGICA DO VISUALIZADOR (MODAL)
function openViewer(id) {
    const projeto = projetos.find(p => p.id === id);
    if (!projeto) return;

    // Atualiza textos do modal
    modalTitle.innerText = projeto.titulo;
    modalDesc.innerText = projeto.descricao;
    modalDownloadBtn.href = projeto.fileUrl;

    // Limpa conteúdo anterior do modal
    modalContent.innerHTML = '';

    // Lógica por tipo de arquivo
    if (projeto.tipo === 'png' || projeto.tipo === 'jpg') {
        const img = document.createElement('img');
        img.src = projeto.fileUrl;
        img.alt = projeto.titulo;
        modalContent.appendChild(img);
    } 
    /* // LÓGICA PARA PDF
    else if (projeto.tipo === 'pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = projeto.fileUrl;
        modalContent.appendChild(iframe);
    } 
    */
    /* // LÓGICA PARA DWG (Como browsers não abrem DWG, mostramos um aviso)
    else if (projeto.tipo === 'dwg') {
        modalContent.innerHTML = `
            <div class="placeholder-viewer">
                <p>Visualização direta de arquivos DWG não é suportada no navegador.</p>
                <p>Por favor, utilize o botão abaixo para baixar e abrir no AutoCAD.</p>
            </div>
        `;
    } 
    */

    // Exibe o modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
}

// 5. FECHAR MODAL
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Libera o scroll
    
    // Limpa o conteúdo para economizar memória/parar vídeos ou iframes
    setTimeout(() => {
        modalContent.innerHTML = '';
    }, 300);
}

// 6. FUNÇÃO PARA BAIXAR IMAGENS
function downloadImage(id) {
    const projeto = projetos.find(p => p.id === id);
    if (!projeto) return;

    // Cria um elemento de download
    const link = document.createElement('a');
    link.href = projeto.fileUrl;
    link.download = `${projeto.titulo}.${projeto.tipo}`;
    
    // Dispara o download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Função para baixar todas as imagens de uma vez
function downloadAllImages() {
    projetos.forEach((projeto, index) => {
        // Adiciona um pequeno delay entre downloads para evitar bloqueio
        setTimeout(() => {
            downloadImage(projeto.id);
        }, index * 300);
    });
}

// 7. EVENT LISTENERS
closeModalBtn.addEventListener('click', closeModal);

// Fecha o modal ao clicar fora do container branco
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Suporte à tecla ESC para fechar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Inicializa a galeria ao carregar a página
document.addEventListener('DOMContentLoaded', renderCards);