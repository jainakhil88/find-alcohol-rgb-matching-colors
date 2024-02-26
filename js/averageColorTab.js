var colorFamilies = {
  "":"Black",
  "B":"Blue",
  "PB":"Blue",
  "MG":"Grey",
  "V":"Violet",
  "BGII":"Grey",
  "BG":"Grey",
  "G":"Green",
  "CG":"Cool Grey",
  "GG":"Green Grey",
  "E":"Earth",
  "BV":"Blue Violet",
  "R":"Red",
  "CGII":"Cool Grey",
  "C":"Cool Grey",
  "Y":"Yellow",
  "YR":"Yellow Red",
  "BR":"Brown",
  "YG":"Yellow Green",
  "FB":"Fluorescent",
  "FBG":"Fluorescent",
  "FRV":"Fluorescent",
  "FY":"Fluorescent",
  "FV":"Fluorescent",
  "FYG":"Fluorescent",
  "FYR":"Fluorescent",
  "GY":"Green Yellow",
  "N":"Neutral Grey",
  "NG":"Neutral Grey",
  "WG":"Warm Grey",
  "RV":"Red Violet",
  "P":"Purple",
  "RP":"Red Purple",
  "T":"Toner Grey",
  "RG":"Red Grey",
  "W":"Warm Grey"
};
let letters = new Set();
function getAvgRGBColor(file) {
    var element = document.createElement('div');
    element.className = 'row';
    element.innerHTML =
      '<div class="cell image">' +
      '  <img />' +
      '</div>' +
      '<div class="cell color">' +
      '  <div class="box"></div>' +
      '  <ul>' +
      '    <li class="rgb"></li>' +
      '    <li class="hex"></li>' +
      '    <li class="hsl"></li>' +
      '  </ul>' +
      '</div>';
  
    var img = element.querySelector('img');
    img.src = URL.createObjectURL(file);
    var rgbStr;

    img.onload = function() {
      var rgb = getAverageColor(img);
      rgbStr = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';      
    //   console.log("inside "+rgbStr);
    //   return rgbStr;
      var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      var rgbStr = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
      var hexStr = '#' + ('0'+rgb.r.toString(16)).slice(-2) + ('0'+rgb.g.toString(16)).slice(-2) + ('0'+rgb.b.toString(16)).slice(-2);
      var hslStr = 'hsl(' + Math.round(hsl.h * 360) + ', ' + Math.round(hsl.s * 100) + '%, ' + Math.round(hsl.l * 100) + '%)';
      
      //split 
      let colorNames=file.name.split("_");

      //remove extension
      colorNames[1] = colorNames[1].replace(/\.[^/.]+$/, "");
      
      let copicColorFamily=colorNames[0].match("(\\D*)");
      let ohuhuColorFamily=colorNames[1].match("(\\D*)");

      // console.log("copicColorFamily ",copicColorFamily);
      // console.log("ohuhuColorFamily ",ohuhuColorFamily);

      //especially for color
      // if(copicColorFamily[0].length == 0 ){
      //   copicColorFamily[0] = "Black";
      // }

      // if(ohuhuColorFamily[0].length == 0 ){
      //   ohuhuColorFamily[0] = "Black";
      // }


      letters.add(copicColorFamily[0]);
      letters.add(ohuhuColorFamily[0]);

      item = {}
      item ["file_name"] = file.name;
      item ["copic_code"] = colorNames[0];
      item ["ohuhu_code"] = colorNames[1];
      item ["copic_color_name"] = copicColorNames[colorNames[0]];
      item ["ohuhu_color_name"] = ohuhuColorNames[colorNames[1]];
      item ["copic_color_family"] = colorFamilies[copicColorFamily[0]];
      item ["ohuhu_color_family"] = colorFamilies[ohuhuColorFamily[0]];
      item ["rgb"] = rgbStr;
      item ["hex"] = hexStr;
      item ["hsl"] = hslStr;
      console.log(JSON.stringify(item));
    //   var box = element.querySelector('.box');
    //   box.style.backgroundColor = rgbStr;
  
    //   element.querySelector('.rgb').textContent = rgbStr;
    //   element.querySelector('.hex').textContent = hexStr;
    //   element.querySelector('.hsl').textContent = hslStr;
    };    
    // document.getElementById('images').appendChild(element);
}

function addImage(file) {
    var element = document.createElement('div');
    element.className = 'row';
    element.innerHTML =
      '<div class="cell image">' +
      '  <img />' +
      '</div>' +
      '<div class="cell color">' +
      '  <div class="box"></div>' +
      '  <ul>' +
      '    <li class="rgb"></li>' +
      '    <li class="hex"></li>' +
      '    <li class="hsl"></li>' +
      '  </ul>' +
      '</div>';
  
    var img = element.querySelector('img');
    img.src = URL.createObjectURL(file);
    img.onload = function() {
      var rgb = getAverageColor(img);
      var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      var rgbStr = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
      var hexStr = '#' + ('0'+rgb.r.toString(16)).slice(-2) + ('0'+rgb.g.toString(16)).slice(-2) + ('0'+rgb.b.toString(16)).slice(-2);
      var hslStr = 'hsl(' + Math.round(hsl.h * 360) + ', ' + Math.round(hsl.s * 100) + '%, ' + Math.round(hsl.l * 100) + '%)';
  
      var box = element.querySelector('.box');
      box.style.backgroundColor = rgbStr;
  
      element.querySelector('.rgb').textContent = rgbStr;
      element.querySelector('.hex').textContent = hexStr;
      element.querySelector('.hsl').textContent = hslStr;
    };
  
    document.getElementById('images').appendChild(element);
  }
  
  function getAverageColor(img) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = img.naturalWidth;
    var height = canvas.height = img.naturalHeight;
  
    ctx.drawImage(img, 0, 0);
  
    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    var r = 0;
    var g = 0;
    var b = 0;
  
    for (var i = 0, l = data.length; i < l; i += 4) {
      r += data[i];
      g += data[i+1];
      b += data[i+2];
    }
  
    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));
  
    return { r: r, g: g, b: b };
  }
  
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return { h: h, s: s, l: l };
  }
  
//   function handleImages(files) {
//     document.getElementById('images').innerHTML = '';
  
//     for (var i = 0; i < files.length; i++) {
//       addImage(files[i]);
//     }
//   }
  
//   document.ondragover = function(event) {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'copy';
//   };
  
//   document.ondrop = function(event) {
//     event.preventDefault();
//     handleImages(event.dataTransfer.files);
//   };
  
//   (function() {
//     var upload = document.getElementById('upload');
//     var target = document.getElementById('target');
  
//     upload.onchange = function() {
//       handleImages(this.files);
//     };
  
//     target.onclick = function() {
//       upload.click();
//     };
//   })();