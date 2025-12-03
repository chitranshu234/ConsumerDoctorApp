const fs = require('fs');
const path = require('path');

// Revert kitlogger patch and use safer approach
const filePath = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs', 'utils', 'kitlogger.js');

console.log('🔧 Reverting kitlogger patch...');

if (!fs.existsSync(filePath)) {
    console.error('❌ File not found');
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Instead of commenting out, wrap in try-catch
content = content.replace(
    /\/\/ LogRNModule\.logInfo \(patched - SDK bug fix\)/g,
    'LogRNModule?.logInfo'
);

// If that didn't work, add optional chaining
if (!content.includes('LogRNModule?.logInfo')) {
    content = content.replace(
        /LogRNModule\.logInfo/g,
        'LogRNModule?.logInfo'
    );
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed! Using optional chaining instead of commenting out');
