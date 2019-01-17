

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
