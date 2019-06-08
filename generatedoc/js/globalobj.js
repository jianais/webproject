var globalObj = {
	init: function(){
		globalObj.canvas = document.getElementById("myCanvas");
		globalObj.context = this.canvas.getContext("2d");
	}
}