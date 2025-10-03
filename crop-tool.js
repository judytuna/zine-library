// Folded zines data
const foldedZines = [
    { id: 'forever', title: 'Forever', extension: 'jpg' },
    { id: 'kiss-me-son-of-god', title: 'Kiss Me Son of God', extension: 'jpg' },
    { id: 'planet-killer', title: 'Planet Killer', extension: 'jpg' },
    { id: 'yummy-treat', title: 'Yummy Treat', extension: 'jpg' },
    { id: 'rays-of-light', title: 'Rays of Light', extension: 'jpeg' },
    { id: 'fritz-and-yi', title: 'Fritz and Yi', extension: 'jpg' },
    { id: 'love-is-glowing', title: 'Love is Glowing', extension: 'jpg' }
];

// State
let currentZine = null;
let selectedPage = null;
let isDrawing = false;
let startX, startY;
let cropConfigs = {};

// Snap zones for predefined areas
const snapZones = {
    'top-left-half': { x: 0, y: 0, w: 25, h: 50 },
    'top-right-half': { x: 25, y: 0, w: 25, h: 50 },
    'bottom-left-half': { x: 0, y: 50, w: 25, h: 50 },
    'bottom-right-half': { x: 25, y: 50, w: 25, h: 50 },
    'top-left-quad': { x: 0, y: 0, w: 50, h: 50 },
    'top-right-quad': { x: 50, y: 0, w: 50, h: 50 },
    'bottom-left-quad': { x: 0, y: 50, w: 50, h: 50 },
    'bottom-right-quad': { x: 50, y: 50, w: 50, h: 50 }
};

// DOM elements
const zineSelect = document.getElementById('zineSelect');
const cropWorkspace = document.getElementById('cropWorkspace');
const cropImage = document.getElementById('cropImage');
const cropOverlay = document.getElementById('cropOverlay');
const pageList = document.getElementById('pageList');
const cropInfo = document.getElementById('cropInfo');
const configOutput = document.getElementById('configOutput');
const rotationControls = document.getElementById('rotationControls');
const rotationSelect = document.getElementById('rotationSelect');

// Initialize
function init() {
    populateZineSelector();
    setupEventListeners();
}

function populateZineSelector() {
    foldedZines.forEach(zine => {
        const option = document.createElement('option');
        option.value = zine.id;
        option.textContent = zine.title;
        zineSelect.appendChild(option);
    });
}

function setupEventListeners() {
    zineSelect.addEventListener('change', loadZine);

    // Page selection
    pageList.addEventListener('click', (e) => {
        const pageItem = e.target.closest('.page-item');
        if (pageItem && !e.target.classList.contains('btn')) {
            selectPage(parseInt(pageItem.dataset.page));
        }
    });

    // Image cropping
    cropOverlay.addEventListener('mousedown', startCrop);
    cropOverlay.addEventListener('mousemove', updateCrop);
    cropOverlay.addEventListener('mouseup', endCrop);
    cropOverlay.addEventListener('mouseleave', endCrop);

    // Rotation changes
    rotationSelect.addEventListener('change', () => {
        if (selectedPage && currentZine && cropConfigs[currentZine.id] && cropConfigs[currentZine.id][selectedPage]) {
            cropConfigs[currentZine.id][selectedPage].rotation = parseInt(rotationSelect.value) || 0;
            updateConfigOutput();
        }
    });
}

