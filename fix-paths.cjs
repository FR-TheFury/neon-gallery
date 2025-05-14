// fix-paths.js
const fs = require("fs");
const path = require("path");

const extensions = [".tsx", ".ts", ".jsx", ".js", ".html"];

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath, callback);
        } else {
            callback(fullPath);
        }
    });
}

walk("./src", file => {
    if (extensions.some(ext => file.endsWith(ext))) {
        let content = fs.readFileSync(file, "utf8");
        const updated = content
            .replace(/\/src\/image\//g, "/image/")
            .replace(/\/src\/music\//g, "/music/");
        if (updated !== content) {
            fs.writeFileSync(file, updated, "utf8");
            console.log("✔ Updated:", file);
        }
    }
});
