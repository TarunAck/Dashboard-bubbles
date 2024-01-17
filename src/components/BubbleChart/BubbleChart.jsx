import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data, setSelectedData }) => {
	const svgRef = useRef();

	useEffect(() => {
		const svg = d3.select(svgRef.current);

		// Define a simulation to handle collision and movement
		const simulation = d3
			.forceSimulation(data)
			.force(
				"collide",
				d3
					.forceCollide()
					.radius((d) => d.NormalizedFloorPrice + 2)
					.iterations(2)
			)
			.force("charge", d3.forceManyBody().strength(5))
			.force("x", d3.forceX(window.innerWidth / 2).strength(0.1))
			.force("y", d3.forceY(window.innerHeight / 2).strength(0.1));

		// Create groups for circles and text
		const bubbles = svg
			.selectAll(".bubble")
			.data(data)
			.enter()
			.append("g")
			.classed("bubble", true);

		// Create circles with radial gradients
		bubbles
			.append("circle")
			.attr("r", (d) => d.NormalizedFloorPrice)
			.attr("fill", (d, i) => `url(#gradient${i})`)
			.on("mouseover", handleMouseOver)
			.on("mouseout", handleMouseOut)
			.on("click", handleClick);

		// Add radial gradients for each circle
		const gradients = svg
			.selectAll(".gradient")
			.data(data)
			.enter()
			.append("radialGradient")
			.attr("id", (d, i) => `gradient${i}`)
			.selectAll("stop")
			.data([
				{ offset: "25%", color: "lightblue" },
				{ offset: "95%", color: "blue" },
			])
			.enter()
			.append("stop")
			.attr("offset", (stop) => stop.offset)
			.attr("stop-color", (stop) => stop.color);

		// Add text inside circles
		bubbles
			.append("text")
			.text((d) => d.Name)
			.attr("text-anchor", "middle")
			.attr("dy", 4); // Adjust the vertical position of the text

		// Update bubble positions in the simulation
		simulation.nodes(data).on("tick", () => {
			bubbles.attr("transform", (d) => `translate(${d.x},${d.y})`);
		});

		// Add drag behavior (optional)
		bubbles.call(
			d3
				.drag()
				.on("start", (event, d) => {
					if (!event.active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
				.on("drag", (event, d) => {
					d.fx = event.x;
					d.fy = event.y;
				})
				.on("end", (event, d) => {
					if (!event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				})
		);

		function handleMouseOver(event, d) {
			// Increase the radius on hover
			d3.select(this).style("cursor", "grab");
			setSelectedData(d);
		}

		function handleMouseOut(event, d) {
			// Revert to the original radius on mouseout
			d3.select(this).attr("r", d.NormalizedFloorPrice);
			setSelectedData(null);
		}
		function handleClick(event, d) {
			console.log(d);
			setSelectedData(d);
		}
	}, [data]);

	return (
		<svg ref={svgRef} width={window.innerWidth} height={window.innerHeight} />
	);
};

export default BubbleChart;
