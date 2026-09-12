"use strict";

/*
  PhotoReady
  ----------
  Local browser image preparation tool.

  No external libraries.
  No server required.
*/


/* =========================
   DOM
========================= */

const imageInput = document.getElementById("imageInput");
const uploadCard = document.getElementById("uploadCard");

const editorSection = document.getElementById("editorSection");

const changeImageBtn =
  document.getElementById("changeImageBtn");

const originalPreview =
  document.getElementById("originalPreview");

const fileName =
  document.getElementById("fileName");

const originalDimensions =
  document.getElementById("originalDimensions");

const originalSize =
  document.getElementById("originalSize");

const presetGrid =
  document.getElementById("presetGrid");

const emptySearch =
  document.getElementById("emptySearch");

const presetSearch =
  document.getElementById("presetSearch");

const categoryTabs =
  document.getElementById("categoryTabs");

const settingsCard =
  document.getElementById("settingsCard");

const selectedPresetTitle =
  document.getElementById("selectedPresetTitle");

const selectedPresetDescription =
  document.getElementById("selectedPresetDescription");

const formatSelect =
  document.getElementById("formatSelect");

const fitSelect =
  document.getElementById("fitSelect");

const qualityRange =
  document.getElementById("qualityRange");

const qualityValue =
  document.getElementById("qualityValue");

const sizeTarget =
  document.getElementById("sizeTarget");

const prepareButton =
  document.getElementById("prepareButton");

const multipleButton =
  document.getElementById("multipleButton");

const resultCard =
  document.getElementById("resultCard");

const resultPreview =
  document.getElementById("resultPreview");

const resultDimensions =
  document.getElementById("resultDimensions");

const resultSize =
  document.getElementById("resultSize");

const resultFormat =
  document.getElementById("resultFormat");

const downloadButton =
  document.getElementById("downloadButton");

const prepareAnotherButton =
  document.getElementById("prepareAnotherButton");

const multiCard =
  document.getElementById("multiCard");

const multiResults =
  document.getElementById("multiResults");

const toast =
  document.getElementById("toast");

const year =
  document.getElementById("year");


/* =========================
   DATA
========================= */

