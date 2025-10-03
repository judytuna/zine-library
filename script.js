// Zine data structure
const zines = [
    {
        id: 'the-anchor',
        title: 'The Anchor',
        type: 'multi-page',
        pages: 8,
        coverImage: 'public/images/zines/the-anchor/page-01.jpg'
    },
    {
        id: 'always-left-behind',
        title: 'Always Left Behind',
        type: 'multi-page',
        pages: 5,
        coverImage: 'public/images/zines/always-left-behind/page-01.jpg'
    },
    {
        id: 'free-nelson-mandela',
        title: 'Free Nelson Mandela',
        type: 'series',
        pages: 2,
        coverImage: 'public/images/zines/free-nelson-mandela/first-listen.jpg'
    },
    {
        id: 'forever',
        title: 'Forever',
        type: 'single-page',
        pages: 1,
        coverImage: 'public/images/zines/forever/fullpage.jpg'
    },
    {
        id: 'kiss-me-son-of-god',
        title: 'Kiss Me Son of God',
        type: 'single-page',
        pages: 1,
        coverImage: 'public/images/zines/kiss-me-son-of-god/fullpage.jpg'
    },
    {
        id: 'planet-killer',
        title: 'Planet Killer',
        type: 'single-page',
        pages: 1,
        coverImage: 'public/images/zines/planet-killer/fullpage.jpg'
    },
    {
        id: 'yummy-treat',
        title: 'Yummy Treat',
        type: 'single-page',
        pages: 1,
        coverImage: 'public/images/zines/yummy-treat/fullpage.jpg'
    },
    {
        id: 'rays-of-light',
        title: 'Rays of Light',
        type: 'single-page',
        pages: 1,
        coverImage: 'public/images/zines/rays-of-light/fullpage.jpeg'
    },
    {
        id: 'fritz-and-yi',
        title: 'Fritz and Yi',
        type: 'single-page',
        pages: 1,
        coverImage: 'public/images/zines/fritz-and-yi/fullpage.jpg'
    },
    {
        id: 'love-is-glowing',
        title: 'Love is Glowing',
        type: 'single-page',
        pages: 1,
        coverImage: 'public/images/zines/love-is-glowing/fullpage.jpg'
    }
];

// Current state
let currentZine = null;
let currentPage = 1;

// DOM elements
const gridView = document.getElementById('grid-view');
const zineViewer = document.getElementById('zine-viewer');
const zineTitle = document.getElementById('zine-title');
const zineImage = document.getElementById('zine-image');
const pageCounter = document.getElementById('page-counter');
const backToGridBtn = document.getElementById('back-to-grid');
const navLeft = document.getElementById('nav-left');
const navRight = document.getElementById('nav-right');

// Initialize the app
function init() {
    renderGrid();
    setupEventListeners();
}

// Render grid view of all zines
function renderGrid() {
    gridView.innerHTML = '';

    zines.forEach(zine => {
        const zineCard = document.createElement('div');
        zineCard.className = 'zine-card';
        zineCard.innerHTML = `
            <img src="${zine.coverImage}" alt="${zine.title}" class="zine-cover">
            <h3 class="zine-title">${zine.title}</h3>
            <p class="zine-info">${zine.pages} ${zine.pages === 1 ? 'page' : 'pages'}</p>
        `;

        zineCard.addEventListener('click', () => openZine(zine));
        gridView.appendChild(zineCard);
    });
}

// Open a specific zine
function openZine(zine) {
    currentZine = zine;
    currentPage = 1;

    zineTitle.textContent = zine.title;
    updateZineViewer();

    // Show zine viewer, hide grid
    gridView.classList.add('hidden');
    zineViewer.classList.remove('hidden');
}

// Update the zine viewer with current page
function updateZineViewer() {
    if (!currentZine) return;

    const imagePath = getImagePath(currentZine, currentPage);
    zineImage.src = imagePath;

    // Update page counter
    if (currentZine.pages > 1) {
        pageCounter.textContent = `Page ${currentPage} of ${currentZine.pages}`;
    } else {
        pageCounter.textContent = '';
    }
}

// Get the correct image path for a zine and page
function getImagePath(zine, page) {
    const basePath = `public/images/zines/${zine.id}`;

    if (zine.type === 'single-page') {
        return `${basePath}/fullpage.${zine.id === 'rays-of-light' ? 'jpeg' : 'jpg'}`;
    } else if (zine.type === 'series') {
        const files = ['first-listen.jpg', 're-listen.jpg'];
        return `${basePath}/${files[page - 1]}`;
    } else {
        // multi-page
        const pageNum = page.toString().padStart(2, '0');
        const extension = (zine.id === 'the-anchor' && page === 7) ? 'png' : 'jpg';
        return `${basePath}/page-${pageNum}.${extension}`;
    }
}

// Navigate to previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updateZineViewer();
    }
}

// Navigate to next page
function nextPage() {
    if (currentPage < currentZine.pages) {
        currentPage++;
        updateZineViewer();
    }
}

// Go back to grid view
function backToGrid() {
    currentZine = null;
    currentPage = 1;

    // Hide zine viewer, show grid
    zineViewer.classList.add('hidden');
    gridView.classList.remove('hidden');
}

// Set up event listeners
function setupEventListeners() {
    backToGridBtn.addEventListener('click', backToGrid);
    navLeft.addEventListener('click', previousPage);
    navRight.addEventListener('click', nextPage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (currentZine) {
            if (e.key === 'ArrowLeft') {
                previousPage();
            } else if (e.key === 'ArrowRight') {
                nextPage();
            } else if (e.key === 'Escape') {
                backToGrid();
            }
        }
    });
}

// Start the app
init();