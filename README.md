<style id="customStyle">
body {
	background: #fafafa;
}
span[data-t]::after {
	content: attr(data-t);
}
span[data-s]::before {
	content: attr(data-s);
}

span[data-t] {
	padding: 2px;
	font-size: 80%;
	color: white;
	font-weight: 600;
}
</style>

### Some scripts:

- [Maze](//caub.github.io/misc/maze) <span data-t="AI"></span>
- [Ruzzle](//caub.github.io/misc/ruzzle) <span data-t="AI"></span>
- [2048 solver](//caub.github.io/misc/2048) <span data-t="AI"></span>
- [Calculator](//caub.github.io/misc/calculator) <span data-t="parser"></span>
- [Chrome vs Firefox versions](//caub.github.io/misc/chrome-firefox-versions) <span data-t="c3js"></span> <span data-t="chartjs"></span>
- [Connect-four](//caub.github.io/misc/connect-four) <span data-t="AI"></span>
- [Github clean useless forks](//caub.github.io/misc/gh-clean-forks) <span data-t="GH"></span> <span data-t="graphql"></span>
- [Github self starring ratio](//caub.github.io/misc/gh-self-star) <span data-t="GH"></span> <span data-t="graphql"></span>
- [Infinite clock](//caub.github.io/misc/infinite-clock)
- [Minimax](//caub.github.io/misc/minimax) <span data-t="AI"></span>
- [Optimize jpeg/png in browser](//caub.github.io/misc/optim) <span data-t="emscripten"></span> <span data-t="worker"></span>
- [Population density map in France](//caub.github.io/misc/population-density) <span data-t="d3js"></span>
- [Shape-outside](//caub.github.io/misc/shape-outside) <span data-t="css"></span>
- [Spreadsheet](//caub.github.io/misc/sheet) <span data-t="css-grid"></span>
- [Streams with fetch](//caub.github.io/misc/stream)
- [SVG custom logo](//caub.github.io/misc/logo) <span data-t="svg"></span>

### Some projects:
- [DOM tagged template](https://github.com/caub/dom-tagged-template)
- [Todo list](https://github.com/caub/todo-list) <span data-t="react"></span> <span data-s="service-" data-t="worker"></span>
- [Color wheel](https://github.com/caub/color-wheel) <span data-t="react"></span>
- [Color util](https://github.com/caub/colorutil) <span data-t="color-model"></span>
- [CSS minifiers benchmark](https://caub.github.io/css-min-bench)

### Some other miscellaneous scripts:
- [Gists](https://gist.github.com/caub/public?direction=desc&sort=updated)
- [Leetcode](https://discuss.leetcode.com/user/caub) ([median-of-sorted-arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/discuss/2504/Median-of-2-sorted-arrays-in-JS))
- [Repl.it](https://repl.it/@caub)
- [Runkit](https://runkit.com/caub)
- [Blog](http://cauburtin.blogspot.fr)


<script>
const Y1 = 32, D1 = Y1 / 370, D2 = (1296-Y1)/(1296-370);
const f = x => x >= 370 ? Y1+D2*(x-370) : D1*x;
const hue = w => Math.floor(360 * w.match(/..?/g).map(s => parseInt(s, 36)).reduce((t,v,i) => t + f(v)*1296**-(i+1), 0));

const tags = [...new Set(Array.from(document.querySelectorAll('span[data-t]'), el => el.dataset.t))];
customStyle.textContent += tags.map(tag => `span[data-t="${tag}"] {
	background-color: hsla(${hue(tag)},100%,45%,.85);
}`).join('\n');
</script>
