// Validates snippet files referenced in package.json:
// - each file parses as JSON
// - each snippet has a prefix and a body
// - no prefix is defined twice for the same language
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const errors = [];
const prefixesByLanguage = {};
const cache = {};

for (const { language, path: rel } of pkg.contributes.snippets) {
  const file = path.join(root, rel);
  if (!(rel in cache)) {
    try {
      cache[rel] = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e) {
      errors.push(`${rel}: ${e.message}`);
      cache[rel] = null;
    }
  }
  const snippets = cache[rel];
  if (!snippets) continue;

  const seen = (prefixesByLanguage[language] ??= {});
  for (const [name, s] of Object.entries(snippets)) {
    if (!s.prefix) errors.push(`${rel} "${name}": missing prefix`);
    if (s.body === undefined) errors.push(`${rel} "${name}": missing body`);
    // Transform formats like ${1:/capitalize} refer to regex capture groups,
    // not tab stops. Flag any reference to a group the regex doesn't have.
    const body = [].concat(s.body || []).join("\n");
    for (const [, regex, format] of body.matchAll(/\$\{\d+\/([^/]*)\/((?:\$\{\d+:\/\w+\}|[^/])*)\/\w*\}/g)) {
      const groups = new RegExp(regex + "|").exec("").length - 1;
      for (const [, g, plain] of format.matchAll(/\$\{(\d+):\/\w+\}|\$(\d+)/g)) {
        const n = Number(g ?? plain);
        if (n > groups) errors.push(`${rel} "${name}": transform uses capture group ${n} but /${regex}/ has only ${groups}`);
      }
    }
    for (const p of [].concat(s.prefix || [])) {
      if (seen[p]) errors.push(`[${language}] prefix "${p}" defined in ${seen[p]} and ${rel} ("${name}")`);
      else seen[p] = `${rel} ("${name}")`;
    }
  }
}

if (errors.length) {
  // A snippet file registered for several languages would repeat its errors
  console.error([...new Set(errors)].join("\n"));
  process.exit(1);
}
console.log("All snippets valid.");
