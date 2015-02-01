//http://jsfiddle.net/h661n2g6/11/

window.onload=function(){
	var ctx = overlaycanvas.getContext('2d'), ctx0=imgcanvas.getContext('2d'), width, height;
	start = [34, 49], end = [669, 658], im = [-22, -14];
	width = overlaycanvas.width = imgcanvas.width = img.width;
	height = overlaycanvas.height = imgcanvas.height = img.height;
	ctx0.drawImage(img, im[0], im[1], img.width, img.height, 0, 0, img.width, img.height);


	var pts=[start, end, im], dragging=[false, false, false], imDragOrigin;
	overlaycanvas.onmousedown = function(ev){
	    for (var i=0;i<2;i++){
	        if (pts[i][0]-5<ev.offsetX && ev.offsetX<pts[i][0]+5 && pts[i][1]-5<ev.offsetY && ev.offsetY<pts[i][1]+5) dragging[i]= true;
	    }
	    if (!dragging[0] && !dragging[1]) {
	        dragging[2]=true;
	        imDragOrigin = [ev.offsetX, ev.offsetY];
	    }
	}
	overlaycanvas.onmouseup = function(ev){
	    dragging=[false,false,false];
	}

	overlaycanvas.onmousemove = function(ev){
	    for (var i=0;i<dragging.length;i++){
	        if (dragging[i] && (ev.which || ev.button)==1){
	            if (i<2) {pts[i][0]=ev.offsetX; pts[i][1] = ev.offsetY;}
	            else {pts[i][0]+=imDragOrigin[0]-ev.offsetX; pts[i][1]+=imDragOrigin[1]-ev.offsetY;imDragOrigin = [ev.offsetX, ev.offsetY];}
	            ctx.clearRect(0, 0, imgcanvas.width, imgcanvas.height);
	            ctx0.clearRect(0, 0, imgcanvas.width, imgcanvas.height);
	            ctx0.drawImage(img, im[0], im[1], img.width, img.height, 0, 0, img.width, img.height);          
	            line(ctx, "green", start[0]-5, start[1], start[0]+5, start[1])
	            line(ctx, "green", start[0], start[1]-5, start[0], start[1]+5)
	            line(ctx, "red", end[0]-5, end[1], end[0]+5, end[1])
	            line(ctx, "red", end[0], end[1]-5, end[0], end[1]+5)
	        }
	    }
	}


	/*for (var i=0;i<matrix.length;i++){
	    for (var j=0;j<matrix[i].length;j++){
	        ctx.fillStyle=matrix[i][j]==1? "black" : "white";
	        ctx.fillRect(j,i,1,1);
	    }
	}*/
	line(ctx, "green", start[0]-5, start[1], start[0]+5, start[1])
	line(ctx, "green", start[0], start[1]-5, start[0], start[1]+5)
	line(ctx, "red", end[0]-5, end[1], end[0]+5, end[1])
	line(ctx, "red", end[0], end[1]-5, end[0], end[1]+5)

	search.onclick= function(){
	    var imgd = ctx0.getImageData(0, 0, imgcanvas.width, imgcanvas.height), pix = imgd.data, matrix=[];
	    for (var i=0;i<imgcanvas.height;i++){
	        var row=[];
	        for (var j=0;j<imgcanvas.width;j++){
	            var idx = 4*(i*width+j);
	            row[j]=(pix[idx]+pix[idx+1]+pix[idx+2])/(255*3)>.5 ? 0 : 1;
	        }
	        matrix[i] = row;
	    }

	    var grid = new PF.Grid(matrix[0].length, matrix.length, matrix);
	    var finder = new PF.AStarFinder();
	    var path = finder.findPath(start[0], start[1], end[0], end[1], grid);
	    //console.log(JSON.stringify(path));
	    ctx.fillStyle="#0000FF";
	    for (var i=0; i<path.length; i++){
	        ctx.fillRect(path[i][0],path[i][1],1,1);
	    }
	}

	function line(ctx, color, fromX, fromY, toX, toY){
	    ctx.strokeStyle=color;
	    ctx.beginPath();
	    ctx.moveTo(fromX,fromY);
	    ctx.lineTo(toX,toY);
	    ctx.stroke();
	}
}
