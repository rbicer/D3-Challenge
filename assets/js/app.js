//D3 Challenge
  
// SVG's Height/Width set up
var svgWidth = 1000;
var svgHeight = 550;

//Margin Setup
var margin = {
  top: 40,
  right: 60,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper,
// append an SVG group that will hold our chart.
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

  // Append SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("https://raw.githubusercontent.com/rbicer/D3-Challenge/master/assets/data/data.csv?token=ARO2RXPDZRBEYMCATXC2DXLAROTRI").then(function(stateData) {

  // Step 1: Parse Data/Cast as numbers
  stateData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  })

  // Step 2: Create scale functions
  // ==============================
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(stateData, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([3, d3.max(stateData, d => d.healthcare)])
    .range([height, 0]);
  
  // Step 3: Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Step 4: Append Axes to the chart
  // ==============================
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Step 5: Create Circles
  // ==============================
  chartGroup.selectAll("circle")
  .data(stateData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "11")
  .attr("fill", "blue");


// Appending a state abbreviation to each data point
chartGroup.append("text")
  .style("text-anchor", "middle")
  .style("font-size", "10px")
  .selectAll("tspan")
  .data(stateData)
  .enter()
  .append("tspan")
  .attr("fill", "white")
  .attr("x", function(data) {
      return xLinearScale(data.poverty - 0);
  })
  .attr("y", function(data) {
      return yLinearScale(data.healthcare - 0.2);
  })
  .text(function(data) {
      return data.abbr
  });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 1.5))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
}).catch(function(error) {
  console.log(error);

});