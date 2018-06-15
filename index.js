const fs = require('fs');
const path = require('path');

const spue = require('spue');
const phantasm = require('phantasm');
const graboid = require('graboid');

module.exports = function(options){

  if(options.generate){

    if(!options.step) options.step = 1;

    spue({input: options.file}, function(err, data){
      const content = JSON.parse(fs.readFileSync(path.join(__dirname,'creamy.json')).toString());
      const letterIndex = content.data.length + 97;

      if(letterIndex > 122) throw new Error('Error: ran out of letters; I repeat, all letter slots are taken.')

      const id = String.fromCharCode(letterIndex);
      const name = path.basename(options.file, '.png');
      const background = data[0];
      const shadows = [];


      graboid(16, data).forEach(function(color,index){
        shadows.push({"offsetX":0, "offsetY":0, "blurRadius":0, "spreadRadius":index*options.step+1, color});
      })

      let item  = { id, name, background, shadows, };
      content.data.push(item);

      console.log(JSON.stringify(content, null, '  '))
    });

  } else if(options.merge){

    spue({input: options.file}, function(err, data){
      const content = JSON.parse(fs.readFileSync(path.join(__dirname,'creamy.json')).toString());
      const selected = content.data.filter(i=>i.id.match(options.into))
      selected.forEach(i=>{
        i.shadows.forEach(function(i,n){
          i.color = data[n]
        })
      });

      console.log(JSON.stringify(content, null, '  '))
    });

  }else{
    const content = JSON.parse(fs.readFileSync(path.join(__dirname,'creamy.json')).toString());
    const interpolated = content.data.map(i=>phantasm(i, content.meta)).join("\n");
    console.log(interpolated);
  }



}
