const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs', 'utils', 'report.js');

console.log('📖 Reading report.js...');
if (fs.existsSync(filePath)) {
    console.log(fs.readFileSync(filePath, 'utf8'));
} else {
    console.log('❌ File not found');
}
