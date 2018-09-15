// todo embed this with puppeteer + configurable width, height
// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#elementhandleuploadfilefilepaths
var input=document.createElement('input');
input.type='file';
document.body.append(input);

await {then(r){input.addEventListener('change', r, {once: true})}};


var url=URL.createObjectURL(input.files[0])
var img = new Image();
img.src = url;
await {then(r){img.addEventListener('load', r, {once:true})}}
var canvas=document.createElement('canvas');
var ctx=canvas.getContext('2d');
canvas.width=canvas.height=256;
ctx.drawImage(img, 0, 0, 256, 256)

var a = document.createElement('a');
a.download=file.name.replace(/\.svg$/, '.png');
// a.url = canvas.toDataURL()
a.url = URL.createObjectURL(await {then(r){canvas.toBlob(r)}})
a.click()
