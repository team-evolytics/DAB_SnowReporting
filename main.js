let snowInterval = setInterval(function(){
    if($(".c126__total1--v1.header_weather__snowfall_measurement").length > 0){
        toggleWeatherWidget();
        clearInterval(snowInterval);
;    }
}, 500)

function toggleWeatherWidget(){
    let snowMeasurement = parseInt($(".c126__label1--v1:contains('24 HourSnowfall'):first").parent().children().first().text().replace("in", ""));
    if(typeof(snowMeasurement) === 'number'){
        $("#c126_WeatherHeader_1 .header_weather__forecast").hide()
        var start = Date.now();

        setTimeout(function(){
            $("#c126_WeatherHeader_1").trigger("mouseover");
            trackAnalytics("Snow Reporting | Snow Shown | "+snowMeasurement+" inches");
            document.addEventListener("scroll", hideWeatherWidget);
        }, 500)
    }
    
    function hideWeatherWidget(){
        let delta = Date.now() - start; 
        if(Math.floor(delta / 1000) > 3){
            $("#c126_WeatherHeader_1").trigger("mouseout");
            document.removeEventListener("scroll", hideWeatherWidget);
        }
    }
}

function trackAnalytics(pev2){
    if(window.s){
        window.s.pev2 = pev2;
        window.s.tl();
    }
}