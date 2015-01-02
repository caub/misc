dic = [];
try {
	var req = new XMLHttpRequest();
	req.open('GET', 'liste_finale.txt', false); 
	req.send(null);

	if(req.status == 200){
		dic = req.responseText.split('\n');
	}
} catch (e){
	console.log(e);
}

var points={'e':1,'a':1,'i':1,'n':1,'o':1,'r':1,'s':1,'t':1,'u':1,'l':1,
		'd':2,'m':2,'g':2,
		'b':3,'c':3,'p':3,
		'f':4,'h':4,'v':4,
		'j':8,'q':8,
		'k':10,'w':10,'x':10,'y':10,'z':10};

var letters=['e','e','e','e','e','e','e','e','e','e','e','e','e','e','e',
             'a','a','a','a','a','a','a','a','a',
             'i','i','i','i','i','i','i','i',
             'n','n','n','n','n','n',
             'o','o','o','o','o','o',
             'r','r','r','r','r','r',
             's','s','s','s','s','s',
             't','t','t','t','t','t',
             'u','u','u','u','u','u',
             'l','l','l','l','l',
             'd','d','d',
             'm','m','m',
             'g','g',
             'b','b',
             'c','c',
             'p','p',
             'f','f',
             'h','h',
             'v','v',
             'j','q','k','w','x','y','z'];

var grid = [[undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined]];

// a 3x letter and a x2 letter at a random position
var x3 = [Math.floor(4*Math.random()), Math.floor(4*Math.random())];
var x2=x3;
while (x2[0]==x3[0] && x2[1]==x3[1]){
	x2 = [Math.floor(4*Math.random()), Math.floor(4*Math.random())];
}
             
document.addEventListener("DOMContentLoaded", function(event) { 
	var table= document.createElement("table");
	for (var i=0;i<4;i++){
		var row= document.createElement("tr");
		for (var j=0;j<4;j++){
			grid[j][i] = document.createElement("td");
			grid[j][i].id = i+""+j;
			if (j==x3[0] && i==x3[1]) grid[j][i].className="x3";
			else if (j==x2[0] && i==x2[1]) grid[j][i].className="x2";
			grid[j][i].innerHTML = letters.splice(Math.floor(letters.length*Math.random()),1)[0]
			row.appendChild(grid[j][i]);
		}
		table.appendChild(row);
	}
	document.body.appendChild(table);
	document.body.addEventListener("mouseup", mouseup, false); 
	document.body.addEventListener("mousedown", mousedown, false); 
	table.addEventListener("mousemove", mousemove, false); 
	
	document.body.addEventListener("touchstart", function(e){ mouseup({pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY}) }, false); 
	document.body.addEventListener("touchend", function(e){ mousedown({pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY}) }, false); 
	table.addEventListener("touchmove", function(e){ mousemove({pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY}) }, false); 
	
	var span = document.createElement("span");
});
var dragging=false;
var lastX=undefined, lastY=undefined;
var path=[];
var word = '';
var words= []; //words already found
function mouseup(e){
	dragging = false;
	for (var i=0;i<path.length;i++){
		grid[path[i][0]][path[i][1]].style.backgroundColor = "";
	}
	if (word && word.length>1 && words.indexOf(word)===-1 && dic.indexOf(word)!==-1){ //valid word
		//counts the points
		var pts = word.split('').reduce( function(pts, letter){return pts + points[letter]}, 0 )
		for (var i=path.length-1;i>=0;i--){
			if (path[i][0]==x3[0] && path[i][1]==x3[1])
				pts *=3;
			else if (path[i][0]==x2[0] && path[i][1]==x2[1])
				pts *=2;
		}
		document.getElementById("points").innerHTML = "+"+pts;
		document.getElementById("score").innerHTML = +document.getElementById("score").innerHTML + pts;
		words.push(word);
	}
	
	path = [];
	word='';
}
function mousedown(e){
	if(countdown==0) return;
	dragging = true;
	document.getElementById("points").innerHTML = "";
	lastX = Math.round((e.pageX-68)/100);
	lastY = Math.round((e.pageY-158)/100);
	path.push([lastX,lastY]);
	grid[lastX][lastY].style.backgroundColor = "yellow";
	word = document.getElementById("text").innerHTML = path.map(function (i){return grid[i[0]][i[1]].innerHTML} ).join('');
}
function mousemove(e){
	if(countdown==0) return;
	var x = Math.round((e.pageX-68)/100);
	var y = Math.round((e.pageY-158)/100);
	//console.log(e.pageX+" "+e.pageY);
	if (dragging && Math.abs(100*x+68 - e.pageX)<30 && Math.abs(100*y+158 - e.pageY)<30){
		//loop through path, if [x,y] is found, exit
		for (var i=path.length-1;i>=0;i--){
			if (path[i][0]==x && path[i][1]==y)
				return;
		}
		if((lastX!==x || lastY!==y) && Math.abs(lastX-x)<=1 && Math.abs(lastY-y)<=1 ){
			grid[x][y].style.backgroundColor = "yellow";
			lastX = x;
			lastY = y;
			path.push([lastX,lastY]);
			word = document.getElementById("text").innerHTML = path.map(function (i){return grid[i[0]][i[1]].innerHTML} ).join('');
		}
		
	}
}

var countdown=120;
var itv = setInterval(function(){if (--countdown==0) clearInterval(itv); var s=countdown%60;document.getElementById("time").innerHTML=(countdown-s)/60+':'+("0" + s).slice(-2)}, 1000)