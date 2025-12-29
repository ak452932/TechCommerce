const fs   = require('fs').promises;
const path = require('path');

// Only expose this one folder—tweak as needed
const ROOT_DIR = process.env.SEARCH_ROOT || 'C:/Users/You/Documents';

async function findFiles(dir, query, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await findFiles(fullPath, query, results);
    } else if (entry.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

module.exports = { findFiles, ROOT_DIR };