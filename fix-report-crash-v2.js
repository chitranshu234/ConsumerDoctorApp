const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs', 'utils', 'report.js');

console.log('🔧 Fixing report.js...');

if (!fs.existsSync(filePath)) {
    console.error('❌ File not found');
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// The crash happens at ReportRNModule.reportEvent
// We need to replace it with optional chaining
// Pattern: ReportRNModule.reportEvent(event, params);

if (content.includes('ReportRNModule.reportEvent')) {
    content = content.replace(
        /ReportRNModule\.reportEvent/g,
        'ReportRNModule?.reportEvent'
    );
    console.log('✅ Replaced ReportRNModule.reportEvent with optional chaining');
} else if (content.includes('ReportRNModule?.reportEvent')) {
    console.log('⚠️ Already patched with optional chaining');
} else {
    console.log('⚠️ Pattern not found, dumping content for inspection:');
    console.log(content.substring(0, 500));
}

fs.writeFileSync(filePath, content, 'utf8');