const PRESETS = [

  /* DOCUMENTS */

  {
    id: "us-visa",
    title: "US Visa / Photo",
    category: "documents",
    icon: "🇺🇸",
    width: 600,
    height: 600,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Square digital preparation."
  },

  {
    id: "uk-passport",
    title: "UK Passport",
    category: "documents",
    icon: "🇬🇧",
    width: 600,
    height: 750,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Portrait digital preparation."
  },

  {
    id: "passport-35x45",
    title: "35 × 45 mm",
    category: "documents",
    icon: "🪪",
    width: 413,
    height: 531,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Common passport-style ratio."
  },

  {
    id: "photo-2x2",
    title: "2 × 2 Photo",
    category: "documents",
    icon: "📐",
    width: 600,
    height: 600,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Square document photo."
  },

  {
    id: "id-photo",
    title: "ID Photo",
    category: "documents",
    icon: "🧾",
    width: 600,
    height: 750,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Generic portrait ID format."
  },


  /* COMMERCE */

  {
    id: "amazon-main",
    title: "Amazon Product",
    category: "commerce",
    icon: "📦",
    width: 2000,
    height: 2000,
    format: "image/jpeg",
    quality: 92,
    fit: "contain",
    description: "Large square product canvas."
  },

  {
    id: "etsy-listing",
    title: "Etsy Listing",
    category: "commerce",
    icon: "🧡",
    width: 2000,
    height: 2000,
    format: "image/jpeg",
    quality: 90,
    fit: "contain",
    description: "Large square listing image."
  },

  {
    id: "ebay-product",
    title: "eBay Product",
    category: "commerce",
    icon: "🛒",
    width: 1600,
    height: 1600,
    format: "image/jpeg",
    quality: 90,
    fit: "contain",
    description: "Large square product image."
  },

  {
    id: "product-square",
    title: "Product Square",
    category: "commerce",
    icon: "⬜",
    width: 1600,
    height: 1600,
    format: "image/jpeg",
    quality: 92,
    fit: "contain",
    description: "General marketplace square."
  },

  {
    id: "product-white",
    title: "White Canvas",
    category: "commerce",
    icon: "⚪",
    width: 1600,
    height: 1600,
    format: "image/jpeg",
    quality: 92,
    fit: "contain",
    description: "Adds white space around the image; does not remove its background."
  },


  /* SOCIAL */

  {
    id: "youtube-thumbnail",
    title: "YouTube Thumbnail",
    category: "social",
    icon: "▶️",
    width: 1280,
    height: 720,
    format: "image/jpeg",
    quality: 92,
    fit: "crop",
    description: "16:9 video thumbnail."
  },

  {
    id: "youtube-banner",
    title: "YouTube Channel",
    category: "social",
    icon: "▶️",
    width: 2560,
    height: 1440,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Large channel-art canvas."
  },

  {
    id: "instagram-post",
    title: "Instagram Portrait",
    category: "social",
    icon: "📸",
    width: 1080,
    height: 1350,
    format: "image/jpeg",
    quality: 92,
    fit: "crop",
    description: "Portrait feed format."
  },

  {
    id: "instagram-square",
    title: "Instagram Square",
    category: "social",
    icon: "📸",
    width: 1080,
    height: 1080,
    format: "image/jpeg",
    quality: 92,
    fit: "crop",
    description: "Square feed format."
  },

  {
    id: "instagram-story",
    title: "Instagram Story",
    category: "social",
    icon: "📱",
    width: 1080,
    height: 1920,
    format: "image/jpeg",
    quality: 92,
    fit: "crop",
    description: "Vertical story format."
  },

  {
    id: "facebook-cover",
    title: "Facebook Cover",
    category: "social",
    icon: "f",
    width: 1640,
    height: 856,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Wide social cover."
  },

  {
    id: "facebook-post",
    title: "Facebook Post",
    category: "social",
    icon: "f",
    width: 1200,
    height: 630,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Landscape social post."
  },

  {
    id: "tiktok",
    title: "TikTok",
    category: "social",
    icon: "♪",
    width: 1080,
    height: 1920,
    format: "image/jpeg",
    quality: 92,
    fit: "crop",
    description: "Vertical video format."
  },

  {
    id: "linkedin-cover",
    title: "LinkedIn Cover",
    category: "social",
    icon: "in",
    width: 1584,
    height: 396,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Professional wide cover."
  },


  /* PROFESSIONAL */

  {
    id: "linkedin-profile",
    title: "LinkedIn Profile",
    category: "professional",
    icon: "in",
    width: 400,
    height: 400,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Square profile image."
  },

  {
    id: "resume-photo",
    title: "Resume Photo",
    category: "professional",
    icon: "📄",
    width: 800,
    height: 1000,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "Clean portrait format."
  },

  {
    id: "professional-square",
    title: "Professional Square",
    category: "professional",
    icon: "💼",
    width: 1000,
    height: 1000,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "General professional photo."
  },


  /* GENERAL */

  {
    id: "square",
    title: "Square",
    category: "general",
    icon: "⬜",
    width: 1200,
    height: 1200,
    format: "image/jpeg",
    quality: 92,
    fit: "crop",
    description: "General square image."
  },

  {
    id: "wide",
    title: "Wide 16:9",
    category: "general",
    icon: "▭",
    width: 1280,
    height: 720,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "General landscape format."
  },

  {
    id: "portrait",
    title: "Portrait",
    category: "general",
    icon: "▯",
    width: 1080,
    height: 1350,
    format: "image/jpeg",
    quality: 90,
    fit: "crop",
    description: "General portrait format."
  },

  {
    id: "compress",
    title: "Compress Image",
    category: "general",
    icon: "⚡",
    width: null,
    height: null,
    format: "image/jpeg",
    quality: 72,
    fit: "original",
    description: "Keep dimensions and reduce file size."
  },

  {
    id: "webp",
    title: "Convert to WebP",
    category: "general",
    icon: "🌐",
    width: null,
    height: null,
    format: "image/webp",
    quality: 85,
    fit: "original",
    description: "Modern web-friendly format."
  }

];


/* =========================
   STATE
========================= */

let selectedFile = null;
let selectedPreset = null;
let selectedCategory = "all";

let originalObjectUrl = null;
let resultObjectUrl = null;

