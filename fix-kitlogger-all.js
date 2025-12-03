const fs = require('fs');
const path = require('path');

// Revert kitlogger patch and use safer approach for ALL log methods
const filePath = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs', 'utils', 'kitlogger.js');

console.log('🔧 Fixing ALL kitlogger methods...');

if (!fs.existsSync(filePath)) {
    console.error('❌ File not found');
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Replace ALL occurrences of LogRNModule.log* with optional chaining
content = content.replace(/LogRNModule\.logInfo/g, 'LogRNModule?.logInfo');
content = content.replace(/LogRNModule\.logError/g, 'LogRNModule?.logError');
content = content.replace(/LogRNModule\.logWarning/g, 'LogRNModule?.logWarning');

// Also handle cases where we might have already patched or commented out
content = content.replace(/\/\/ LogRNModule\.logInfo \(patched - SDK bug fix\)/g, 'LogRNModule?.logInfo');

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed! Applied optional chaining to logInfo, logError, and logWarning');
