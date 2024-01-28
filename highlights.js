
window.onload = start;
function start(){
	var index = 0;
	var prev;
	setInterval(function() {
		document.getElementById("mainPicture").innerHTML = "<img src='images/photo" + index + ".jpg' id='photo" + index + "' alt='photo" + index + "'/>";
		document.getElementById("photoCaption").innerHTML = "<caption>" + captions(index) + "</caption>";
		var str = "photo" + index;
		document.getElementById(str).style.outline = "solid white";
		var str2 = str + "r";
		if (prev != null) {
			document.getElementById(prev).style.outline = "none";
		}
		document.getElementById(str2).style.outline = "solid white";
		prev = str2;
		index++;
		if (index > 9) {
			index = 0;
		}
	}, 1000);
}

function captions(e){
	if (e === 0) {
		return "A lovely bunch of blueberries";
	} else if (e === 1) {
		return "A lovely bunch of mangoes";
	} else if (e === 2) {
		return "A lovely bunch of cranberries";
	} else if (e === 3) {
		return "A lovely bunch of raspberries";
	} else if (e === 4) {
		return "A lovely bunch of pomegranates";
	} else if (e === 5) {
		return "A lovely bunch of apples";
	} else if (e === 6) {
		return "A lovely bunch of cherries";
	} else if (e === 7) {
		return "A lovely bunch of limes";
	} else if (e === 8) {
		return "A lovely bunch of strawberries";
	} else if (e === 9) {
		return "A lovely bunch of pineapples";
	}
}
