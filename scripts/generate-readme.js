// Generates README.md from the snippet files.
// Each snippet's body is rendered with placeholder defaults filled in,
// so the README shows what the snippet expands to.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const sections = [
  { file: "react.json", title: "React", files: ".jsx, .tsx", lang: "jsx", fileName: "MyComponent", indent: "  " },
  { file: "javascript.json", title: "JavaScript / TypeScript", files: ".js, .jsx, .ts, .tsx", lang: "js", fileName: "myModule", indent: "  " },
  { file: "css.json", title: "CSS", files: ".css, .scss, .less", lang: "css", fileName: "styles", indent: "  " },
  { file: "java.json", title: "Java", files: ".java", lang: "java", fileName: "Main", indent: "    " },
];

// ${1/(.*)/${1:/capitalize}/} -> tab stop, regex, format, flags
const TRANSFORM = /\$\{(\d+)\/([^/]*)\/((?:\$\{\d+:\/\w+\}|[^/])*)\/(\w*)\}/g;

function render(body, { fileName, indent }) {
  let text = [].concat(body).join("\n");
  text = text.replace(/\$\{TM_FILENAME_BASE\}|\$TM_FILENAME_BASE/g, fileName);

  // Default value of each tab stop, e.g. ${1:state} -> defaults[1] = "state"
  const defaults = {};
  for (const [, n, value] of text.matchAll(/\$\{(\d+):([^${}]*)\}/g)) defaults[n] ??= value;

  // Apply transforms to the tab stop's default value
  text = text.replace(TRANSFORM, (_, n, regex, format, flags) => {
    const match = new RegExp(regex, flags).exec(defaults[n] ?? "");
    if (!match) return "";
    return format.replace(/\$\{(\d+):\/(\w+)\}|\$(\d+)/g, (_, g, op, plain) => {
      const v = match[g ?? plain] ?? "";
      if (op === "capitalize") return v.charAt(0).toUpperCase() + v.slice(1);
      if (op === "upcase") return v.toUpperCase();
      if (op === "downcase") return v.toLowerCase();
      return v;
    });
  });
  // Resolve nested placeholders from the inside out: ${1:default} -> default
  let prev;
  do {
    prev = text;
    text = text.replace(/\$\{\d+:([^${}]*)\}/g, "$1");
  } while (text !== prev);
  text = text.replace(/\$\{\d+\|([^,|}]*)[^}]*\|\}/g, "$1"); // ${1|a,b|} -> a
  text = text.replace(/\$\{\d+\}|\$\d+/g, ""); // bare tab stops
  text = text.replace(/\t/g, indent);
  return text.replace(/[ ]+$/gm, "");
}

let md = `# Code Snippets

Clean, practical code snippets for React, JavaScript, TypeScript, CSS and Java.

## Contents

${sections.map((s) => `- [${s.title}](#${s.title.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/ /g, "-")}) (${s.files})`).join("\n")}
`;

for (const s of sections) {
  const snippets = JSON.parse(fs.readFileSync(path.join(root, "snippets", s.file), "utf8"));
  md += `\n## ${s.title}\n\nAvailable in: ${s.files}\n`;
  for (const [name, snip] of Object.entries(snippets)) {
    const prefixes = [].concat(snip.prefix).map((p) => `\`${p}\``).join(", ");
    md += `\n### ${prefixes} - ${name}\n\n${snip.description || ""}\n\n\`\`\`${s.lang}\n${render(snip.body, s)}\n\`\`\`\n`;
  }
}

md += `\n## License\n\n[MIT](LICENSE.md)\n`;

fs.writeFileSync(path.join(root, "README.md"), md);
console.log("README.md generated.");
