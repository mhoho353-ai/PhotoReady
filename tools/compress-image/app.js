"use strict";

const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const dropZone = document.getElementById("dropZone");

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

const fileName = document.getElementById("fileName");
const originalInfo = document.getElementById("originalInfo");

const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");

const format = document.getElementById("format");
const target = document.getElementById("target");

const compressButton =
  document.getElementById("compressButton");

const result =
  document.getElementById("result");

const resultPreview =
  document.getElementById("resultPreview");

const resultInfo =
  document.getElementById("resultInfo");

const download =
  document.getElementById("download");

const newImage =
  document.getElementById("newImage");

const message =
  document.getElementById("message");


let currentFile = null;
let currentImage = null;

let resultUrl = null;
let previewUrl = null;


/* =========================
   MESSAGES
========================= */

function showMessage(text, type = "") {

  message.textContent = text;

  message.className =
    `message ${type}`;
}


function clearMessage() {

  message.textContent = "";

  message.className =
    "message";
}


/* =========================
   FILE SIZE
========================= */

function formatBytes(bytes) {

  if (
    !Number.isFinite(bytes) ||
    bytes < 0
  ) {
    return "—";
  }

  if (bytes < 1024) {

    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {

    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(2)} MB`;
}


/* =========================
   FORMAT
========================= */

function formatPercent(value) {

  return `${Math.round(value)}%`;
}


function extensionForMime(mime) {

  if (mime === "image/webp") {
    return "webp";
  }

  if (mime === "image/png") {
    return "png";
  }

  return "jpg";
}


function mimeForFormat(value) {

  if (value === "webp") {
    return "image/webp";
  }

  if (value === "png") {
    return "image/png";
  }

  return "image/jpeg";
}


/* =========================
   VALIDATION
========================= */

function isSupportedFile(file) {

  return (
    file &&
    file.type &&
    file.type.startsWith("image/")
  );
}


/* =========================
   LOAD IMAGE
========================= */

function loadImage(file) {

  return new Promise(
    (resolve, reject) => {

      const url =
        URL.createObjectURL(file);

      const img =
        new Image();

      img.onload = () => {

        URL.revokeObjectURL(url);

        resolve(img);
      };

      img.onerror = () => {

        URL.revokeObjectURL(url);

        reject(
          new Error(
            "This image could not be read by the browser."
          )
        );
      };

      img.src = url;
    }
  );
}


/* =========================
   CANVAS → BLOB
========================= */

function canvasBlob(
  img,
  mime,
  qualityValueNumber
) {

  return new Promise(
    (resolve, reject) => {

      const canvas =
        document.createElement("canvas");

      canvas.width =
        img.naturalWidth;

      canvas.height =
        img.naturalHeight;


      const ctx =
        canvas.getContext(
          "2d",
          { alpha: true }
        );


      if (!ctx) {

        reject(
          new Error(
            "Canvas is not available in this browser."
          )
        );

        return;
      }


      /*
        JPEG does not support transparency.
        Use white as the background instead
        of allowing transparent pixels to become
        an unwanted black background.
      */

      if (mime === "image/jpeg") {

        ctx.fillStyle =
          "#ffffff";

        ctx.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }


      ctx.drawImage(
        img,
        0,
        0
      );


      canvas.toBlob(
        blob => {

          if (blob) {

            resolve(blob);

          } else {

            reject(
              new Error(
                "The browser could not create the compressed image."
              )
            );
          }
        },
        mime,
        qualityValueNumber
      );
    }
  );
}


/* =========================
   ENCODE
========================= */

async function encodeAtQuality(
  mime,
  q
) {

  return canvasBlob(
    currentImage,
    mime,
    q / 100
  );
}


/* =========================
   TARGET SIZE
========================= */

async function findBestUnderTarget(
  mime,
  targetBytes,
  startQuality
) {

  /*
    PNG does not use the quality parameter
    in canvas.toBlob().
    Therefore target-size searching is
    not meaningful for PNG.
  */

  if (mime === "image/png") {

    return encodeAtQuality(
      mime,
      startQuality
    );
  }


  let low = 10;

  let high =
    Math.max(
      10,
      Math.min(
        100,
        startQuality
      )
    );

  let best = null;


  /*
    Binary search for a quality level
    that gets as close as possible to
    the requested target without going
    above it.
  */

  for (
    let i = 0;
    i < 7;
    i += 1
  ) {

    const q =
      Math.round(
        (low + high) / 2
      );


    const blob =
      await encodeAtQuality(
        mime,
        q
      );


    if (
      blob.size <= targetBytes
    ) {

      best = blob;

      low = q + 1;

    } else {

      high = q - 1;
    }
  }


  /*
    If even quality 10 is larger
    than the requested target,
    return the smallest attempted
    result instead of failing.
  */

  if (best) {

    return best;
  }


  return encodeAtQuality(
    mime,
    10
  );
}


/* =========================
   COMPRESS
========================= */

async function compressImage() {

  if (
    !currentFile ||
    !currentImage
  ) {

    showMessage(
      "Choose an image first.",
      "error"
    );

    return;
  }


  clearMessage();

  compressButton.disabled = true;

  compressButton.textContent =
    "Compressing…";


  try {

    const mime =
      mimeForFormat(
        format.value
      );

    const requestedQuality =
      Number(
        quality.value
      );

    const targetValue =
      target.value;


    let blob;


    if (
      targetValue === "best"
    ) {

      blob =
        await encodeAtQuality(
          mime,
          requestedQuality
        );

    } else {

      const targetBytes =
        Number(targetValue) *
        1024;

      blob =
        await findBestUnderTarget(
          mime,
          targetBytes,
          requestedQuality
        );
    }


    if (
      !blob ||
      blob.size === 0
    ) {

      throw new Error(
        "Compression did not produce a valid file."
      );
    }


    if (resultUrl) {

      URL.revokeObjectURL(
        resultUrl
      );
    }


    resultUrl =
      URL.createObjectURL(
        blob
      );


    resultPreview.src =
      resultUrl;


    const reduction =
      Math.max(
        0,
        (
          1 -
          blob.size /
          currentFile.size
        ) * 100
      );


    resultInfo.textContent =
      `${formatBytes(
        currentFile.size
      )} → ${formatBytes(
        blob.size
      )} · ${reduction.toFixed(
        1
      )}% smaller`;


    const extension =
      extensionForMime(
        mime
      );


    const baseName =
      currentFile.name.replace(
        /\.[^/.]+$/,
        ""
      ) || "image";


    download.href =
      resultUrl;

    download.download =
      `${baseName}-compressed.${extension}`;


    result.hidden = false;


    result.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


  } catch (error) {

    console.error(error);

    showMessage(
      error.message ||
      "Compression failed. Please try another image.",
      "error"
    );

  } finally {

    compressButton.disabled =
      false;

    compressButton.textContent =
      "Compress Image";
  }
}


/* =========================
   FILE HANDLING
========================= */

async function handleFile(file) {

  clearMessage();

  result.hidden = true;


  if (!file) {
    return;
  }


  if (
    !isSupportedFile(file)
  ) {

    showMessage(
      "Please choose a valid image file.",
      "error"
    );

    return;
  }


  if (
    file.size >
    25 * 1024 * 1024
  ) {

    showMessage(
      "Please choose an image smaller than 25 MB.",
      "error"
    );

    return;
  }


  try {

    currentFile =
      file;

    currentImage =
      await loadImage(
        file
      );


    if (previewUrl) {

      URL.revokeObjectURL(
        previewUrl
      );
    }


    previewUrl =
      URL.createObjectURL(
        file
      );


    preview.src =
      previewUrl;


    fileName.textContent =
      file.name;


    originalInfo.textContent =
      `${currentImage.naturalWidth} × ${currentImage.naturalHeight} · ${formatBytes(file.size)}`;


    editor.hidden =
      false;


    editor.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


  } catch (error) {

    console.error(error);

    currentFile = null;
    currentImage = null;


    showMessage(
      error.message ||
      "Could not open this image.",
      "error"
    );
  }
}


/* =========================
   UPLOAD
========================= */

uploadButton.addEventListener(
  "click",
  () => {

    fileInput.click();
  }
);


fileInput.addEventListener(
  "change",
  event => {

    handleFile(
      event.target.files[0]
    );
  }
);


/* =========================
   DRAG & DROP
========================= */

[
  "dragenter",
  "dragover"
].forEach(
  eventName => {

    dropZone.addEventListener(
      eventName,
      event => {

        event.preventDefault();

        dropZone.classList.add(
          "dragging"
        );
      }
    );
  }
);


[
  "dragleave",
  "drop"
].forEach(
  eventName => {

    dropZone.addEventListener(
      eventName,
      event => {

        event.preventDefault();

        dropZone.classList.remove(
          "dragging"
        );
      }
    );
  }
);


dropZone.addEventListener(
  "drop",
  event => {

    handleFile(
      event.dataTransfer.files[0]
    );
  }
);


/* =========================
   QUALITY
========================= */

quality.addEventListener(
  "input",
  () => {

    qualityValue.textContent =
      formatPercent(
        Number(
          quality.value
        )
      );
  }
);


/* =========================
   FORMAT MESSAGE
========================= */

format.addEventListener(
  "change",
  () => {

    if (
      format.value === "png"
    ) {

      showMessage(
        "PNG does not use the JPEG/WebP quality setting. For smaller photo files, JPG or WebP is usually better.",
        "info"
      );

    } else {

      clearMessage();
    }
  }
);


/* =========================
   ACTIONS
========================= */

compressButton.addEventListener(
  "click",
  compressImage
);


newImage.addEventListener(
  "click",
  () => {

    fileInput.value = "";

    fileInput.click();
  }
);


/* =========================
   CLEANUP
========================= */

window.addEventListener(
  "beforeunload",
  () => {

    if (resultUrl) {

      URL.revokeObjectURL(
        resultUrl
      );
    }

    if (previewUrl) {

      URL.revokeObjectURL(
        previewUrl
      );
    }
  }
);
