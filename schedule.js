var dayEvent = new Array();
dayEvent[1] = "";
dayEvent[2] = "";
dayEvent[3] = "";
dayEvent[4] = "";
dayEvent[5] = "";
dayEvent[6] = "";
dayEvent[7] = "";
dayEvent[8] = "";
dayEvent[9] = "";
dayEvent[10] = "";
dayEvent[11] = "";
dayEvent[12] = "";
dayEvent[13] = "";
dayEvent[14] = "";
dayEvent[15] = "<br /><a href='#'>Flight to Paris</a><br />11:00 am<br/> [Video Release]"
dayEvent[16] = "";
dayEvent[17] = "<br /><a href='#'>First Impressions - Paris</a><br />11:00 am<br/> [Video Release]"
dayEvent[18] = "";
dayEvent[19] = "<br /><a href='#'>Eiffel Tower tour - Paris</a><br />12:00 pm<br/> [Live Stream]"
dayEvent[20] = "<br /><a href='#'>Lapel Pin - New in Store</a><br />6:00 pm<br/> [Merchandise release]"
dayEvent[21] = "";
dayEvent[22] = "<br /><a href='#'>Versailles Museum Tour - Paris</a><br />12:00 pm<br/> [Merchandise release]"
dayEvent[23] = "";
dayEvent[24] = "<br /><a href='#'>Market Hunt - Paris</a><br />12:00 pm<br/> [Livestream]"
dayEvent[25] = "<br /><a href='#'>Sampling Local Delicacies - Paris</a><br />10:00 pm<br/> [Video Release]"
dayEvent[26] = "";
dayEvent[27] = "";
dayEvent[28] = "<br /><a href='#'>Goodbye - Paris</a><br />12:00 pm<br/> [Blog Update]"
dayEvent[29] = "";
dayEvent[30] = "";
dayEvent[31] = "";

var thisDay = new Date();
document.getElementById("calendar").innerHTML = createCalendar(thisDay);
function createCalendar(calDate){
	var calendarHTML = "<table id=calendar_table>";
	calendarHTML+=calCaption(calDate);
	calendarHTML+= calWeekdayRow();
	calendarHTML+= calDays(calDate);
	calendarHTML+="</table>";
	return calendarHTML;
}

function calCaption(calDate){
	var monthName = ["January","February", "March","April","May","June","July","August","September","October","November","December"];
	var thisMonth = calDate.getMonth();
	var thisYear = calDate.getFullYear();
	return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";

}

function calWeekdayRow(){
	var dayName = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
	var rowHTML = "<tr>";
	for(var i=0;i<dayName.length;i++){
		rowHTML+= "<th classname='calendar_weekdays'>" + dayName[i] +"</th>"
	}
	rowHTML+="</tr>";
	return rowHTML;

}

function daysInMonth(calDate){
	var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
	var thisYear= calDate.getFullYear();
	var thisMonth = calDate.getMonth();
	if(thisYear%4===0){
		if((thisYear%100!=0) || (thisYear%400===0) )
			dayCount[1] = 29;
	}
	return dayCount[thisMonth];
}

function calDays(calDate){
	var day = new Date(calDate.getFullYear(), calDate.getMonth(),1);
	var weekDay = day.getDay();
	var htmlCode = "<tr>";
	for(var i=0;i<weekDay;i++){
		htmlCode+= "<td></td>";
	}
	var totalDays = daysInMonth(calDate);
	var highlight = calDate.getDate();
	for(var i=1; i<=totalDays;i++){
		day.setDate(i);
		weekDay = day.getDay();
		if(weekDay===0) htmlCode+="<tr>";
		if(i===highlight){
			htmlCode+="<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>";
		}else{
		htmlCode+="<td class='calendar_dates'>" + i + dayEvent[i]+ "</td>";
	}
		if(weekDay===6) htmlCode+="</tr>";
	}
	htmlCode+="</tr>";
		return htmlCode;
   }
   