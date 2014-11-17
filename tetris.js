var c = document.getElementById("canvas_id")
var ctx = c.getContext("2d")

var screen_width = 10, screen_height = 20;
var playing_field = new Array(screen_width)
var size_el = 20

for (var i = 0; i < screen_width; i++){
	playing_field[i] = new Array(screen_height);
	for (var j = 0; j < screen_height; j++){
		playing_field[i][j] = 0;  //  Initialization;
	}
}

/*  Tetrominos  */
var tetromino = [];

tetromino[0] = {
	name:  "O",
	color: "yellow",
	cnt:   1,
	forms: [ [ [ 0, 1, 1, 0 ],
		   [ 0, 1, 1, 0 ],
		   [ 0, 0, 0, 0 ],
		   [ 0, 0, 0, 0 ] ] ] }

tetromino[1] = {
	name:  "I",
	color: "red",
	cnt:   2,
	forms: [ [ [ 0, 0, 0, 0 ],
		   [ 1, 1, 1, 1 ],
		   [ 0, 0, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ] ] ] }

tetromino[2] = {
	name:  "S",
	color: "#33CC00",
	cnt:   2,
	forms: [ [ [ 0, 0, 0, 0 ],
		   [ 0, 1, 1, 0 ],
		   [ 1, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 1, 0, 0 ],
		   [ 0, 1, 1, 0 ],
		   [ 0, 0, 1, 0 ],
		   [ 0, 0, 0, 0 ] ] ] }

tetromino[3] = {
	name:  "Z",
	color: "#6633CC",
	cnt:   2,
	forms: [ [ [ 0, 0, 0, 0 ],
		   [ 1, 1, 0, 0 ],
		   [ 0, 1, 1, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 0, 1, 0 ],
		   [ 0, 1, 1, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ] ] }

tetromino[4] = {
	name:  "T",
	color: "#3399FF",
	cnt:   4,
	forms: [ [ [ 0, 1, 0, 0 ],
		   [ 1, 1, 1, 0 ],
		   [ 0, 0, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 1, 0, 0 ],
		   [ 0, 1, 1, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 0, 0, 0 ],
		   [ 1, 1, 1, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 1, 0, 0 ],
		   [ 1, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ] ] }

tetromino[5] = {
	name:  "L",
	color: "#FF9900",
	cnt:   4,
	forms: [ [ [ 0, 0, 0, 0 ],
		   [ 1, 1, 1, 0 ],
		   [ 1, 0, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 1, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 0, 1, 0 ],
		   [ 1, 1, 1, 0 ],
		   [ 0, 0, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],
		
		 [ [ 0, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 1, 1, 0 ],
		   [ 0, 0, 0, 0 ] ] ] }

tetromino[6] = {
	name:  "J",
	color: "#003399",
	cnt:   4,
	forms: [ [ [ 1, 0, 0, 0 ],
		   [ 1, 1, 1, 0 ],
		   [ 0, 0, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 1, 1, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ],

		 [ [ 0, 0, 0, 0 ],
		   [ 1, 1, 1, 0 ],
		   [ 0, 0, 1, 0 ],
		   [ 0, 0, 0, 0 ] ],
		
		 [ [ 0, 1, 0, 0 ],
		   [ 0, 1, 0, 0 ],
		   [ 1, 1, 0, 0 ],
		   [ 0, 0, 0, 0 ] ] ] }

//--------------------------------------------

var x = 3, y = 0, type = 0, idx = Math.floor(Math.random() * 7);
var cur_figure = tetromino[idx];

function DrawBackground(){
	ctx.clearRect(0, 0, screen_width, screen_height);
	for (var i = 0; i < screen_width; i++){
		for (var j = 0; j < screen_height; j++){
			if (playing_field[i][j]){
				ctx.fillStyle = tetromino[playing_field[i][j] - 2].color;
			} else {
				if ((i + j) % 2 == 1)
					ctx.fillStyle = "#000";
				else
					ctx.fillStyle = "#333";
			}
			ctx.fillRect(i*size_el, j*size_el, size_el, size_el);
		}
	}
}

function IntersectionRight(kx, k){
	/*  Check right border  */
	if (kx > screen_width - 4){
		for (var i = 0; i < 4; i++){
			for (var j = screen_width - kx; j < 4; j++){
				if (cur_figure.forms[k][i][j]){
					return 1;
				}
			}
		}
	}
	return 0;
}

function IntersectionLeft(kx, k){
	/*  Check left border  */
	if (kx < 0){
		for (var i = 0; i < 4; i++){
			for (var j = 0; j < 0-kx; j++){
				if (cur_figure.forms[k][i][j]){
					return 1;
				}
			}
		}
	}
	return 0;
}

function IntersectionBottom(ky, k){
	/*  Check bottom border */
	if (ky > screen_height - 4){
		for (var i = screen_height - ky; i < 4; i++){
			for (var j = 0; j < 4; j++){
				if (cur_figure.forms[k][i][j]){
					return 1;
				}
			}
		}
	}
	return 0;
}

function Intersection(kx, ky, k){
	for (var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if (cur_figure.forms[k][i][j] && playing_field[kx + j][ky + i])
				return 1;
		}
	}
	return 0;
}

function DrawFigure(k){
	ctx.fillStyle = cur_figure.color;
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++)
			if (cur_figure.forms[k][i][j])
				ctx.fillRect((j + x)*size_el, (i + y)*size_el, size_el, size_el);
}

document.onkeydown = function OnKeyDown(event){
		var keycode;
		if(!event) var event = window.event
		if (event.keyCode) keycode = event.keyCode // IE
		else if(event.which) keycode = event.which // all browsers

		switch (keycode){
			case 39:
				if (!IntersectionRight(x + 1, type) && !Intersection(x + 1, y, type))
					x++; break;
			case 37:
				if (!IntersectionLeft(x - 1, type) && !Intersection(x - 1, y, type))
					x--; break;
			case 38:
				if (!IntersectionRight(x, (type + 1) % cur_figure.cnt) &&
				    !IntersectionLeft(x, (type + 1) % cur_figure.cnt) &&
				    !IntersectionBottom(y, (type + 1) % cur_figure.cnt) &&
				    !Intersection(x, y, (type + 1) % cur_figure.cnt))
					type = (type + 1) % cur_figure.cnt; break;
			case 40:
				if (!IntersectionBottom(y + 1, type) && !Intersection(x, y + 1, type))
					y++; break;
		}
		ctx.clearRect(0, 0, screen_width, screen_height);
		DrawBackground();
		DrawFigure(type);
	}

function PutFigure(){
	for (var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if (cur_figure.forms[type][j][i])
				playing_field[x + i][y + j] = idx + 2;
		}
	}
}

function GoDown(){
	if (!IntersectionBottom(y + 1, type) && !Intersection(x, y + 1, type))
		y++
	else {
		PutFigure();
		idx = Math.floor(Math.random() * 7);
		type = 0; x = 3; y = 0;
		cur_figure = tetromino[idx];
	}
	DrawBackground();
	DrawFigure(type);
}
//-------------------------------------------------------------------
DrawBackground();
DrawFigure(type);
setInterval(GoDown, 1000);
