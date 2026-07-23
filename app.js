/* ==========================================================================
   LARY AI — INTERACTIVE APPLICATION SCRIPT
   Handles multi-page navigation, card hover expansion, avatar expressions,
   and simulated local AI terminal interface.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPageRouting();
    initExpandCards();
    initMobileNav();
});

/* --------------------------------------------------------------------------
   1. MULTI-PAGE ROUTER (HOME / DETALHES TÉCNICOS / FUTURO)
   -------------------------------------------------------------------------- */
function switchPage(pageId) {
    // Hide all page sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Deactivate all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Activate targeted section
    const targetSection = document.getElementById(`page-${pageId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Activate targeted nav link
    const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.remove('mobile-open');
}

function initPageRouting() {
    // Ensure default page is loaded or handle URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'detalhes', 'futuro'].includes(hash)) {
        switchPage(hash);
    } else {
        switchPage('home');
    }
}

/* --------------------------------------------------------------------------
   2. EXPANDABLE CARDS (HOVER + TOUCH COMPATIBILITY)
   -------------------------------------------------------------------------- */
function initExpandCards() {
    const expandCards = document.querySelectorAll('.expand-card');
    
    expandCards.forEach(card => {
        // Click / Tap toggle for mobile & desktop
        card.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            
            const isCurrentlyExpanded = card.classList.contains('is-expanded');
            if (!isCurrentlyExpanded) {
                card.classList.add('is-expanded');
            } else {
                card.classList.remove('is-expanded');
            }
        });

        card.addEventListener('mouseenter', () => {
            card.classList.add('is-expanded');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-expanded');
        });
    });
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });
    }
}

/* --------------------------------------------------------------------------
   4. LARY AVATAR EXPRESSION SWITCHER
   -------------------------------------------------------------------------- */
const LARY_EXPRESSIONS = {
    neutra: {
        text: '"Tudo pronto para começar o trabalho."',
        quote: 'Visão Geral & Processamento Local'
    },
    falando: {
        text: '"Processando seu comando no terminal local do Windows..."',
        quote: 'Executando script Python 3.11...'
    },
    sorrindo: {
        text: '"Excelente escolha! Seu sistema está 100% otimizado."',
        quote: 'Privacidade mantida off-cloud.'
    },
    sarcástica: {
        text: '"Bora focar nesse projeto, gênio? 🙄"',
        quote: 'Inspirada em Momo Ayase (Dandadan)'
    },
    pensando: {
        text: '"Analisando os pixels da sua tela com OpenCV..."',
        quote: 'Percepção visual contextual ativa.'
    },
    irritada: {
        text: '"Mais um erro de sintaxe no seu código? Pelo amor de Deus!"',
        quote: 'Corrija na linha 42 do VS Code.'
    }
};

function changeExpression(expKey, customText = null) {
    const expObj = LARY_EXPRESSIONS[expKey];
    if (!expObj) return;

    const buttons = document.querySelectorAll('.exp-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-exp') === expKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const speechText = document.getElementById('speech-text');
    if (speechText) {
        speechText.innerText = customText || expObj.text;
    }

    const avatarImg = document.getElementById('hero-avatar-img');
    if (avatarImg) {
        avatarImg.style.transform = 'scale(1.04)';
        setTimeout(() => { avatarImg.style.transform = 'scale(1)'; }, 300);
    }
}

/* --------------------------------------------------------------------------
   4B. VISUAL SHOWCASE MODE SWITCHER (VTUBER MODE vs CHIBI MODE)
   -------------------------------------------------------------------------- */
function switchVisualMode(mode) {
    const btnVtuber = document.getElementById('btn-mode-vtuber');
    const btnChibi = document.getElementById('btn-mode-chibi');
    const img = document.getElementById('showcase-img');
    const specsTitle = document.getElementById('showcase-specs-title');
    const specsText = document.getElementById('showcase-specs-text');
    
    const c1Badge = document.getElementById('showcase-c1-badge');
    const c1Title = document.getElementById('showcase-c1-title');
    const c1Summary = document.getElementById('showcase-c1-summary');
    const c1Full = document.getElementById('showcase-c1-full');
    
    const c2Badge = document.getElementById('showcase-c2-badge');
    const c2Title = document.getElementById('showcase-c2-title');
    const c2Summary = document.getElementById('showcase-c2-summary');
    const c2Full = document.getElementById('showcase-c2-full');

    const grid = document.getElementById('showcase-content-grid');

    if (!grid) return;

    // Smooth transition
    grid.style.opacity = '0.3';
    grid.style.transform = 'scale(0.98)';
    grid.style.transition = 'all 0.25s ease';

    setTimeout(() => {
        if (mode === 'chibi') {
            if (btnVtuber) btnVtuber.classList.remove('active');
            if (btnChibi) btnChibi.classList.add('active');

            if (img) {
                img.src = 'assets/lary_chibi.webp';
                img.alt = 'Lary Chibi Mode';
            }

            if (specsTitle) specsTitle.innerText = 'Especificações do Modo Chibi (Uso Diário):';
            if (specsText) {
                specsText.innerHTML = `
                    • Avatar compacto e flutuante para uso diário na área de trabalho.<br>
                    • Monitoramento de hardware: CPU, GPU, RAM e status do sistema.<br>
                    • Widgets ativos: Clima em tempo real e notícias do setor tech.<br>
                    • Interação carismática com balões de fala: <em>"Tô aqui te observando! 👀"</em>
                `;
            }

            if (c1Badge) c1Badge.innerHTML = '<i class="ri-window-line"></i> Modo Widget';
            if (c1Title) c1Title.innerText = 'Modo Chibi (Barra de Tarefas)';
            if (c1Summary) c1Summary.innerText = 'Widget discreto e leve posicionado no canto do seu monitor como companheira diária do Windows.';
            if (c1Full) c1Full.innerText = 'O Modo Chibi consome o mínimo de recursos da máquina e permanece sempre visível durante o seu fluxo de trabalho, emitindo alertas inteligentes e lembretes de produtividade sem atrapalhar a sua tela.';

            if (c2Badge) c2Badge.innerHTML = '<i class="ri-dashboard-3-line"></i> Painel de Status';
            if (c2Title) c2Title.innerText = 'Status do Sistema & IA Companion';
            if (c2Summary) c2Summary.innerText = 'Monitoramento ativo de CPU, RAM, GPU, Clima e Notícias com reações divertidas.';
            if (c2Full) c2Full.innerText = 'Métricas integradas: CPU (32%), RAM (45%), GPU (28%), Clima (24°C Parcialmente nublado). A Lary reage com frases personalizadas e piadas sarcásticas conforme o seu ritmo de trabalho.';

        } else {
            if (btnChibi) btnChibi.classList.remove('active');
            if (btnVtuber) btnVtuber.classList.add('active');

            if (img) {
                img.src = 'assets/lary_reference_sheet.webp';
                img.alt = 'Lary Character Reference Sheet';
            }

            if (specsTitle) specsTitle.innerText = 'Especificações do Modelo VTube Studio:';
            if (specsText) {
                specsText.innerHTML = `
                    • Rigging completo para rastreamento de cabeça, corpo e cabelo.<br>
                    • Sincronização labial adaptativa (Lipsync com TTS).<br>
                    • Microexpressões: piscar, respirar, sobrancelhas e blushes dinâmicos.<br>
                    • Paleta de cores: Preto obsidian, Vermelho carmim e Brinco turquesa (#00f2fe).
                `;
            }

            if (c1Badge) c1Badge.innerHTML = '<i class="ri-tv-2-line"></i> Modo 1';
            if (c1Title) c1Title.innerText = 'Modo VTuber (Tela Cheia)';
            if (c1Summary) c1Summary.innerText = 'Modelo completo em tela ou overlay dedicado para lives, apresentações e interação imersiva de trabalho.';
            if (c1Full) c1Full.innerText = 'Neste modo, a Lary aparece em escala inteira (162 cm de referência), permitindo expressividade gestual máxima. Integração nativa com OBS Studio via VB-Cable para roteamento direto de voz e efeitos sonoros.';

            if (c2Badge) c2Badge.innerHTML = '<i class="ri-user-smile-line"></i> Modo 2';
            if (c2Title) c2Title.innerText = 'Visão do Modelo (Frente, Lado, Costas, 3/4)';
            if (c2Summary) c2Summary.innerText = 'Modelo tridimensional articulado com 8 expressões faciais dinâmicas para transmissões e streaming.';
            if (c2Full) c2Full.innerText = 'Expressões disponíveis: Neutra, Falando, Sorrindo, Sarcástica, Pensando, Surpresa, Rindo e Irritada. O modelo reage instantaneamente aos comandos de áudio e às interações do usuário.';
        }

        grid.style.opacity = '1';
        grid.style.transform = 'scale(1)';
    }, 250);
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE TERMINAL SIMULATOR MODAL (PRE-PROGRAMMED PROMPTS ONLY)
   -------------------------------------------------------------------------- */
function toggleDemoModal() {
    const modal = document.getElementById('demo-modal');
    if (modal) {
        modal.classList.toggle('active');
    }
}

function sendSimCommand(userText) {
    const logs = document.getElementById('terminal-logs');
    if (!logs || !userText) return;

    const timeStr = new Date().toLocaleTimeString();

    // Append User Log
    const userLog = document.createElement('div');
    userLog.className = 'log-line user';
    userLog.innerHTML = `<span class="log-time">[${timeStr}]</span> <strong>Você:</strong> "${userText}"`;
    logs.appendChild(userLog);

    logs.scrollTop = logs.scrollHeight;

    // Simulate Lary Processing & Response WITHOUT "Ação mapeada via NLU!"
    setTimeout(() => {
        let replyText = '';
        const lowerText = userText.toLowerCase();

        if (lowerText.includes('google') || lowerText.includes('navegador') || lowerText.includes('pesquisar')) {
            replyText = 'Abrindo o Google Chrome no Windows e preparando a barra de navegação...';
        } else if (lowerText.includes('limitação') || lowerText.includes('requisito')) {
            replyText = 'Minha principal limitação atual é necessitar de hardware com GPU/RAM compatível para rodar os LLMs locais do Ollama e foco prioritário no sistema Windows.';
        } else if (lowerText.includes('voz') || lowerText.includes('audio')) {
            replyText = 'Utilizo WebSockets duplex para baixa latência e integração com VB-Cable para roteamento de áudio com OBS Studio e Discord.';
        } else {
            replyText = `Comando '${userText}' executado localmente via Python 3.11 com sucesso.`;
        }

        const laryLog = document.createElement('div');
        laryLog.className = 'log-line lary';
        laryLog.innerHTML = `<span class="log-time">[${new Date().toLocaleTimeString()}]</span> <strong>Lary:</strong> "${replyText}"`;
        logs.appendChild(laryLog);

        logs.scrollTop = logs.scrollHeight;
    }, 500);
}