function loadZine() {
    const zineId = zineSelect.value;
    if (!zineId) {
        cropWorkspace.style.display = 'none';
        return;
    }

    currentZine = foldedZines.find(z => z.id === zineId);
    if (!currentZine) return;

    // Initialize crop config for this zine if it doesn't exist
    if (!cropConfigs[zineId]) {
        cropConfigs[zineId] = {};
    }

    // Load the image
    const imagePath = `public/images/zines/${zineId}/fullpage.${currentZine.extension}`;

    // Wait for image to load before showing workspace
    cropImage.onload = function() {
        // Size the container to exactly match the displayed image
        const imageContainer = document.getElementById('imageContainer');

        // Calculate display size while maintaining aspect ratio
        const maxWidth = Math.min(800, window.innerWidth * 0.6);
        const maxHeight = Math.min(600, window.innerHeight * 0.6);

        const aspectRatio = cropImage.naturalWidth / cropImage.naturalHeight;

        let displayWidth, displayHeight;

        if (maxWidth / aspectRatio <= maxHeight) {
            displayWidth = maxWidth;
            displayHeight = maxWidth / aspectRatio;
        } else {
            displayHeight = maxHeight;
            displayWidth = maxHeight * aspectRatio;
        }

        // Set the container to exactly match the image display size
        imageContainer.style.width = `${displayWidth}px`;
        imageContainer.style.height = `${displayHeight}px`;

        // Ensure the image fills the container exactly
        cropImage.style.width = '100%';
        cropImage.style.height = '100%';
        cropImage.style.objectFit = 'fill';

        cropWorkspace.style.display = 'flex';
        updateCropDisplay();
        updateConfigOutput();
        updatePageStatus();
    };

    cropImage.onerror = function() {
        alert(`Could not load image: ${imagePath}`);
    };

    cropImage.src = imagePath;
}

function selectPage(pageNum) {
    selectedPage = pageNum;

    // Update UI
    document.querySelectorAll('.page-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageNum}"]`).classList.add('active');

    // Show rotation controls
    rotationControls.style.display = 'block';

    // Set rotation select to current rotation if it exists
    if (currentZine && cropConfigs[currentZine.id] && cropConfigs[currentZine.id][pageNum] && cropConfigs[currentZine.id][pageNum].rotation) {
        rotationSelect.value = cropConfigs[currentZine.id][pageNum].rotation;
    } else {
        rotationSelect.value = '0';
    }

    // Update crop info
    const pageNames = {
        1: 'Front Cover',
        2: 'First Spread',
        3: 'Second Spread',
        4: 'Third Spread',
        5: 'Back Cover'
    };

    cropInfo.innerHTML = `<strong>Selected:</strong> ${pageNames[pageNum]}<br><em>Drag on the image, use snap buttons, or set rotation.</em>`;

    updateCropDisplay();
}

function startCrop(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedPage) {
        alert('Please select a page first!');
        return;
    }

    console.log('Starting crop for page', selectedPage);
    isDrawing = true;
    const rect = cropOverlay.getBoundingClientRect();
    startX = ((e.clientX - rect.left) / rect.width) * 100;
    startY = ((e.clientY - rect.top) / rect.height) * 100;

    console.log('Start position:', startX, startY);

    // Remove existing crop for this page
    removeCropRegion(selectedPage);
}

function updateCrop(e) {
    if (!isDrawing || !selectedPage) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = cropOverlay.getBoundingClientRect();
    let currentX = ((e.clientX - rect.left) / rect.width) * 100;
    let currentY = ((e.clientY - rect.top) / rect.height) * 100;

    // Apply snapping
    const snapThreshold = 5; // 5% snap threshold
    const snapPoints = [0, 25, 50, 75, 100];

    snapPoints.forEach(point => {
        if (Math.abs(currentX - point) < snapThreshold) currentX = point;
        if (Math.abs(currentY - point) < snapThreshold) currentY = point;
    });

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    // Remove any existing preview crop
    removeCropRegion(`preview-${selectedPage}`);

    // Create preview crop region
    createCropRegion(x, y, width, height, selectedPage, true);
}

function endCrop(e) {
    if (!isDrawing || !selectedPage) return;

    e.preventDefault();
    e.stopPropagation();

    console.log('Ending crop');
    isDrawing = false;

    const rect = cropOverlay.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    console.log('Final crop dimensions:', { x, y, width, height });

    // Only save if the crop is big enough
    if (width > 2 && height > 2) {
        // Save the crop configuration including rotation
        cropConfigs[currentZine.id][selectedPage] = {
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
            w: Math.max(1, Math.min(100 - x, width)),
            h: Math.max(1, Math.min(100 - y, height)),
            rotation: parseInt(rotationSelect.value) || 0
        };

        console.log('Saved crop for page', selectedPage, cropConfigs[currentZine.id][selectedPage]);

        updateCropDisplay();
        updateConfigOutput();
        updatePageStatus();
    } else {
        console.log('Crop too small, not saving');
    }

    // Remove preview
    removeCropRegion(`preview-${selectedPage}`);
}

