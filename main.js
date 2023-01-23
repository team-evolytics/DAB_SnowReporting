let snowInterval = setInterval(function(){
    if($(".c126__total1--v1.header_weather__snowfall_measurement").length > 0){
        toggleWeatherWidget();
        clearInterval(snowInterval);
;    }
}, 500)

// Function to be called when we're ready to show/hide the weather widget
function toggleWeatherWidget(){
    //Parse the widget HTML to find the current inch count of snow, parsing it to an integer
    let snowMeasurement = parseInt($(".c126__label1--v1:contains('24 HourSnowfall'):first").parent().children().first().text().replace("in", ""));

    // Ensuring that our variable is a valid number that that it is greater than two inches
    //
    // TO-DO: Add in a condition that the value of snowMeasurement must be greater than two inches to show the widget. The current condition is for development purposes (we can't control the weather)
    //
    if(typeof(snowMeasurement) === 'number'){

        // Hide the 'Todays Forecast' part of the widget
        $("#c126_WeatherHeader_1 .header_weather__forecast").hide()

        // Begin keeping track of the time that the page has effectively loaded. Globally scoped, of course.
        var start = Date.now();

        // Wait half a second to show the widget by triggering a mouseover event. Send analytics tracking call as well.
        setTimeout(function(){
            $("#c126_WeatherHeader_1").trigger("mouseover");
            trackAnalytics("Snow Reporting | Snow Shown | "+snowMeasurement+" inches");

            // We need to add an event to the document to listen for scrolling, since it is one of our two  conditions for hiding the widget.
            document.addEventListener("scroll", hideWeatherWidget);
        }, 500)
    }
    
    // Callback function that will eventually hide the widget when two conditions have been met: 1) Visitor scrolls, and 2) At least three seconds have elapsed since page load
    function hideWeatherWidget(){
        // Get the number of seconds that have elapsed
        let delta = Math.floor((Date.now() - start)/1000); 
        if(delta > 3){
            // Trigger mouseout event to hide the widget, and then remove the event listener since it is no longer needed
            $("#c126_WeatherHeader_1").trigger("mouseout");
            document.removeEventListener("scroll", hideWeatherWidget);
        }
    }
}

// Analytics tracking function that takes a simple pev2.
// TO-DO: Figure out what other analytics variables we need to set in the tracking. 
function trackAnalytics(pev2){
    if(window.s){
        window.s.pev2 = pev2;
        window.s.tl();
    }
}