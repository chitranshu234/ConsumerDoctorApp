const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function searchDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            searchDir(fullPath);
        } else if (file.endsWith('.js')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('reportEvent')) {
                console.log(`Found in: ${fullPath}`);
                const lines = content.split('\n');
                lines.forEach((line, index) => {
                    if (line.includes('reportEvent')) {
                        console.log(`Line ${index + 1}: ${line.trim().substring(0, 100)}...`);
                    }
                });
            }
        }
    }
}

const targetDir = path.join(__dirname, 'node_modules', '@zegocloud', 'zego-uikit-rn', 'lib', 'commonjs');
console.log(`Searching in ${targetDir}...`);
try {
    searchDir(targetDir);
} catch (e) {
    console.error(e);
}