let batchObjectUrls = [];


/* =========================
   HELPERS
========================= */

function formatFileSize(bytes) {

  if (!Number.isFinite(bytes) || bytes < 0) {
    return "—";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}


function formatMimeType(type) {

  const map = {
    "image/jpeg": "JPG",
    "image/png": "PNG",
    "image/webp": "WebP"
  };

  return map[type] || type.replace("image/", "").toUpperCase();
}


function extensionFor(type) {

  const map = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"
  };

  return map[type] || "jpg";
}


function revokeUrl(url) {

  if (url) {
    URL.revokeObjectURL(url);
  }
}


function revokeBatchUrls() {

  batchObjectUrls.forEach(revokeUrl);

  batchObjectUrls = [];
}


function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* =========================
   FILE HANDLING
========================= */

function handleFile(file) {

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {

    showToast(
      "Please choose an image file."
    );

    return;
  }


  const MAX_SIZE =
    25 * 1024 * 1024;


  if (file.size > MAX_SIZE) {

    showToast(
      "This image is larger than 25 MB."
    );

    return;
  }


  selectedFile = file;

  revokeUrl(originalObjectUrl);

  originalObjectUrl =
    URL.createObjectURL(file);


  originalPreview.src =
    originalObjectUrl;


  fileName.textContent =
    file.name;


  originalSize.textContent =
    formatFileSize(file.size);


  originalPreview.onload = () => {

    originalDimensions.textContent =
      `${originalPreview.naturalWidth} × ${originalPreview.naturalHeight}`;

    updatePhotoCheck(
      originalPreview.naturalWidth,
      originalPreview.naturalHeight,
      file.size
    );

  };


  uploadCard.style.display = "none";

  editorSection.style.display = "block";

  settingsCard.style.display = "none";

  resultCard.style.display = "none";

  multiCard.style.display = "none";

  selectedPreset = null;

  clearResults();

  renderPresets();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function updatePhotoCheck(width, height, size) {

  const checkList =
    document.getElementById("checkList");


  const large =
    size > 10 * 1024 * 1024;


  checkList.innerHTML = `
    <div>
      <span>✓</span>
      Image loaded successfully
    </div>

    <div>
      <span>✓</span>
      Resolution: ${width} × ${height}
    </div>

    <div>
      <span>${large ? "!" : "✓"}</span>
      ${large
        ? "Large file — compression may take longer"
        : "File size is suitable for browser processing"}
    </div>

    <div>
      <span>✓</span>
      Original image stays unchanged
    </div>
  `;
}


imageInput.addEventListener(
  "change",
  event => {

    const file =
      event.target.files &&
      event.target.files[0];

    handleFile(file);

    imageInput.value = "";
  }
);


changeImageBtn.addEventListener(
  "click",
  () => {
    imageInput.click();
  }
);


/* DRAG & DROP */

["dragenter", "dragover"].forEach(
  eventName => {

    uploadCard.addEventListener(
      eventName,
      event => {

        event.preventDefault();

        uploadCard.classList.add("dragover");
      }
    );
  }
);


["dragleave", "drop"].forEach(
  eventName => {

    uploadCard.addEventListener(
      eventName,
      event => {

        event.preventDefault();

        uploadCard.classList.remove("dragover");
      }
    );
  }
);


uploadCard.addEventListener(
  "drop",
  event => {

    const file =
      event.dataTransfer.files &&
      event.dataTransfer.files[0];

    handleFile(file);
  }
);


/* =========================
   PRESETS
========================= */

function getFilteredPresets() {

  const search =
    presetSearch.value
      .trim()
      .toLowerCase();


  return PRESETS.filter(preset => {

    const categoryMatch =
      selectedCategory === "all" ||
      preset.category === selectedCategory;


    const searchable =
      [
        preset.title,
        preset.id,
        preset.category,
        preset.description,
        preset.width,
        preset.height
      ]
      .join(" ")
      .toLowerCase();


    const searchMatch =
      !search ||
      searchable.includes(search);


    return categoryMatch && searchMatch;
  });
}


function renderPresets() {

  const presets =
    getFilteredPresets();


  presetGrid.innerHTML = "";


  emptySearch.style.display =
    presets.length ? "none" : "block";


  presets.forEach(preset => {

    const button =
      document.createElement("button");


    button.type = "button";

    button.className =
      "preset" +
      (
        selectedPreset &&
        selectedPreset.id === preset.id
          ? " selected"
          : ""
      );


    const dimensions =
      preset.width && preset.height
        ? `${preset.width} × ${preset.height}`
        : "Original size";


    button.innerHTML = `
      <div class="preset-icon">
        ${preset.icon}
      </div>

      <div class="preset-title">
        ${escapeHtml(preset.title)}
      </div>

      <div class="preset-meta">
        ${dimensions}
      </div>

      <div class="preset-description">
        ${escapeHtml(preset.description)}
      </div>
    `;


    button.addEventListener(
      "click",
      () => selectPreset(preset)
    );


    presetGrid.appendChild(button);
  });
}


function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* SEARCH */

presetSearch.addEventListener(
  "input",
  renderPresets
);


/* CATEGORIES */

categoryTabs.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(".category-tab");


    if (!button) {
      return;
    }


    selectedCategory =
      button.dataset.category;


    document
      .querySelectorAll(".category-tab")
      .forEach(tab => {
        tab.classList.toggle(
          "active",
          tab === button
        );
      });


    renderPresets();
  }
);


