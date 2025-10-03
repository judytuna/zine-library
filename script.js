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
        type: 'folded-zine',
        pages: 5,
        coverImage: 'public/images/zines/forever/fullpage.jpg'
    },
    {
        id: 'kiss-me-son-of-god',
        title: 'Kiss Me Son of God',
        type: 'folded-zine',
        pages: 5,
        coverImage: 'public/images/zines/kiss-me-son-of-god/fullpage.jpg'
    },
    {
        id: 'planet-killer',
        title: 'Planet Killer',
        type: 'folded-zine',
        pages: 5,
        coverImage: 'public/images/zines/planet-killer/fullpage.jpg'
    },
    {
        id: 'yummy-treat',
        title: 'Yummy Treat',
        type: 'folded-zine',
        pages: 5,
        coverImage: 'public/images/zines/yummy-treat/fullpage.jpg'
    },
    {
        id: 'rays-of-light',
        title: 'Rays of Light',
        type: 'folded-zine',
        pages: 5,
        coverImage: 'public/images/zines/rays-of-light/fullpage.jpeg'
    },
    {
        id: 'fritz-and-yi',
        title: 'Fritz and Yi',
        type: 'folded-zine',
        pages: 5,
        coverImage: 'public/images/zines/fritz-and-yi/fullpage.jpg'
    },
    {
        id: 'love-is-glowing',
        title: 'Love is Glowing',
        type: 'folded-zine',
        pages: 5,
        coverImage: 'public/images/zines/love-is-glowing/fullpage.jpg'
    }
];

// Crop configuration for Forever
const forever_crops = {
  "1": {
    "x": 50,
    "y": 0,
    "w": 25,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "59.3% 33.3%"
  },
  "2": {
    "x": 0,
    "y": 0,
    "w": 50,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "33.3% 33.3%"
  },
  "3": {
    "x": 0,
    "y": 50,
    "w": 50,
    "h": 50,
    "rotation": 0,
    "transformOrigin": "0% 100%"
  },
  "4": {
    "x": 50,
    "y": 50,
    "w": 50,
    "h": 50,
    "rotation": 0,
    "transformOrigin": "100% 100%"
  },
  "5": {
    "x": 75,
    "y": 0,
    "w": 25,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "76.3% 33.3%"
  }
};

// Crop configuration for Kiss Me Son of God
const kiss_me_son_of_god_crops = {
  "1": {
    "x": 0,
    "y": 0,
    "w": 25,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "26.3% 33.3%"
  },
  "2": {
    "x": 0,
    "y": 50,
    "w": 50,
    "h": 50,
    "rotation": 0,
    "transformOrigin": "0% 100%"
  },
  "3": {
    "x": 50,
    "y": 50,
    "w": 50,
    "h": 50,
    "rotation": 0,
    "transformOrigin": "100% 100%"
  },
  "4": {
    "x": 50,
    "y": 0,
    "w": 50,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "66.6% 33.3%"
  },
  "5": {
    "x": 25,
    "y": 0,
    "w": 25,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "43% 33.3%"
  }
};

// Crop configuration for Planet Killer
const planet_killer_crops = {
  "1": {
    "x": 75,
    "y": 50,
    "w": 25,
    "h": 50,
    "rotation": 90,
    "transformOrigin": "90% 50%"
  },
  "2": {
    "x": 50,
    "y": 0,
    "w": 50,
    "h": 50,
    "rotation": 270,
    "transformOrigin": "83% 44%"
  },
  "3": {
    "x": 0,
    "y": 0,
    "w": 50,
    "h": 50,
    "rotation": 270,
    "transformOrigin": "43% 18%"
  },
  "4": {
    "x": 0,
    "y": 50,
    "w": 50,
    "h": 50,
    "rotation": 90,
    "transformOrigin": "33.3% 86.3%"
  },
  "5": {
    "x": 50,
    "y": 50,
    "w": 25,
    "h": 50,
    "rotation": 270,
    "transformOrigin": "53.5% 73%"
  }
};

