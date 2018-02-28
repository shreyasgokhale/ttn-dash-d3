// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 50, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%d %X").parse;

// Set the ranges for correctly fitting the data
var x = d3.time.scale().range([0, width]); //Time scale 
var y = d3.scale.linear().range([height, 0]); //
var z = d3.scale.linear().range([height, 0]); //
// Define the axes
var xAxis = d3.svg.axis().scale(x) 
    .orient("bottom").ticks(5); //No of ticks after which a scale value is printed

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(7);

var zAxis = d3.svg.axis().scale(z)
    .orient("left").ticks(7);
// Define the line
var valueline = d3.svg.line()
//	.interpolate("step-before")   //if we want
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.temperature); });
 
var valueline2 = d3.svg.line()
//	.interpolate("step-before")   //if we want
    .x(function(d) { return x(d.time); })
    .y(function(d) { return z(d.light); });

// Adds the svg canvas
var svg1 = d3.select("#area1")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

var svg2 = d3.select("#area2")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

var inter = setInterval(function() {
                updateData1();
                updateData2();
        }, 5000); 

// Get the data

d3.json("data/result.json", function(error, d) { //json request, function points to the data file


	var data = d;
  	data.forEach(function(d){
  		d.temperature =+ d.temperature; //Sets to numeric value if not already, ensures number
  		d.light =+ d.light
  		d.time = parseDate(d.time); }); //function on data file

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.time; })); 
    y.domain([d3.min(data, function(d) { return d.temperature; }) - 2, d3.max(data, function(d) { return d.temperature; }) + 2]);

    // Add the valueline path.
    svg1.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

/*    svg.selectAll("dot")
        .data(data)
    	.enter().append("circle")
        .attr("r", 2.5)
        .attr("cx", function(d) { return x(d.Time); })
        .attr("cy", function(d) { return y(d.temperature); });
*/
    // Add the X Axis
    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    svg1.append("text")             // text label for the x axis
        .attr("x", width / 2 )
        .attr("y",  height + margin.bottom )
        .style("text-anchor", "middle")
        .text("Time");

    svg1.append("g")			// Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

    // Add the Y Axis
   svg1.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Temperature");	

    svg1.append("text")
        .attr("x", (width / 2))				
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")	
        .style("font-size", "16px") 
        .style("text-decoration", "underline") 	
        .text("Temperature vs Time");


});

d3.json("data/result.json", function(error, d) { //json request, function points to the data file


	var data = d;
  	data.forEach(function(d){
  		d.temperature =+ d.temperature; //Sets to numeric value if not already, ensures number
  		d.light =+ d.light
  		d.time = parseDate(d.time); }); //function on data file

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.time; })); 
    z.domain([d3.min(data, function(d) { return d.light; }) - 20, d3.max(data, function(d) { return d.light; }) + 20]);

    // Add the valueline path.

    svg2.append("path")
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline2(data));

/*    svg.selectAll("dot")
        .data(data)
    	.enter().append("circle")
        .attr("r", 2.5)
        .attr("cx", function(d) { return x(d.Time); })
        .attr("cy", function(d) { return y(d.temperature); });
*/
    // Add the X Axis
    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    svg2.append("text")             // text label for the x axis
        .attr("x", width / 2 )
        .attr("y",  height + margin.bottom )
        .style("text-anchor", "middle")
        .text("Time");

    // Add the Y Axis

    svg2.append("g")				
        .attr("class", "y axis")	
        .call(zAxis);

    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Light");    	

    svg2.append("text")
        .attr("x", (width / 2))				
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")	
        .style("font-size", "16px") 
        .style("text-decoration", "underline") 	
        .text("Light vs Time");


});

function updateData1() {

    // Get the data again
 	d3.json("data/result.json", function(error, d) { //json request, function points to the data file


	var data = d;
  	data.forEach(function(d){
  		d.temperature =+ d.temperature; //Sets to numeric value if not already, ensures number
  		d.time = parseDate(d.time); }); //function on data file


  	// Scale the range of the data again 
    x.domain(d3.extent(data, function(d) { return d.time; })); 
    y.domain([d3.min(data, function(d) { return d.temperature; }) - 2, d3.max(data, function(d) { return d.temperature; }) + 2]);
    

    // Select the section we want to apply our changes to
    var svg1 = d3.select("#area1").transition();

    // Make the changes
        svg1.select(".line")   // change the line
            .duration(750)
            .attr("d", valueline(data));
        svg1.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg1.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

    });
}

function updateData2() {

    // Get the data again
 	d3.json("data/result.json", function(error, d) { //json request, function points to the data file


	var data = d;
  	data.forEach(function(d){
  		d.light =+ d.light; //Sets to numeric value if not already, ensures number
  		d.time = parseDate(d.time); }); //function on data file


  	// Scale the range of the data again 
    x.domain(d3.extent(data, function(d) { return d.time; })); 
    z.domain([d3.min(data, function(d) { return d.light; }) - 20, d3.max(data, function(d) { return d.light; }) + 20]);

   

    // Select the section we want to apply our changes to
    var svg2 = d3.select("#area2").transition();

    // Make the changes
        svg2.select(".line")   // change the line
            .duration(750)
            .attr("d", valueline2(data));
        svg2.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg2.select(".y.axis") // change the y axis
            .duration(750)
            .call(zAxis);

    });
}



	