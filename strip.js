const fs = require('fs');
const path = require('path');

const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5Zb3VyIEltYWdlIEhlcmU8L3RleHQ+PC9zdmc+';

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fp = path.join(dir, file);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp);
    } else if (fp.endsWith('.tsx') || fp.endsWith('.ts')) {
      const content = fs.readFileSync(fp, 'utf8');
      
      // Replace Unsplash URLs
      let newContent = content.replace(/https:\/\/images\.unsplash\.com\/[^\"]+/g, placeholder);
      
      // Replace Lagos references
      newContent = newContent.replace(/Lagos's/g, 'Our');
      newContent = newContent.replace(/Lagos/gi, 'Location');
      
      if (content !== newContent) {
        fs.writeFileSync(fp, newContent);
        console.log(`Updated ${fp}`);
      }
    }
  }
}

walk(path.join(__dirname, 'src'));
console.log('Done replacing fake data!');
