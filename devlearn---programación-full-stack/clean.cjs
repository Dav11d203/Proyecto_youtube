const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/cixos/Desktop/youtube/devlearn---programación-full-stack/src/courses_content';
const files = fs.readdirSync(dir).filter(f => f.endsWith('Content.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to remove development lessons
  content = content.replace(/\{\s*id:\s*['"][^'"]+['"],\s*type:\s*['"]development['"][\s\S]*?\},?\n?\s*/g, '');
  
  // Regex to remove Phase Practica references in the UI
  content = content.replace(/<div className="[^"]*">\s*<h4 className="[^"]*">Fase Práctica<\/h4>[\s\S]*?<\/div>\s*/g, '');

  fs.writeFileSync(filePath, content);
});

console.log('Done cleaning practical classes');
