var globalObj = {
	init: function(){
		globalObj.canvas = document.getElementById("myCanvas");
		globalObj.context = this.canvas.getContext("2d");
		
		globalObj.grayCanvas = document.getElementById("grayCanvas");
		globalObj.grayContext = this.grayCanvas.getContext("2d");
		
		globalObj.binCanvas = document.getElementById("binCanvas");
		globalObj.binContext = this.binCanvas.getContext("2d");
		
		globalObj[" "] = " ";
		globalObj["-"] = "-";
		
		globalObj.textRows = 70;
		
	}
}