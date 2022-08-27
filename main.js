const MARGIN = {
  LEFT: 700,
  RIGHT: 0,
  TOP: 390,
  BOTTOM: 100
}
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT

const HEIGHT = 630 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#container-blanco").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

const y = d3.scaleLinear()
  .range([HEIGHT, 0])

const x = d3.scaleBand()
  .range([0, WIDTH])
  .paddingInner(0.1)
  .paddingOuter(0)

const color = d3.scaleOrdinal()
  .range(d3.schemeCategory10)

const xAxisGroup = g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0,${HEIGHT})`)

d3.csv("data/quarter_value_MDV.csv").then(data => {
  data.forEach(d => {
    d.asistidos = Number(d.asistidos)
  })
  console.log(data)
  d3.interval(() => {
    update(data)
  }, 1000)
  update(data)
})
// const yAxisCall= d3.axisLeft(y)
// g.append("g")
//   .attr("class","y axis")
//   .call(yAxisCall)
//Tooltip

// const tip=d3.tip()
//   .html(d=>d)
// g.call(tip)

// create a tooltip real under til varmouseleave
// var Tooltip = d3.select("#container-blanco")
//   .append("div")
//   .style("opacity", 0)
//   .attr("class", "tooltip")
//   .style("background-color", "white")
//   .style("border", "solid")
//   .style("border-width", "2px")
//   .style("border-radius", "5px")
//   .style("padding", "5px")
//
// // Three function that change the tooltip when user hover / move / leave a cell
// var mouseover = function(d) {
//   Tooltip
//     .style("opacity", 1)
//   d3.select(this)
//     .style("stroke", "black")
//     .style("opacity", 1)
// }
// var mousemove = function(d) {
//   Tooltip
//     .html("Personas Asistidas: " + d.asistidos)
//     .style("top", d3.select(this).attr("y") + "px")
//     .style("left", d3.select(this).attr("x") + "px")
// }
// var mouseleave = function(d) {
//     Tooltip
//       .style("opacity", 0)
//     d3.select(this)
//       .style("stroke", "none")
//       .style("opacity", 0.8)
//   }
//
//

  //   {if(d.trimestre==="Primer Trimestre"){
  //     return "blue"
  //   }
  //   else{
  //     return "red"
  //   }
  // })
  .catch(error => {
    console.log(error)
    update(data)
  })



function update(data) {
  y.domain([0, d3.max(data, d => d.asistidos)])
  x.domain(data.map(d => d.trimestre))
  color.domain(data.map(d => d.trimestre))

//
// const trim = function()
// {
//   if ($(".checkI").val()==='I')
//     {
//     return "I";
//     }
//   elsif ($(".checkII").val()==='II')
//       {
//       return "II";
//       }
//   // else{
//   //       return "all";
//   //
//   //   }
// }
//
//
//   var choices = [];
//   d3.selectAll(".form-check-input").each(function(d){
//     cb = d3.select(this);
//     if(cb.property("checked")){
//       choices.push(cb.property("value"));
//     }
//   });
//
//   if(choices.length > 0){
//     newData = data.filter(function(d,i){return choices.includes(d);});
//   } else {
//     newData = data;



  //
  const trim = $("#trimestre-select").val()

  	const filteredData = data.filter(d => {
  		if (trim === "all") return true
  		else {
  			return d.quarter == trim
  		}
})
  const xAxisCall = d3.axisBottom(x)
  xAxisGroup
    .call(xAxisCall)

//JOIN NEW DATA WITH OLD ELEMENTS.
  const rects = g.selectAll("rect")
    .data(filteredData)
//EXIT OLD ELEMENTS NOT PRESENT IN NEW data
rects.exit().remove()

//UPDATE OLD ELEMENTS PRESENT IN NEW data
rects
.attr("x",(d) =>x(d.trimestre))
.attr("y",d=>y(d.asistidos))
.attr("width", x.bandwidth)
.attr("height",d=>HEIGHT- y(d.asistidos))

//ENTER NEW ELEMENTS PRENET IN NEW DATA
  rects.enter().append("rect")
      // .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
      // .on("mouseleave", mouseleave)
    .attr("x",(d) =>x(d.trimestre))
    .attr("y",d=>y(d.asistidos))
    .attr("width", x.bandwidth)
    .attr("height",d=>HEIGHT- y(d.asistidos))
    .attr("fill",d=>color(d.trimestre))
  console.log(rects)
}
