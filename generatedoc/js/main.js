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
		for(var i = 0;i < imgData.data.length;i = i + 4){
			var grayValue = Main.getGrayValue(imgData.data[i], imgData.data[i+1], imgData.data[i+2], imgData.data[i+3], "1");
			grayData.data[i] = grayValue;
			grayData.data[i+1] = grayValue;
			grayData.data[i+2] = grayValue;
			grayData.data[i+3] = grayValue;
		}
		globalObj.grayContext.putImageData(grayData, 0, 0, 0, 0, globalObj.showSize.width, globalObj.showSize.height);
		console.log(imgData.data.length);
		console.log(grayData.data.length);
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
		}else if(mode == 3){
			return Math.max(r,g,b);
		}
	},
	
}