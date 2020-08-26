
//array size
let col;
let row;
//canvas resolution
let xRes;
let yRes;
//arrays
let mainArr;
let secArr;
//pixelRes - resolution of one pixel
let pixelRes;
//stroke in canvas (0/255)
let interval;
let margin;

//canvas
var c;
var ctx;

//setup() - on page load
function setup(){
  c = document.getElementById("gameCanvas");
  ctx = c.getContext("2d");
  pixelRes = 10;
  interval = 250;
  margin = 10;
  xRes = getWidth()-margin;
  yRes = getHeight()-margin;
  //col = floor((getWidth()-margin)/100)*10;
  //row = floor((getHeight()-margin)/100)*10;
  col = Math.floor(xRes/10);
  row = Math.floor(yRes/10);
  mainArr = createArray(row, col);
  //secArr = createArray(row, col);
  mainArr = setArrayItems(mainArr);

  // Manual set
  // mainArr =  [[0,0,0,0,0,0,0,0,0,0],
  //           	[0,0,1,0,0,0,0,0,0,0],
  //           	[0,0,0,1,0,0,0,0,0,0],
  //           	[0,1,1,1,0,0,0,0,0,0],
  //           	[0,0,0,0,0,0,0,0,0,0],
  //             [0,0,0,0,0,0,0,0,0,0],
  //             [0,0,0,0,0,0,0,0,0,0],
  //             [0,0,0,0,0,0,0,0,0,0],
  //             [0,0,0,0,0,0,0,0,0,0],
  //           	[0,0,0,0,0,0,0,0,0,0]];

  c.width = xRes;
  c.height = yRes;
  // ctx.rect(0, 0, xRes, yRes);
  // ctx.fillStyle = "gray";
  // ctx.fill();
  setInterval(drawCanvas, interval);
  //drawCanvas();
}

function createArray(rows, cols){
	let array = new Array(rows);
	for(let i = 0; i < rows; i++){
		array[i] = new Array(cols);
	}
	return array;
}

function setArrayItems(array){
	for(let i=0; i<row; i++){
    for(let j=0; j<col; j++){
      array[i][j] = Math.round(Math.random(2));
    }
  }
  return array;
}

//  RULES
//  1: if dead and 3 live neighbors then alive
//  2: if alive and 2 or 3 neighbors then alive
function countNextStep(){
  secArr = createArray(row, col);
  for(let i=0; i<row; i++){
    for(let j=0; j<col; j++){
      let state = mainArr[i][j];
      let neighbors = countNeighbors(i, j);
      // 1:
      if(state == 0 && neighbors == 3){
        secArr[i][j] = 1;
      }
      // 2:
      else if(state == 1 && (neighbors == 2 || neighbors == 3)){
        secArr[i][j] = 1;
      }
      //else secArr[i][j] = state;
      else secArr[i][j] = 0;
    }
  }
  mainArr = secArr;
}

function countNeighbors(x, y){
  let neighbors = 0;
  // for(let i=x-1; i <= x+1; i++){
  //   for(let j=y-1; j <= y+1; j++){
  //     if(i== x && j == y){}
  //     else if(i> -1 && i<row && j> -1 && j<col) {
  //       if(mainArr[i][j] == 1){ 
  //         neighbors++;   
  //       }
  //     }   
  //   }
  // }
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // if ( i == 0 && j == 0){}
			// else if (typeof mainArr[x+i] !== 'undefined'
			// 	&& typeof mainArr[x+i][y+j] !== 'undefined'
			// 	&& mainArr[x+i][y+j]) {
			// 	neighbors++;
      //   }
      if(((x+i)> -1 && (x+i)<row) && ((y+j)> -1 && (y+j)<col)){
      //console.log('i:'+i+' j:'+j+' Nei:'+neighbors+' Arr:'+mainArr[x+i][y+j]+" xy=" + x+":"+y);
      neighbors += mainArr[x+i][y+j];
      }

      // let cols = (x + i + col) % col;
      // let rows = (y + j + row) % row;
      // neighbors += mainArr[cols][rows];

			}
    }
  neighbors -= mainArr[x][y];
  //console.log('Nei:'+ neighbors + " xy=" + x+":"+y);
  return neighbors;
}

function drawCanvas(){
  for(let i=0; i<row; i++){
    for(let j=0; j<col; j++){
      let x = i * pixelRes;
      let y = j * pixelRes;
      ctx.beginPath();
      if (mainArr[i][j] == 1) {
        ctx.fillStyle = 'black';
      }
      else{
        ctx.fillStyle = 'white';
      }
      ctx.rect(y, x, pixelRes, pixelRes);
      ctx.fill();
    }
  }
  countNextStep();
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}
