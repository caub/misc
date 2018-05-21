const numberToRawBinary = n => { // IEEE754 binary format
  const data = new DataView(new ArrayBuffer(8));
  data.setFloat64(0, n);
  return Array.from(new Uint8Array(data.buffer), x =>
    x.toString(2).padStart(8, 0)
  ).join('');
};

console.log(numberToRawBinary(7));


// other fun things with DataView:
var d = new DataView(new ArrayBuffer(4));
var b32 = new Uint32Array(d.buffer);
var b8 = new Uint8Array(d.buffer);

b8[0] = 0xfe;
b8[1] = 0x54;
b8[2] = 0x76;
console.log(b32[0] === b8[0] + (b8[1] << 8) + (b8[2] << 16));

d.setUint32(0, 0xfc5356);
console.log(d.getUint8(1) === 0xfc, d.getUint8(2) === 0x53, d.getUint8(3) === 0x56);
console.log(b8[1] === 0xfc, b8[2] === 0x53, b8[3] === 0x56);
