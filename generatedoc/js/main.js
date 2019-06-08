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
		return result;
	},
	toGray: function(){
		console.log(globalObj.context.getImageData(0, 0, globalObj.image.width, globalObj.image.height));
	},
	
}