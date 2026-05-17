const { execSync } = require('child_process');

try {
  execSync('npx tailwindcss -i ./src/styles.css -o ./src/styles.css --minify', { stdio: 'inherit' });
} catch (e) {}
