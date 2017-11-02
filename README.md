<style id="custom">
body {
	background: #fafafa;
}
span[data-t]::after {
	content: attr(data-t);
	font-size: 80%;
	padding: 0px 2px;
	color: white;
	background-color: #888;
	font-weight: 600;
}
</style>

Some more or less old code

- [Maze](//caub.github.io/misc/maze) <span data-t="AI"></span>
- [Ruzzle](//caub.github.io/misc/ruzzle) <span data-t="AI"></span>
- [2048 solver](//caub.github.io/misc/2048) <span data-t="AI"></span>
- [Calculator](//caub.github.io/misc/calculator)
- [Chrome vs Firefox versions](//caub.github.io/misc/chrome-firefox-versions) <span data-t="c3js"></span> <span data-t="chartjs"></span>
- [Connect-four](//caub.github.io/misc/connect-four) <span data-t="AI"></span>
- [Infinite clock](//caub.github.io/misc/infinite-clock)
- [Minimax](//caub.github.io/misc/minimax) <span data-t="AI"></span>
- [Optimize jpeg/png in browser](//caub.github.io/misc/optim) <span data-t="emscripten"></span>
- [Population density map in France](//caub.github.io/misc/population-density)
- [Shape-outside](//caub.github.io/misc/shape-outside)
- [Spreadsheet](//caub.github.io/misc/sheet)
- [Streams with fetch](//caub.github.io/misc/stream)


<script>
const hue = w => Math.floor(360 * [...w].map(c => c.toUpperCase().charCodeAt(0)-65).filter(i => i>=0 && i<=25).reduce((t,v,i) => t + v*26**-(i+1), 0));

const tags = [...new Set(Array.from(document.querySelectorAll('span[data-t]'), el => el.dataset.t))];
custom.textContent += tags.map(tag => `span[data-t="${tag}"]::after {
	background-color: hsl(${hue(tag)},100%,40%);
}`).join('\n');
</script>