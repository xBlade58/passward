// init
npm init
npm install nan bindings

//Compile using node-gyp
npm install -g node-gyp
node-gyp configure
node-gyp build

// In Electron do this

npm install passwardcrypto
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd

//Caesar cipher slightly modifed version of https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/