const fs = require('fs');
const file = 'c:/Users/cixos/Desktop/youtube/devlearn---programación-full-stack/src/data/courseContent.ts';
let content = fs.readFileSync(file, 'utf8');

// The objects look like:
//   {
//     id: 'html-1.5',
//     type: 'development',
//     title: 'Proyecto: Página web de portafolio personal',
//     duration: '90 min',
//     videoId: 'hvi3J3yBRXI',
//     driveLink: DRIVE,
//     instructions: [
//       ...
//     ],
//   },
content = content.replace(/\{\s*id:\s*['"][^'"]+['"],\s*type:\s*['"]development['"][\s\S]*?\},?\n?\s*/g, '');

fs.writeFileSync(file, content);
console.log('Cleaned courseContent.ts');
