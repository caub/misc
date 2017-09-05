
 
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

var audioSuccess = new Audio("success.mp3");
var audioFail = new Audio("fail.mp3");
var audioDone = new Audio("done.mp3");


// --- ruzzle ---

// a 3x letter and a x2 letter at a random position
var x3 = [Math.floor(4*Math.random()), Math.floor(4*Math.random())];
var x2=x3;
while (x2[0]==x3[0] && x2[1]==x3[1]){
	x2 = [Math.floor(4*Math.random()), Math.floor(4*Math.random())];
}


fetch('liste_finale.txt').then(r => r.text()).then(text => {
	var dic = text.split('\n');
	// init ruzzle data and table
	ruzzle(dic);

	// load solutions
	ruzzleSolve(dic);
})
.catch(console.error);



function ruzzle(dic){

	table.innerHTML = '';
	
	for (var i=0;i<4;i++){
		var tr= table.insertRow();
		for (var j=0;j<4;j++){
			var td = tr.insertCell();
			if (j==x3[0] && i==x3[1]) td.className="x3";
			else if (j==x2[0] && i==x2[1]) td.className="x2";
			td.textContent = letters.splice(Math.floor(letters.length*Math.random()),1)[0]
		}
	}

	let cancel = () => {}; // to cancel the last move
	const words= []; //words already found

	table.onpointerdown = evt => {
		evt.preventDefault();
		var td = evt.target.closest('td');
		if (!td) return;

		var X = td.parentNode.rowIndex;
		var Y = td.cellIndex;

		const path = [[X,Y]];

		document.getElementById("points").textContent = "";

		td.style.backgroundColor = "yellow";
		document.getElementById("text").textContent = path.map(a => table.rows[a[0]].cells[a[1]].textContent).join('');

		const rect = table.rows[0].cells[0].getBoundingClientRect();
		const rect2 = table.rows[0].cells[1].getBoundingClientRect();
		const rad = rect.width/2;
		const rows = Array.from({length: table.rows.length}, (_,i) => rect.left + rad + i*(rect2.left-rect.left) + window.scrollX);
		const cols = Array.from({length: table.rows.length}, (_,i) => rect.top + rad + i*(rect2.left-rect.left) + window.scrollY);

		cancel = move(event, table, {
			update: e => {
				// var td = e.target.closest('td');
				// if (!td) return;
				// var rect = td.getBoundingClientRect(), rad = rect.width/2;
				
				// const d2 = (rect.left+rad-e.clientX)**2 + (rect.top+rad-e.clientY)**2;
				// console.log('move', e.clientX, e.clientY, rect.left+rad, rect.top+rad, e.target);
				// for some shit reason, on mobile only, e.target stays the same original

				// if (d2 > rad*rad ) return; // ignore the corners

				const y = rows.findIndex(row =>  (row-e.pageX)*(row-e.pageX) <= rad*rad*.6);
				if (y===-1) return;
				const x = cols.findIndex(col =>  (col-e.pageY)*(col-e.pageY) <= rad*rad*.6);
				if (x===-1) return;

				// var x = td.parentNode.rowIndex;
				// var y = td.cellIndex;
				const td = table.rows[x].cells[y];

				if (path.find(p => p[0]===x && p[1]===y)) return; // already used, exit
				
				if(Math.abs(X-x)<=1 && Math.abs(Y-y)<=1 ){ // you can move only to contiguous cells
					td.style.backgroundColor = "yellow";
					X = x;
					Y = y;
					path.push([X,Y]);
					document.getElementById("text").textContent = path.map(a => table.rows[a[0]].cells[a[1]].textContent).join('');
				}
			},
			end() { // finished moving
				for (var i=0;i<path.length;i++){
					table.rows[path[i][0]].cells[path[i][1]].style.backgroundColor = "";
				}
				var word = path.map(a => table.rows[a[0]].cells[a[1]].textContent).join('');
				var inWord = words.includes(word);
				var inDic = dic.includes(word)
				if (word.length>1) {
					if (!inWord && inDic){ //valid word
						var pts = word.split('').reduce((pts, letter) => pts + points[letter], 0 )
						for (var i=path.length-1;i>=0;i--){
							if (path[i][0]==x3[0] && path[i][1]==x3[1])
								pts *=3;
							else if (path[i][0]==x2[0] && path[i][1]==x2[1])
								pts *=2;
						}
						document.getElementById("points").textContent = "+"+pts;
						document.getElementById("score").textContent = +document.getElementById("score").textContent + pts;
						audioSuccess.play();
					}else if (inWord){
						audioDone.play();
					}else if (!inDic){
						audioFail.play();
					}
					words.push(word);
				}
				//counts the points
			}
		});

	};

	var countdown=120;
	var itv = setInterval(() => {
		countdown--;
		var s=countdown%60;
		document.getElementById("time").textContent=(countdown-s)/60+':'+("0" + s).slice(-2);
		if (countdown <= 0) {
			clearInterval(itv);
			if (cancel) cancel();
			table.onpointerdown = null;
		}
	}, 1000);
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
function ruzzleSolve(dic){ // todo pass html data as arg, to make it more pure
	var Trie = {};
	for (var i=0;i<dic.length;i++){
		addToTrie(Trie, dic[i]);
	}

	var words = [];
	var wordPoints = [];
	function findAllWords(p, trie, path){
		var w = "";
		for (var i=0;i<path.length;i++){
			w+=table.rows[path[i][0]].cells[path[i][1]].textContent;
		}
		if (null in trie && path.length>=2){ //we found a valid word
			
			var pts = w.split('').reduce((pts, letter) => pts + points[letter], 0);
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
		var c = table.rows[i].cells[j].textContent;
		if (c in trie){
			for (var _i=-1;_i<=1; _i++){
				for (var _j=-1;_j<=1; _j++){ // all adjacent cells to (i,j)
					if (!(_i==0&&_j==0) && i+_i>=0 && i+_i<table.rows.length && j+_j>=0 && j+_j<table.rows.length){
						var inPath = path.find(p => p[0]==i && p[1]==j);
						
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
	var wordByPoints =  words.map((e, i) => [words[i], wordPoints[i]]);

	wordByPoints.sort((a,b) => b[1]-a[1]);
	log.innerHTML = wordByPoints.map(a => `<span>${a[0]} (${a[1]})</span>`).join('<br>');
}




// move/drag element helper
function move(e, moveContainer, {update=()=>{}, end=()=>{}}) {

	const up = e => {
		document.removeEventListener('pointerup', up);
		moveContainer.removeEventListener('pointermove', update);
		end();
	};

	update(e); // trigger it now also
	document.addEventListener('pointerup', up);
	moveContainer.addEventListener('pointermove', update);
	
	return up; // return the 'cancel' function
}
