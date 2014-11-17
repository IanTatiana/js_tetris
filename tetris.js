var c = document.getElementById("canvas_id")
var ctx = c.getContext("2d")

var screen_width = 10, screen_height = 20;
var playing_field = new Array()
var size_el = 20

for (var i = 0; i < screen_width; i++){
	playing_field[i] = new Array();
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
	color: "magenta",
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
	color: "lime",
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
	color: "cyan",
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
	color: "orange",
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
	color: "blue",
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
var cur_figure = tetromino[idx], score = 0;

function DrawBackground(){
	ctx.clearRect(0, 0, screen_width, screen_height);
	ctx.fillStyle = "#333366";
	ctx.fillRect(0, 0, screen_height*size_el, screen_height*size_el);

	ctx.font = "30px Arial";
	ctx.strokeText("Score", screen_width*size_el + 50, 50);
	ctx.strokeText(score, screen_width*size_el + 50, 100);

	for (var i = 0; i < screen_width; i++){
		for (var j = 0; j < screen_height; j++){
			if (playing_field[i][j]){
				ctx.fillStyle = tetromino[playing_field[i][j] - 2].color;
			} else {
				if ((i + j) % 2 == 1)
					ctx.fillStyle = "#666";
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
var lines = [ 0, 0, 0, 0 ], lines_cnt = 0;
function CheckScore(){
	var cnt = 0;
	for (var i = 0; i < 4; i++){
		cnt = 0;
		for(var j = 0; j < screen_width; j++){
			if (playing_field[j][i + y] > 1){
				cnt++;
			}
		}
		if (cnt == screen_width){
			lines_cnt++;
			lines[i] = 1;
		}
	}
	switch (lines_cnt){
		case 1: score += 100; break;
		case 2: score += 300; break;
		case 3: score += 700; break;
		case 4: score += 1500; break;
	}
}

function DeleteLines(){
	for (var i = 0; i < 4; i++){
		if (lines[i]){
			for (var j = 0; j < screen_width; j++){
				playing_field[j][i + y] = 0;
			}
		}
	}
}

function DropBuilding(){
	for (var i = 0; i < 4; i++){
		if (lines[i]){
			for (var j = y + i; j > 0; j--){
				for (var k = 0; k < screen_width; k++){
					playing_field[k][j] = playing_field[k][j - 1];
				}
			}
		}
	}
}

function GoDown(){
	if (!IntersectionBottom(y + 1, type) && !Intersection(x, y + 1, type))
		y++
	else {
		PutFigure();
		CheckScore();
		DeleteLines();
		DropBuilding();
		idx = Math.floor(Math.random() * 7);
		type = 0; x = 3; y = 0; lines = [ 0, 0, 0, 0 ]; lines_cnt = 0;
		cur_figure = tetromino[idx];
	}
	DrawBackground();
	DrawFigure(type);
}

//-------------------------------------------------------------------
DrawBackground();
DrawFigure(type);
setInterval(GoDown, 1000);