/* =========================
   SELECT PRESET
========================= */

function selectPreset(preset) {

  selectedPreset = preset;


  selectedPresetTitle.textContent =
    preset.title;


  selectedPresetDescription.textContent =
    preset.description;


  formatSelect.value =
    preset.format;


  fitSelect.value =
    preset.fit === "original"
      ? "contain"
      : preset.fit;


  qualityRange.value =
    preset.quality;


  qualityValue.textContent =
    `${preset.quality}%`;


  sizeTarget.value =
    "best";


  settingsCard.style.display =
    "block";


  resultCard.style.display =
    "none";


  multiCard.style.display =
    "none";


  renderPresets();


  settingsCard.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================
   QUALITY
========================= */

qualityRange.addEventListener(
  "input",
  () => {

    qualityValue.textContent =
      `${qualityRange.value}%`;
  }
);


/* =========================
   IMAGE LOADING
========================= */

function loadImageFromFile(file) {

  return new Promise(
    (resolve, reject) => {

      const url =
        URL.createObjectURL(file);


      const img =
        new Image();


      img.onload = () => {

        URL.revokeObjectURL(url);

        if (!img.naturalWidth || !img.naturalHeight) {

          reject(
            new Error("Invalid image dimensions.")
          );

          return;
        }

        resolve(img);
      };


      img.onerror = () => {

        URL.revokeObjectURL(url);

        reject(
          new Error("Could not load image.")
        );
      };


      img.src = url;
    }
  );
}


/* =========================
   CANVAS
========================= */

function createCanvas(width, height) {

  const canvas =
    document.createElement("canvas");


  canvas.width = width;
  canvas.height = height;


  const ctx =
    canvas.getContext("2d", {
      alpha: false
    });


  if (!ctx) {
    throw new Error(
      "Canvas is not supported."
    );
  }


  ctx.imageSmoothingEnabled = true;

  ctx.imageSmoothingQuality = "high";


  return {
    canvas,
    ctx
  };
}


function drawImageToCanvas(
  img,
  canvas,
  ctx,
  fit
) {

  const sw =
    img.naturalWidth;

  const sh =
    img.naturalHeight;

  const dw =
    canvas.width;

  const dh =
    canvas.height;


  if (fit === "contain") {

    const scale =
      Math.min(
        dw / sw,
        dh / sh
      );


    const width =
      sw * scale;

    const height =
      sh * scale;


    const x =
      (dw - width) / 2;

    const y =
      (dh - height) / 2;


    ctx.drawImage(
      img,
      x,
      y,
      width,
      height
    );

    return;
  }


  /* CROP */

  const sourceRatio =
    sw / sh;

  const targetRatio =
    dw / dh;


  let sx = 0;
  let sy = 0;
  let sWidth = sw;
  let sHeight = sh;


  if (sourceRatio > targetRatio) {

    sWidth =
      sh * targetRatio;

    sx =
      (sw - sWidth) / 2;

  } else {

    sHeight =
      sw / targetRatio;

    sy =
      (sh - sHeight) / 2;
  }


  ctx.drawImage(
    img,
    sx,
    sy,
    sWidth,
    sHeight,
    0,
    0,
    dw,
    dh
  );
}


function canvasToBlob(
  canvas,
  type,
  quality
) {

  return new Promise(
    (resolve, reject) => {

      canvas.toBlob(
        blob => {

          if (!blob) {

            reject(
              new Error(
                "Image encoding failed."
              )
            );

            return;
          }

          resolve(blob);
        },
        type,
        quality
      );
    }
  );
}


/* =========================
   TARGET SIZE
========================= */

function targetBytes() {

  const value =
    sizeTarget.value;


  if (value === "best") {
    return null;
  }


  return Number(value) * 1024;
}


/*
  Try several quality levels.
  We never lower below 40 because
  extremely low JPEG quality can become
  visibly bad.

  If target cannot be reached,
  return the smallest reasonable result.
*/

async function encodeWithTarget(
  canvas,
  type,
  preferredQuality,
  target
) {

  if (!target) {

    return canvasToBlob(
      canvas,
      type,
      preferredQuality
    );
  }


  const qualities = [];


  const start =
    Math.max(
      40,
      Math.min(
        100,
        preferredQuality
      )
    );


  for (
    let q = start;
    q >= 40;
    q -= 5
  ) {
    qualities.push(q);
  }


  let smallestBlob = null;


  for (const q of qualities) {

    const blob =
      await canvasToBlob(
        canvas,
        type,
        q / 100
      );


    smallestBlob = blob;


    if (blob.size <= target) {
      return blob;
    }
  }


  return smallestBlob;
}


/* =========================
   PREPARE IMAGE
========================= */

async function preparePreset(
  preset,
  overrides = {}
) {

  if (!selectedFile) {
    throw new Error(
      "Please choose an image first."
    );
  }


  const img =
    await loadImageFromFile(
      selectedFile
    );


  let width =
    preset.width ||
    img.naturalWidth;


  let height =
    preset.height ||
    img.naturalHeight;


  /*
    Protect mobile browsers from
    accidentally huge canvas sizes.
  */

  const MAX_DIMENSION = 5000;


  const largest =
    Math.max(width, height);


  if (largest > MAX_DIMENSION) {

    const scale =
      MAX_DIMENSION / largest;

    width =
      Math.round(width * scale);

    height =
      Math.round(height * scale);
  }


  width =
    Math.max(
      1,
      Math.round(width)
    );

  height =
    Math.max(
      1,
      Math.round(height)
    );


  const {
    canvas,
    ctx
  } =
    createCanvas(
      width,
      height
    );


  const type =
    overrides.type ||
    formatSelect.value ||
    preset.format;


  const fit =
    overrides.fit ||
    (
      preset.fit === "original"
        ? "contain"
        : fitSelect.value
    );


  /*
    JPEG has no transparency.
    White background is safer than
    accidental black/transparent output.
  */

  if (type === "image/jpeg") {

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
      0,
      0,
      width,
      height
    );
  }


  drawImageToCanvas(
    img,
    canvas,
    ctx,
    fit
  );


  const preferredQuality =
    overrides.quality ??
    Number(qualityRange.value);


  const blob =
    await encodeWithTarget(
      canvas,
      type,
      preferredQuality,
      overrides.target ??
      targetBytes()
    );


  return {
    blob,
    width,
    height,
    type
  };
}


