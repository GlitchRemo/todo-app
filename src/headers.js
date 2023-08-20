const MIME_TYPES = {
  html: "text/html",
  jpg: "image/jpeg",
  css: "text/css",
  pdf: "application/pdf",
  gif: "image/gif",
  js: "text/javascript",
  plain: "text/plain",
  ico: "image/vnd.microsoft.icon",
};

const getHeaders = (url) => {
  const extension = url.split(".").pop();

  const headers = {
    html: { "Content-Type": MIME_TYPES.html },
    jpg: { "Content-Type": MIME_TYPES.jpg },
    css: { "Content-Type": MIME_TYPES.css },
    gif: { "Content-Type": MIME_TYPES.gif },
    js: { "Content-Type": MIME_TYPES.js },
    ico: { "Content-Type": MIME_TYPES.ico },
    pdf: {
      "Content-Type": MIME_TYPES.pdf,
      "Content-Disposition": "attachment",
    },
  };

  return headers[extension];
};

module.exports = { getHeaders };
