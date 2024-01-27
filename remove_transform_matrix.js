// Get the SVG path element
let svgPath = document.getElementById("svgPathId");

// Get the SVG element that contains the path
let svg = svgPath.ownerSVGElement;

// Get the 'd' attribute value
let pathData = svgPath.getAttribute("d");

// Get the transform matrix values
let transformMatrix = svgPath.transform.baseVal.consolidate().matrix;

// Flip the Y-coordinates using the matrix transformation
let flippedPathData = pathData.replace(
	/(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)/g,
	function (match, x, _, y) {
		let point = svg.createSVGPoint();
		point.x = parseFloat(x);
		point.y = parseFloat(y);
		point = point.matrixTransform(transformMatrix);
		return point.x + " " + point.y;
	}
);

// Update the path data without the transform attribute
svgPath.setAttribute("d", flippedPathData);

// Remove the transform attribute
svgPath.removeAttribute("transform");
console.log(svgPath);
