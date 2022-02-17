import React, { useEffect } from "react";
import * as d3 from "d3";
import "./styles/Graph.css";

const Graph = ({ indices }) => {

   let height = 237;
   let width = 325;
   let margin = 35;

   const svgRef = React.useRef(null);

   useEffect(() => { //?usememo

      function draw() {

         if (!indices || !indices.length) return;

         let data = indices.map(obj => {
            return {
               time: new Date(("ind_card_EPOC" in obj ? +obj.ind_card_EPOC : +obj.ind_pulm_EPOC) * 1000),
               value: "ind_card_value" in obj ? obj.ind_card_value : obj.ind_pulm_value
            }
         }).sort((a, b) => a.time - b.time);

         let values = data.map(obj => obj.value)

         let axisXLength = width - 2 * margin;
         let axisYLength = height - 2 * margin;

         const svgEl = d3.select(svgRef.current)
         svgEl.selectAll("*").remove();
         let svg = svgEl;

         let scaleX = d3.scaleTime()
            .range([0, axisXLength])
            .domain(d3.extent(data, function (d) {
               return d.time
            }));

         let scaleY = d3.scaleLinear()
            .range([0, axisYLength])
            .domain([Math.ceil(Math.max(...values) * 10) / 10, 0]);

         let points = data.map(obj => {
            return {
               x: scaleX(obj.time) + margin,
               y: scaleY(obj.value) + margin
            }
         })

         let axisX = d3.axisBottom()
            .scale(scaleX)
            .ticks(data.length)
            .tickFormat(d3.timeFormat('%H'));

         let axisY = d3.axisLeft()
            .scale(scaleY)
            .ticks(data.length)

         svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(" + margin + "," + (height - margin) + ")")
            .call(axisX);

         svg.append("g")
            .attr("class", "y-axis")
            .attr("transform",
               "translate(" + margin + "," + margin + ")")
            .call(axisY);

         //vertical
         d3.selectAll("g.x-axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", - (axisYLength));

         //horizontal
         d3.selectAll("g.y-axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", axisXLength)
            .attr("y2", 0);

         let line = d3.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });

         svg.append("g").append("text")
            .attr("x", (width / 2))
            .attr("y", margin - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "0.9em")
            .text(indices.length < 2 ?
               "Nao ha pontos para criar linha" :
               "ind_card_EPOC" in indices[0] ?
                  "Indice cardiaco" :
                  "Indice pulmonar"
            );

         svg.append("g").append("text")
            .attr("x", margin + 11)
            .attr("y", margin - 11)
            .attr("text-anchor", "end")
            .style("font-size", "11px")
            .text("Indice");

         svg.append("g").append("text")
            .attr("x", width - margin + 11)
            .attr("y", height - margin - 5)
            .attr("text-anchor", "end")
            .style("font-size", "11px")
            .text("Horas");

         svg.append("g").append("path")
            .attr("d", line(points))
            .style("stroke", "#0099FA")
            .style("stroke-width", 2);
      }
      draw()
   }, [indices, height, width, margin])

   return (
      <svg
         ref={svgRef}
         width={width}
         height={height}
         className="axis m-3"
      />
   )
};

export default (Graph);