function createCropRegion(x, y, width, height, pageNum, isPreview = false) {
    const region = document.createElement('div');
    region.className = 'crop-region';
    region.id = isPreview ? `preview-${pageNum}` : `crop-${pageNum}`;

    if (!isPreview) {
        region.classList.add('active');
    }

    region.style.left = `${x}%`;
    region.style.top = `${y}%`;
    region.style.width = `${width}%`;
    region.style.height = `${height}%`;

    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `Page ${pageNum}`;
    region.appendChild(label);

    cropOverlay.appendChild(region);
}

function removeCropRegion(identifier) {
    const existing = document.getElementById(`crop-${identifier}`) ||
                    document.getElementById(`preview-${identifier}`) ||
                    document.getElementById(identifier);
    if (existing) {
        existing.remove();
    }
}

function updateCropDisplay() {
    // Clear all crop regions
    cropOverlay.innerHTML = '';

    if (!currentZine || !cropConfigs[currentZine.id]) return;

    // Display all configured crops
    Object.entries(cropConfigs[currentZine.id]).forEach(([pageNum, crop]) => {
        createCropRegion(crop.x, crop.y, crop.w, crop.h, pageNum);
    });
}

function updatePageStatus() {
    document.querySelectorAll('.page-item').forEach(item => {
        const pageNum = item.dataset.page;
        item.classList.remove('configured');

        if (currentZine && cropConfigs[currentZine.id] && cropConfigs[currentZine.id][pageNum]) {
            item.classList.add('configured');
        }
    });
}

function clearCrop(pageNum) {
    if (currentZine && cropConfigs[currentZine.id]) {
        delete cropConfigs[currentZine.id][pageNum];
        updateCropDisplay();
        updateConfigOutput();
        updatePageStatus();
    }
}

function previewPage() {
    if (!selectedPage || !currentZine || !cropConfigs[currentZine.id] || !cropConfigs[currentZine.id][selectedPage]) {
        alert('Please configure a crop for the selected page first!');
        return;
    }

    const crop = cropConfigs[currentZine.id][selectedPage];

    // Create a preview window
    const preview = window.open('', '_blank', 'width=800,height=600');
    preview.document.write(`
        <html>
            <head><title>Preview: Page ${selectedPage}</title></head>
            <body style="margin:0; padding:20px; background:#f0f0f0;">
                <h2>Page ${selectedPage} Preview</h2>
                <div style="border:2px solid #333; display:inline-block;">
                    <img src="${cropImage.src}" style="
                        clip-path: inset(${crop.y}% ${100-crop.x-crop.w}% ${100-crop.y-crop.h}% ${crop.x}%);
                        width: 600px;
                        height: auto;
                        display: block;
                    ">
                </div>
            </body>
        </html>
    `);
}

function updateConfigOutput() {
    if (!currentZine || !cropConfigs[currentZine.id] || Object.keys(cropConfigs[currentZine.id]).length === 0) {
        configOutput.textContent = '// Select a zine and configure crops to see the generated code here';
        return;
    }

    const config = cropConfigs[currentZine.id];
    const output = `// Crop configuration for ${currentZine.title}
const ${currentZine.id.replace(/-/g, '_')}_crops = ${JSON.stringify(config, null, 2)};`;

    configOutput.textContent = output;
}

function copyConfig() {
    if (configOutput.textContent.includes('// Select a zine')) {
        alert('No configuration to copy! Configure some crops first.');
        return;
    }

    navigator.clipboard.writeText(configOutput.textContent).then(() => {
        alert('Configuration copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = configOutput.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Configuration copied to clipboard!');
    });
}

// Snap to predefined zone
function snapToZone(zoneName) {
    if (!selectedPage) {
        alert('Please select a page first!');
        return;
    }

    const zone = snapZones[zoneName];
    if (!zone) return;

    // Remove existing crop for this page
    removeCropRegion(selectedPage);

    // Save the crop configuration
    if (!cropConfigs[currentZine.id]) {
        cropConfigs[currentZine.id] = {};
    }

    cropConfigs[currentZine.id][selectedPage] = {
        x: zone.x,
        y: zone.y,
        w: zone.w,
        h: zone.h,
        rotation: parseInt(rotationSelect.value) || 0
    };

    updateCropDisplay();
    updateConfigOutput();
    updatePageStatus();
}

// Initialize the tool
init();