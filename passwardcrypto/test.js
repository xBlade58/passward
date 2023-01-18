const assert = require('assert');
const { encrypt, decrypt } = require('./');

var l = encrypt("Helloa")

console.log(`native addon encrypt: ${l}`)

for (let i = 0; i < 6; i++) {
  console.log(`native addon decrypt: ${decrypt(l)}`)
}