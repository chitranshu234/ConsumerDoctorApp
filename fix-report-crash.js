const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs', 'utils', 'report.js');

console.log('🔧 Fixing report.js...');

if (!fs.existsSync(filePath)) {
    console.error('❌ File not found');
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Replace ZegoUIKitReport.reportEvent with optional chaining
// Also handle other potential methods like create
content = content.replace(/ZegoUIKitReport\.reportEvent/g, 'ZegoUIKitReport?.reportEvent');
content = content.replace(/ZegoUIKitReport\.create/g, 'ZegoUIKitReport?.create');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed! Applied optional chaining to ZegoUIKitReport methods');