/* =========================
   MAIN PREPARE
========================= */

prepareButton.addEventListener(
  "click",
  async () => {

    if (!selectedPreset) {

      showToast(
        "Choose a preset first."
      );

      return;
    }


    setButtonLoading(
      prepareButton,
      true
    );


    try {

      const result =
        await preparePreset(
          selectedPreset
        );


      showResult(
        result,
        selectedPreset
      );


      showToast(
        "Your image is ready."
      );

    } catch (error) {

      console.error(error);

      showToast(
        "Something went wrong while processing the image."
      );

    } finally {

      setButtonLoading(
        prepareButton,
        false
      );
    }
  }
);


/* =========================
   RESULT
========================= */

function showResult(
  result,
  preset
) {

  revokeUrl(resultObjectUrl);


  resultObjectUrl =
    URL.createObjectURL(
      result.blob
    );


  resultPreview.src =
    resultObjectUrl;


  resultDimensions.textContent =
    `${result.width} × ${result.height}`;


  resultSize.textContent =
    formatFileSize(
      result.blob.size
    );


  resultFormat.textContent =
    formatMimeType(
      result.type
    );


  const extension =
    extensionFor(
      result.type
    );


  const safeName =
    preset.id
      .replace(/[^a-z0-9-_]/gi, "-");


  downloadButton.href =
    resultObjectUrl;


  downloadButton.download =
    `photoready-${safeName}.${extension}`;


  resultCard.style.display =
    "block";


  multiCard.style.display =
    "none";


  resultCard.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* =========================
   MULTIPLE VERSIONS
========================= */

const BATCH_PRESET_IDS = [
  "amazon-main",
  "etsy-listing",
  "ebay-product",
  "square",
  "wide",
  "instagram-post"
];


multipleButton.addEventListener(
  "click",
  async () => {

    if (!selectedFile) {

      showToast(
        "Please choose an image first."
      );

      return;
    }


    setButtonLoading(
      multipleButton,
      true
    );


    try {

      revokeBatchUrls();

      multiResults.innerHTML = "";

      multiCard.style.display =
        "block";


      /*
        Use the first six useful general/commercial
        versions. The user can still use the normal
        preset flow for any other format.
      */

      for (const id of BATCH_PRESET_IDS) {

        const preset =
          PRESETS.find(
            item => item.id === id
          );


        if (!preset) {
          continue;
        }


        try {

          const result =
            await preparePreset(
              preset,
              {
                type: preset.format,
                quality: preset.quality,
                target: null,
                fit: preset.fit
              }
            );


          addBatchResult(
            result,
            preset
          );

        } catch (error) {

          console.error(
            "Batch item failed:",
            preset.id,
            error
          );
        }
      }


      if (!multiResults.children.length) {

        throw new Error(
          "No batch results."
        );
      }


      multiCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


      showToast(
        "Multiple versions created."
      );

    } catch (error) {

      console.error(error);

      showToast(
        "Could not create the multiple versions."
      );

    } finally {

      setButtonLoading(
        multipleButton,
        false
      );
    }
  }
);


function addBatchResult(
  result,
  preset
) {

  const url =
    URL.createObjectURL(
      result.blob
    );


  batchObjectUrls.push(url);


  const extension =
    extensionFor(
      result.type
    );


  const item =
    document.createElement("div");


  item.className =
    "multi-item";


  item.innerHTML = `
    <div class="multi-image">
      <img
        src="${url}"
        alt="${escapeHtml(preset.title)}"
      >
    </div>

    <div class="multi-info">

      <div class="multi-title">
        ${escapeHtml(preset.title)}
      </div>

      <div class="multi-meta">
        ${result.width} × ${result.height}
        ·
        ${formatFileSize(result.blob.size)}
      </div>

      <a
        class="multi-download"
        href="${url}"
        download="photoready-${preset.id}.${extension}"
      >
        ↓ Download
      </a>

    </div>
  `;


  multiResults.appendChild(item);
}


/* =========================
   LOADING STATE
========================= */

function setButtonLoading(
  button,
  loading
) {

  button.disabled =
    loading;


  button.classList.toggle(
    "loading",
    loading
  );
}


/* =========================
   CLEAR RESULTS
========================= */

function clearResults() {

  revokeUrl(resultObjectUrl);

  resultObjectUrl = null;

  revokeBatchUrls();

  resultPreview.removeAttribute("src");

  multiResults.innerHTML = "";
}


prepareAnotherButton.addEventListener(
  "click",
  () => {

    resultCard.style.display =
      "none";

    settingsCard.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
);


/* =========================
   CLEANUP
========================= */

window.addEventListener(
  "beforeunload",
  () => {

    revokeUrl(originalObjectUrl);

    revokeUrl(resultObjectUrl);

    revokeBatchUrls();
  }
);


/* =========================
   YEAR
========================= */

year.textContent =
  new Date().getFullYear();


/* =========================
   INITIAL
========================= */

renderPresets();
