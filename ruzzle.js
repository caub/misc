
 
var points={'e':1,'a':1,'i':1,'n':1,'o':1,'r':1,'s':1,'t':1,'u':1,'l':1,
		'd':2,'m':2,'g':2,
		'b':3,'c':3,'p':3,
		'f':4,'h':4,'v':4,
		'j':8,'q':8,
		'k':10,'w':10,'x':10,'y':10,'z':10};

var letters='eeeeeeeeeeeeeeeaaaaaaaaaiiiiiiiinnnnnnoooooorrrrrrssssssttttttuuuuuullllldddmmmggbbccppffhhvvjqkwxyz'.split('');

function randomWord(n){
	var w="";
	for (var i=0;i<n; i++){
		w+=letters[Math.floor(letters.length*Math.random())];
	}
	return w;
}

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
	//generate fake words for testing
	while (dic.length<1000){
		var w=randomWord(2+Math.floor(6*Math.random()));
		if (dic.indexOf(w)===-1)
			dic.push(w)
	}
	dic.sort()
}


// --- ruzzle ---
var grid = [];
for (var i=0;i<4; i++){
	var row=[];
	for (var j=0;j<4; j++){
		row.push(undefined);
	}
	grid.push(row);
}

// a 3x letter and a x2 letter at a random position
var x3 = [Math.floor(4*Math.random()), Math.floor(4*Math.random())];
var x2=x3;
while (x2[0]==x3[0] && x2[1]==x3[1]){
	x2 = [Math.floor(4*Math.random()), Math.floor(4*Math.random())];
}


window.onload = function(){ 
	
	ruzzle();
	
	ruzzleSolve();
};

function ruzzle(){
	var dragging=false;
	var lastX=undefined, lastY=undefined;
	var path=[];
	var word = '';
	var words= []; //words already found
	
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
	
	var firstCell = table.children[0].children[0];
	var startX = getOffset(table.children[0].children[0]).left + table.children[0].children[0].offsetWidth/2;
	var startY = getOffset(table.children[0].children[0]).top + table.children[0].children[0].offsetWidth/2;
	var cellSize = getOffset( table.children[0].children[1] ).left-getOffset( table.children[0].children[0]).left;
	
	function mouseup(e){
		dragging = false;
		for (var i=0;i<path.length;i++){
			grid[path[i][0]][path[i][1]].style.backgroundColor = "";
		}
		var inWord = words.indexOf(word);
		var inDic = dic.indexOf(word)
		if (word.length>1) {
			if (inWord===-1 && inDic!==-1){ //valid word
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
				document.getElementById('audiosuccess').play();
			}else if (words.indexOf(word)!==-1){
				document.getElementById('audiodone').play();
			}else if (inDic === -1){
				document.getElementById('audiofail').play();
			}
		}
			//counts the points
			
		
		path = [];
		word='';
	}
	
	
	function mousedown(e){
		if(countdown==0) return;
		dragging = true;
		document.getElementById("points").innerHTML = "";
		lastX = Math.round((e.pageX-startX)/cellSize);
		lastY = Math.round((e.pageY-startY)/cellSize);
		if (lastX>=0 && lastX<grid.length && lastY>=0 && lastY<grid.length){
			path.push([lastX,lastY]);
			grid[lastX][lastY].style.backgroundColor = "yellow";
			word = document.getElementById("text").innerHTML = path.map(function (i){return grid[i[0]][i[1]].innerHTML} ).join('');
		}
	}
	function mousemove(e){
		if(countdown==0) return;
		var x = Math.round((e.pageX-startX)/cellSize);
		var y = Math.round((e.pageY-startY)/cellSize);
		//console.log(e.pageX+" "+e.pageY);
		if (dragging && Math.abs(cellSize*x+startX - e.pageX)<30 && Math.abs(cellSize*y+startY - e.pageY)<30){
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
}

function getOffset( el ) {
    var x = 0;
    var y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: y, left: x };
}

//--- ruzzle solver -------
function addToTrie(trie, w){
	for (var i=0;i<w.length;i++){
		if (!(w.charAt(i) in trie)){
			trie[w.charAt(i)]={};
		}
		trie = trie[w.charAt(i)];
	}
	trie[null]=null;//end of word marker
}
function ruzzleSolve(){
	Trie = {};
	for (var i=0;i<dic.length;i++){
		addToTrie(Trie, dic[i]);
	}

	words = [];
	wordPoints = [];
	function findAllWords(p, trie, path){
		w = "";
		for (var i=0;i<path.length;i++){
			w+=grid[path[i][0]][path[i][1]].innerHTML;
		}
		if (null in trie && path.length>=2){ //we found a valid word
			
			var pts = w.split('').reduce( function(pts, letter){return pts + points[letter]}, 0 )
			for (var i=path.length-1;i>=0;i--){
				if (path[i][0]==x3[0] && path[i][1]==x3[1])
					pts *=3;
				else if (path[i][0]==x2[0] && path[i][1]==x2[1])
					pts *=2;
			}
			var ind = words.indexOf(w);
			if (ind!=-1){
				if (wordPoints[ind]<pts){// replace former word score with a better score
					wordPoints.splice(ind, 1, pts);
				}
			} else {
				words.push(w);
				wordPoints.push(pts);
			}
		}
		var i=p[0], j=p[1];
		var c = grid[i][j].innerHTML;
		if (c in trie){
			for (var _i=-1;_i<=1; _i++){
				for (var _j=-1;_j<=1; _j++){ // all adjacent cells to (i,j)
					if (!(_i==0&&_j==0) && i+_i>=0 && i+_i<grid.length && j+_j>=0 && j+_j<grid.length){
						var inPath=false;
						for (var e=path.length-1;e>=0;e--){
							if (path[e][0]==i && path[e][1]==j)
								inPath=true;
						}
						if (!inPath)
							findAllWords([i+_i, j+_j], trie[c], path.concat([p]))
					}
				}
			}
		}
	}
	for (var i=0;i<4; i++){
		for (var j=0;j<4; j++){
			findAllWords([i,j], Trie, []);
		}
	}
	var wordByPoints =  words.map(function (e, i) {
	    return [words[i], wordPoints[i]];
	});
	wordByPoints.sort(function(a,b){return b[1]-a[1]});
	log.innerHTML = wordByPoints.join('<br>');
}

