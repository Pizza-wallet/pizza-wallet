const brotli = require("brotli");
const fs = require("fs");

const brotliSettings = {
  extension: "br",
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 9, // 0 - 11,
  lgwin: 12, // default
};

fs.readdirSync("build/").forEach((file) => {
  if (
    file.endsWith(".js") ||
    file.endsWith(".css") ||
    file.endsWith(".html") ||
    file.endsWith(".svg") ||
    file.endsWith(".png") ||
    file.endsWith(".json")
  ) {
    const result = brotli.compress(
      fs.readFileSync("build/" + file),
      brotliSettings,
    );
    fs.writeFileSync("dist/" + file + ".br", result);
  }
});

fs.readdirSync("build/static/css").forEach((file) => {
  if (file.endsWith(".css")) {
    const result = brotli.compress(
      fs.readFileSync("build/static/css/" + file),
      brotliSettings,
    );
    fs.writeFileSync("dist/static/css/" + file + ".br", result);
  }
});

fs.readdirSync("build/static/js").forEach((file) => {
  if (file.endsWith(".js")) {
    const result = brotli.compress(
      fs.readFileSync("build/static/js/" + file),
      brotliSettings,
    );
    fs.writeFileSync("dist/static/js/" + file + ".br", result);
  }
});

fs.readdirSync("build/static/media").forEach((file) => {
  if (file.endsWith(".svg") || file.endsWith(".png")) {
    const result = brotli.compress(
      fs.readFileSync("build/static/media/" + file),
      brotliSettings,
    );
    fs.writeFileSync("dist/static/media/" + file + ".br", result);
  }
});
