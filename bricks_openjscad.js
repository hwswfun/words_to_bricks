var bricks = {"[0]":{"StartRow":4,"EndRow":4,"StartColumn":24,"EndColumn":28,"BrickSize":5},"[1]":{"StartRow":4,"EndRow":4,"StartColumn":7,"EndColumn":10,"BrickSize":4},"[2]":{"StartRow":6,"EndRow":6,"StartColumn":7,"EndColumn":10,"BrickSize":4},"[3]":{"StartRow":2,"EndRow":2,"StartColumn":7,"EndColumn":9,"BrickSize":3},"[4]":{"StartRow":2,"EndRow":2,"StartColumn":12,"EndColumn":14,"BrickSize":3},"[5]":{"StartRow":2,"EndRow":2,"StartColumn":25,"EndColumn":27,"BrickSize":3},"[6]":{"StartRow":6,"EndRow":6,"StartColumn":19,"EndColumn":21,"BrickSize":3},"[7]":{"StartRow":6,"EndRow":6,"StartColumn":25,"EndColumn":27,"BrickSize":3},"[8]":{"StartRow":2,"EndRow":2,"StartColumn":19,"EndColumn":20,"BrickSize":2},"[9]":{"StartRow":3,"EndRow":3,"StartColumn":0,"EndColumn":1,"BrickSize":2},"[10]":{"StartRow":6,"EndRow":6,"StartColumn":14,"EndColumn":15,"BrickSize":2},"[11]":{"StartRow":0,"EndRow":2,"StartColumn":0,"EndColumn":0,"BrickSize":3},"[12]":{"StartRow":4,"EndRow":6,"StartColumn":0,"EndColumn":0,"BrickSize":3},"[13]":{"StartRow":3,"EndRow":5,"StartColumn":13,"EndColumn":13,"BrickSize":3},"[14]":{"StartRow":3,"EndRow":5,"StartColumn":20,"EndColumn":20,"BrickSize":3},"[15]":{"StartRow":0,"EndRow":1,"StartColumn":13,"EndColumn":13,"BrickSize":2},"[16]":{"StartRow":2,"EndRow":2,"StartColumn":2,"EndColumn":2,"BrickSize":1},"[17]":{"StartRow":4,"EndRow":4,"StartColumn":2,"EndColumn":2,"BrickSize":1},"[18]":{"StartRow":1,"EndRow":1,"StartColumn":3,"EndColumn":3,"BrickSize":1},"[19]":{"StartRow":5,"EndRow":5,"StartColumn":3,"EndColumn":3,"BrickSize":1},"[20]":{"StartRow":0,"EndRow":0,"StartColumn":4,"EndColumn":4,"BrickSize":1},"[21]":{"StartRow":6,"EndRow":6,"StartColumn":4,"EndColumn":4,"BrickSize":1},"[22]":{"StartRow":5,"EndRow":5,"StartColumn":6,"EndColumn":6,"BrickSize":1},"[23]":{"StartRow":3,"EndRow":3,"StartColumn":10,"EndColumn":10,"BrickSize":1},"[24]":{"StartRow":5,"EndRow":5,"StartColumn":10,"EndColumn":10,"BrickSize":1},"[25]":{"StartRow":5,"EndRow":5,"StartColumn":16,"EndColumn":16,"BrickSize":1},"[26]":{"StartRow":0,"EndRow":0,"StartColumn":20,"EndColumn":20,"BrickSize":1},"[27]":{"StartRow":3,"EndRow":3,"StartColumn":24,"EndColumn":24,"BrickSize":1},"[28]":{"StartRow":5,"EndRow":5,"StartColumn":24,"EndColumn":24,"BrickSize":1},"[29]":{"StartRow":3,"EndRow":3,"StartColumn":28,"EndColumn":28,"BrickSize":1}};

var single_brick_width = 8.0; // 8.0
var brick_base_height = 0.2;   // 3.2
var pin_height = 1.9;					// 1.9
var pin_diameter = 4.8;				// 4.8
var margin = 0.4;             // spacing between bricks
var base_height=1.8;

function drawPin()
{
	var pin = cylinder({r: pin_diameter/2.0, h: pin_height, center:[true,true,false]});
	return pin.setColor(1,0,0);
}

function drawBrick(pins_x, pins_y)
{
	var x_size = pins_x*single_brick_width-margin;
	var y_size =  pins_y*single_brick_width-margin;

	var o = [];
	var brickBase = cube({size: [x_size,y_size,brick_base_height], center:false});
	o.push(brickBase);

	var x;
	var y;
	for (x = 1; x <= pins_x; x++) {
		for (y = 1; y <= pins_y; y++) {
			var pin_x = (x-0.5)*single_brick_width - margin/2.0;
			var pin_y = (y-0.5)*single_brick_width - margin/2.0;
			var pin = drawPin().translate([pin_x,pin_y,brick_base_height]);
	  	o.push(pin);
		}
	}
	return union(o);
}



function main () {
  var o = [];
 	var last_column=0;
	var last_row=0;

	for (var key in bricks) {
		if (last_column < bricks[key].EndColumn)
			last_column = bricks[key].EndColumn;
		if (last_row < bricks[key].EndRow)
			last_row = bricks[key].EndRow;
	}
	last_column++;				// rows and columns are 0 base index
	last_row++;

	// create and place each brick
	for (var key in bricks) {
      var sRow = bricks[key].StartRow;
			var eRow = bricks[key].EndRow;
			var sCol = bricks[key].StartColumn;
			var eCol = bricks[key].EndColumn;
			var brickSize = bricks[key].BrickSize;

			var brick = drawBrick(eCol-sCol+1, eRow-sRow+1);
			brick = brick.translate([sCol*single_brick_width,(last_row-eRow)*single_brick_width,0]);
			o.push(brick);
	}

	var base = cube({size: [(last_column+2)*single_brick_width,(last_row+2)*single_brick_width,-base_height], center: false}).setColor(0,0,1);
	o.push(base.translate([-single_brick_width,0,0]));

	return o;
}