// Crop configuration for Yummy Treat
const yummy_treat_crops = {
  "1": {
    "x": 75,
    "y": 50,
    "w": 25,
    "h": 50,
    "rotation": 0,
    "transformOrigin": "120% 100%"
  },
  "2": {
    "x": 50,
    "y": 0,
    "w": 50,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "66.6% 33.3%"
  },
  "3": {
    "x": 0,
    "y": 0,
    "w": 50,
    "h": 50,
    "rotation": 180,
    "transformOrigin": "33.3% 33.3%"
  },
  "4": {
    "x": 0,
    "y": 50,
    "w": 50,
    "h": 50,
    "rotation": 0,
    "transformOrigin": "0% 100%"
  },
  "5": {
    "x": 50,
    "y": 50,
    "w": 25,
    "h": 50,
    "rotation": 0,
    "transformOrigin": "73% 100%"
  }
};

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

    // Handle folded zine cropping
    if (currentZine.type === 'folded-zine') {
        applyImageCrop(currentPage);
    } else {
        // Reset any cropping
        zineImage.style.clipPath = '';
        zineImage.style.transform = '';
    }

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

    if (zine.type === 'folded-zine') {
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

// Crop configurations for folded zines
// Use the crop-tool.html to generate these configurations
const cropConfigurations = {
    'forever': forever_crops,
    'kiss-me-son-of-god': kiss_me_son_of_god_crops,
    'planet-killer': planet_killer_crops,
    'yummy-treat': yummy_treat_crops
};

// Apply image cropping for folded zines
function applyImageCrop(page) {
    if (!currentZine || !cropConfigurations[currentZine.id]) {
        // Fallback to default 4-quadrant layout if no custom config
        const defaultCrops = {
            1: { x: 0, y: 0, w: 50, h: 50 },     // Top-left (cover + back cover)
            2: { x: 50, y: 0, w: 50, h: 50 },    // Top-right (first spread)
            3: { x: 0, y: 50, w: 50, h: 50 },    // Bottom-left (second spread)
            4: { x: 50, y: 50, w: 50, h: 50 },   // Bottom-right (third spread)
            5: { x: 0, y: 0, w: 50, h: 50 }      // Back to top-left (back cover)
        };

        const crop = defaultCrops[page];
        if (crop) {
            applyCropToImage(crop);
        }
        return;
    }

    const crop = cropConfigurations[currentZine.id][page];
    if (crop) {
        applyCropToImage(crop);
    }
}

// Helper function to apply crop styling to image
function applyCropToImage(crop) {
    const rotation = crop.rotation || 0;

    // Reset any previous positioning
    zineImage.style.position = 'static';
    zineImage.style.left = '';
    zineImage.style.top = '';

    // Use clip-path for cropping (works with rotation)
    zineImage.style.clipPath = `inset(${crop.y}% ${100-crop.x-crop.w}% ${100-crop.y-crop.h}% ${crop.x}%)`;

    // Use a fixed scale of 2 across the board
    let scale = 2;

    // Apply both scaling and rotation
    let transform = `scale(${scale})`;
    if (rotation !== 0) {
        transform += ` rotate(${rotation}deg)`;
    }

    zineImage.style.transform = transform;

    // Use custom transform origin if provided, otherwise calculate from crop center
    if (crop.transformOrigin) {
        zineImage.style.transformOrigin = crop.transformOrigin;
    } else {
        // Calculate the center of the crop area
        const originX = crop.x + (crop.w / 2);
        const originY = crop.y + (crop.h / 2);
        zineImage.style.transformOrigin = `${originX}% ${originY}%`;
    }

    // Ensure container doesn't clip the rotated content
    const container = zineImage.parentElement;
    container.style.overflow = 'visible';
    container.style.transform = '';
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

// Get cover style for grid display
function getCoverStyle(zine) {
    if (!cropConfigurations[zine.id] || !cropConfigurations[zine.id][1]) {
        return '';
    }

    const crop = cropConfigurations[zine.id][1]; // Page 1 is the cover
    const rotation = crop.rotation || 0;

    // Apply cropping and appropriate scaling for grid view
    let style = `clip-path: inset(${crop.y}% ${100-crop.x-crop.w}% ${100-crop.y-crop.h}% ${crop.x}%); `;

    // Use a smaller scale for grid view (covers need to fit in the card)
    const gridScale = crop.w <= 25 ? 1.5 : 1.2; // Smaller scale for covers vs spreads
    style += `transform: scale(${gridScale})`;

    if (rotation !== 0) {
        style += ` rotate(${rotation}deg)`;
    }

    if (crop.transformOrigin) {
        style += `; transform-origin: ${crop.transformOrigin}`;
    } else {
        const originX = crop.x + (crop.w / 2);
        const originY = crop.y + (crop.h / 2);
        style += `; transform-origin: ${originX}% ${originY}%`;
    }

    return style;
}

// Start the app
init();