const fs = require('fs');
const path = require('path');

console.log('🔧 Starting comprehensive Zego SDK patch...');

// 1. Fix kitlogger.js
const kitloggerPath = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs', 'utils', 'kitlogger.js');
if (fs.existsSync(kitloggerPath)) {
    let content = fs.readFileSync(kitloggerPath, 'utf8');
    let original = content;
    
    content = content.replace(/LogRNModule\.logInfo/g, 'LogRNModule?.logInfo');
    content = content.replace(/LogRNModule\.logError/g, 'LogRNModule?.logError');
    content = content.replace(/LogRNModule\.logWarning/g, 'LogRNModule?.logWarning');
    
    // Fix any double optional chaining or other artifacts
    content = content.replace(/LogRNModule\?\.\?/g, 'LogRNModule?.');

    if (content !== original) {
        fs.writeFileSync(kitloggerPath, content, 'utf8');
        console.log('✅ Patched kitlogger.js (logInfo/Error/Warning)');
    } else {
        console.log('⚠️ kitlogger.js already patched or no changes needed');
    }
} else {
    console.error('❌ kitlogger.js not found');
}

// 2. Fix report.js
const reportPath = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs', 'utils', 'report.js');
if (fs.existsSync(reportPath)) {
    let content = fs.readFileSync(reportPath, 'utf8');
    let original = content;

    // Fix reportEvent
    content = content.replace(/ReportRNModule\.reportEvent/g, 'ReportRNModule?.reportEvent');
    content = content.replace(/ZegoUIKitReport\.reportEvent/g, 'ZegoUIKitReport?.reportEvent');
    
    // Fix create - this is the new crash
    content = content.replace(/ZegoUIKitReport\.create/g, 'ZegoUIKitReport?.create');
    content = content.replace(/ReportRNModule\.create/g, 'ReportRNModule?.create');

    // Fix double optional chaining
    content = content.replace(/ReportRNModule\?\.\?/g, 'ReportRNModule?.');
    content = content.replace(/ZegoUIKitReport\?\.\?/g, 'ZegoUIKitReport?.');

    if (content !== original) {
        fs.writeFileSync(reportPath, content, 'utf8');
        console.log('✅ Patched report.js (reportEvent/create)');
    } else {
        console.log('⚠️ report.js already patched or no changes needed');
    }
} else {
    console.error('❌ report.js not found');
}

console.log('🏁 Patching complete. Now run patch-package.');
