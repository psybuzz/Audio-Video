

var w = 640,
    h = 360;

var projection = d3.geo.azimuthal()
    .mode("equidistant")
    .origin([-98, 38])
    .scale(700)
    .translate([320, 180]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#title").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var states = svg.append("svg:g")
    .attr("id", "states");

var circles = svg.append("svg:g")
    .attr("id", "circles");



d3.json("us-states.json", function(collection) {
  states.selectAll("path")
      .data(collection.features)
    .enter().append("svg:path")
      .attr("d", path);
});




  d3.csv("city.csv", function(city) {

    var positions = [];
    city = city.filter(function(cities) {
        var location = [+cities.lon, +cities.lat];
        positions.push(projection(location));
        return true;
    });

    circles.selectAll("circle")
        .data(city)
      .enter().append("svg:circle")
        .attr("cx", function(d, i) { return positions[i][0]; })
        .attr("cy", function(d, i) { return positions[i][1]; })
        .attr("r", function(d, i) { return 6; })
        .on("click", function(d, i) {
        	// d3.select("h1 span").text(d.city_name);
        	loadSidebar(d.city_name);
        });

});