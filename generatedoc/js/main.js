var Main = {
	init: function(){
		//console.log(globalObj);
	},
	selectFile: function(){
		debugger;
		var imageFile = document.getElementById("uploadfile").files[0];
		var img = new Image();
		img.src = window.URL.createObjectURL(imageFile);
		//轮询，等图片加载完成，画到页面上
		var stopid = setInterval(function(){
			if(img.complete){
				//清空当前画布
				globalObj.image = img;
				globalObj.context.clearRect(0, 0, globalObj.canvas.width, globalObj.canvas.height);
				var newSize = Main.getImgSize(img);
				globalObj.context.drawImage(img, 0, 0, newSize.width, newSize.height);
				//globalObj.context.drawImage(img, 0, 0, 70, 70);
				window.clearInterval(stopid);
			}
		},50);
		
		
	},
	/**
	* 根据canvas的宽高，调整图片比例
	**/
	getImgSize: function(img){
		debugger;
		var iw = img.width;
		var ih = img.height;
		
		//图片比例
		var scale = iw/ih;
		var cw = globalObj.canvas.width;
		var ch = globalObj.canvas.height;
		var result = {};
		if(iw < ih){
			result.height = cw;
			result.width = cw * scale;
		}else{
			result.width = cw;
			result.height = cw/ scale;
		}
		globalObj.showSize = result;
		return result;
	},
	toGray: function(){
		debugger;
		globalObj.grayContext.clearRect(0, 0, globalObj.grayCanvas.width, globalObj.grayCanvas.height);
		var imgData = globalObj.context.getImageData(0, 0, globalObj.showSize.width, globalObj.showSize.height);
		var grayData = globalObj.grayContext.getImageData(0, 0, globalObj.showSize.width, globalObj.showSize.height);
		var totalC = 0;
		for(var i = 0;i < imgData.data.length;i = i + 4){
			var grayValue = Main.getGrayValue(imgData.data[i], imgData.data[i+1], imgData.data[i+2], imgData.data[i+3], "4");
			totalC = totalC + grayValue*3;
			grayData.data[i] = grayValue;
			grayData.data[i+1] = grayValue;
			grayData.data[i+2] = grayValue;
			grayData.data[i+3] = imgData.data[i+3];
		}
		globalObj.grayContext.putImageData(grayData, 0, 0, 0, 0, globalObj.showSize.width, globalObj.showSize.height);
		globalObj.aveGray = totalC/ (imgData.data.length/4*3);
		console.log(globalObj.aveGray);
	},
	/**
	* mode为1则使用均值法求灰度值，为2使用比例求灰度值
	*
	**/
	getGrayValue: function(r, g, b, a, mode){
		if(mode == "1"){
			return (r+g+b+a)/4;
		}else if(mode == "2"){
			return 0.299*r + 0.587*g + 0.114*b;
		}else if(mode == "3"){
			return Math.max(r,g,b);
		}else if(mode == "4"){
			return (r+g+b)/3;
		}
	},
	
	toBinarization: function(){
		debugger;
		globalObj.binContext.clearRect(0, 0, globalObj.grayCanvas.width, globalObj.grayCanvas.height);
		var grayData = globalObj.grayContext.getImageData(0, 0, globalObj.showSize.width, globalObj.showSize.height);
		var binData = globalObj.binContext.getImageData(0, 0, globalObj.showSize.width, globalObj.showSize.height);
		for(var i = 0;i < grayData.data.length;i++){
			if(grayData.data[i] < globalObj.aveGray){
				binData.data[i] = 0;
				binData.data[i+1] = 0;
				binData.data[i+2] = 0;
				binData.data[i+3] = grayData[i+3];
			}else{
				binData.data[i] = 255;
				binData.data[i+1] = 255;
				binData.data[i+2] = 255;
				binData.data[i+3] = grayData[i+3];
			}
			/*if(grayData.data[i] < globalObj.aveGray - 25){
				binData.data[i] = 0;
				binData.data[i+1] = 0;
				binData.data[i+2] = 0;
				binData.data[i+3] = grayData[i+3];
			}else if(grayData.data[i] > globalObj.aveGray + 25){
				binData.data[i] = 255;
				binData.data[i+1] = 255;
				binData.data[i+2] = 255;
				binData.data[i+3] = grayData[i+3];
			}*/
		}
		globalObj.binContext.putImageData(binData, 0, 0, 0, 0, globalObj.showSize.width, globalObj.showSize.height);
	},
	
	getChar: function(g){
		if (g <= 17) {
			return 'M';
		} else if (g > 17 && g <= 34) {
			return 'N';
		} else if (g > 34 && g <= 51) {
			return 'H';
		} else if (g > 51 && g <= 68) {
			return 'Q';
		} else if (g > 68 && g <= 85) {
			return '&';
		} else if (g > 85 && g <= 102) {
			return 'O';
		} else if (g > 102 && g <= 119) {
			return 'C';
		} else if (g > 119 && g <= 136) {
			return '?';
		} else if (g > 136 && g <= 153) {
			return '7';
		} else if (g > 153 && g <= 170) {
			return '>';
		} else if (g > 170 && g <= 187) {
			return '!';
		} else if (g > 187 && g <= 204) {
			return ':';
		} else if (g > 204 && g <= 221) {
			return '-';
		} else if (g > 221 && g <= 238) {
			return ';';
		}  else {
			return '.';
		}
	},
	
	getStep: function(width,height){
		if(height - width >= 100){
			return 2;
		}else{
			return 1;
		}
	},
	
	generateText: function(type){
		debugger;
		var imageData = {};
		if(type == "source-image"){
			imageData = globalObj.context.getImageData(0, 0, globalObj.showSize.width, globalObj.showSize.height);
		}else if(type == "gray-image"){
			imageData = globalObj.grayContext.getImageData(0, 0, globalObj.showSize.width, globalObj.showSize.height);
		}else if(type == "bin-image"){
			imageData = globalObj.binContext.getImageData(0, 0, globalObj.showSize.width, globalObj.showSize.height);
		}
			
		var height = imageData.height;
		var width = imageData.width;
		var html = "";
		var step = this.getStep(width, height);
		for(var i = 0;i < height;i+=step){
			var p = "<p>";
			for(var j = 0; j < width;j++){
				var index = (j + width * i) * 4;
				var r = imageData.data[index];
				var g = imageData.data[index + 1];
				var b = imageData.data[index + 2];
				var a = imageData.data[index + 3];
				p = p + this.getChar(this.getGrayValue(r,g,b,a,"2"));
			}
			p = p + "</p>";
			html = html + p;
		}
		var div = document.getElementById("image-text");
		div.innerHTML = html;
	},
	
	
}