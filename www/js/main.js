var scriptsLoaded = 0;
var totalReq = 2;

document.addEventListener("DOMContentLoaded", function() {
    var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", "css/weather-icons.css");
    css.addEventListener("load", loadCount);
    document.querySelector("head").appendChild(css);
    var jq = document.createElement("script");
    jq.addEventListener("load", loadCount);
    jq.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
    document.querySelector("head").appendChild(jq);
}
);

function buildWidget(cls) {
    $.get(
    "https://api.forecast.io/forecast/e8357717b48b52890f2452676b4c0e3d/45.3491825,-75.7583209?units=ca&exculed=daily,minutely,flags,alerts", 
    handleResult, 
    "jsonp"
    );
    
    function handleResult(data) {
        console.log('put data into div with class ' + cls);
        console.log(data);
        var i = 0;
        var currentDate = new Date(data.currently.time * 1000);
var currentDay = currentDate.getDay()+1;
var currentMonth = currentDate.getMonth()+1;
var today = currentDay + "/" + currentMonth;
        var TempCurrent = data.hourly.data[i].apparentTemperature + "C";
        var SummaryCurrent = data.hourly.data[i].summary;
        for (i = 0; i < 24; i++) {
            var hourlyData = data.hourly.data[i];
            var time = new Date(hourlyData.time * 1000);
            if (time.getDate() === currentDate.getDate()) {
                time = time.getHours() + ":00";
                var Rainchance = data.hourly.data[i].precipProbability + "%" + " ";
                var Temp = data.hourly.data[i].apparentTemperature + "C" + " ";
                var Summary = data.hourly.data[i].summary + " ";
                var Windspeed = data.hourly.data[i].windSpeed + "KM/h" + " ";
                if (i === 0) {
					$('.mywidget').append('<h3>' + "The Current Weather For " + today + '</h3>');
					$('<span class="wi wi-forecast-io-partly-cloudy-night current">').addClass("wi wi-forecast-io-" + data.hourly.data[i].icon).appendTo('.mywidget');
                    $('.mywidget').append('<h1>' + " " + TempCurrent + " " + SummaryCurrent + '</h1>');
					$('.mywidget').append('<table class="table table-striped">');
					$('.mywidget table').append('<thead>');
					$('.mywidget thead').append('<tr>');
                    $('.mywidget tr').append('<th>' + " " + "Time" + " " + '</th>');
                    $('.mywidget tr').append('<th>' + " " + "Rain Chance" + " " + '</th>');
                    $('.mywidget tr').append('<th>' + " " + "Temp" + " " + '</th>');
                    $('.mywidget tr').append('<th>' + " " + "Windspeed" + " " + '</th>');
                    $('.mywidget tr').append('<th>' + " " + "Summary" + " " + '</th>');
					$('.mywidget table').append('<tbody>');
                } else {
                    var row = $('<tr>');
                    row.append('<td>' + " " + time + " " + '</td>');
                    row.append('<td>' + " " + Rainchance + " " + '</td>');
                    row.append('<td>' + " " + Temp + " " + '</td>');
                    row.append('<td>' + " " + Windspeed + " " + '</td>');
                    row.append('<td class="icon-'+i+'">' + ' ' + Summary +  " " +'</td>' );
					$('.mywidget tbody').append(row);
					$('.icon-' +i).append($('<i>').addClass("wi wi-forecast-io-" + data.hourly.data[i].icon));
                }
            }
        }
	}
}

function loadCount() {
    scriptsLoaded++;
    if (scriptsLoaded === 2) {
        buildWidget(".mywidget");
        console.log("both scripts loaded");
    }
}
