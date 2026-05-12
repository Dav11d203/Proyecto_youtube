const fs = require('fs');
const path = require('path');

const file = 'c:/Users/cixos/Desktop/youtube/devlearn---programación-full-stack/src/pages/CourseDetail.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove uploadProject function
content = content.replace(/async function uploadProject[\s\S]*?setSaving\(null\);\n  }\n/g, '');

// Remove desarrolloLessons var
content = content.replace(/const desarrolloLessons = [^\n]*\n/g, '');

// Remove "isTheory" check and instructions logic
// Because it's complex JSX, I will use replace_file_content to replace the JSX carefully,
// or I can just leave isTheory as a constant: const isTheory = true; and the JSX will just render the truthy branch. 
fs.writeFileSync(file, content);
