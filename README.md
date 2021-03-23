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

span[data-stars] {
	padding: 6px;
	font-size: 80%;
}
span[data-stars]::after {
	content: attr(data-stars) "★";
}
</style>


### Some projects:
- [As-buffer - convert anything to a nodejs buffer](https://github.com/caub/as-buffer) <span data-t="node"></span>
- [Base-conversion](https://github.com/caub/base-conv)
- [Color wheel](https://github.com/caub/color-wheel) <span data-t="react"></span> <span data-t="canvas"></span>
- [Color transform](https://github.com/caub/color-tf) <span data-t="color-model"></span>
- [CSS minifiers benchmark](https://caub.github.io/css-min-bench)
- [DOM tagged template](https://github.com/caub/dom-tagged-template)
- [Emoji-time](https://github.com/caub/emoji-time)
- [Fetchu - a simple http(s).request/fetch wrapper](https://github.com/caub/fetchu)
- [Github clean useless forks](//caub.github.io/github-clean-forks) <span data-t="GH"></span> <span data-t="graphql"></span>
- [Ktree - tree search](https://github.com/caub/ktree)
- [Material-ui-multi-select - a Gitlab-issues-filter-like component](https://github.com/caub/mui-multi-select) <span data-t="react"></span>
- [Mongo-lazy-connect - simplify mongo connection](https://github.com/caub/mongo-lazy-connect) <span data-t="node"></span>
- [Pg-tsquery - useful text-search parser](https://github.com/caub/pg-tsquery)
- [Roman-number](https://github.com/caub/roman-number)
- [Svgz - ongoing effort to enhance svgo](https://github.com/caub/svgz) <span data-t="svg"></span>
- [Todo list](https://github.com/caub/todo-list) <span data-t="react"></span> <span data-s="service-" data-t="worker"></span>


### Some scripts:

- [Maze](//caub.github.io/misc/maze) <span data-t="AI"></span>
- [Ruzzle](//caub.github.io/misc/ruzzle) <span data-t="AI"></span>
- [2048 solver](//caub.github.io/misc/2048) <span data-t="AI"></span>
- [Calculator](//caub.github.io/misc/calculator) <span data-t="parser"></span>
- [Chrome vs Firefox versions](//caub.github.io/misc/chrome-firefox-versions) <span data-t="c3js"></span> <span data-t="chartjs"></span>
- [Men vs Women athletic performances](//caub.github.io/misc/men-women-athletics-ratio) <span data-t="chartjs"></span>
- [Connect-four](//caub.github.io/misc/connect-four) <span data-t="AI"></span>
- [Github self starring ratio](//caub.github.io/misc/gh-self-star) <span data-t="GH"></span> <span data-t="graphql"></span>
- [Infinite clock](//caub.github.io/misc/infinite-clock)
- [Minimax](//caub.github.io/misc/minimax) <span data-t="AI"></span>
- [Optimize jpeg/png in browser](//caub.github.io/misc/optim) <span data-t="emscripten"></span> <span data-t="worker"></span>
- [Population density map in France](//caub.github.io/misc/population-density) <span data-t="d3js"></span>
- [Shape-outside](//caub.github.io/misc/shape-outside) <span data-t="css"></span>
- [Spreadsheet](//caub.github.io/misc/sheet) <span data-t="css-grid"></span>
- [Streams with fetch](//caub.github.io/misc/stream)
- [Storeganise logo](//caub.github.io/misc/sg-logo) <span data-t="svg"></span>
- [Some logo](//caub.github.io/misc/logo) <span data-t="svg"></span>

### Some other miscellaneous scripts:
- [Gists](https://gist.github.com/caub/public?direction=desc&sort=updated)
- [Leetcode](https://leetcode.com/caub/) ([median-of-sorted-arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/discuss/2504/Median-of-2-sorted-arrays-in-JS), [super-pow](https://leetcode.com/problems/super-pow/discuss/154516/JS-solution-(without-and-with-BigInt)))
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

document.querySelector('h1 > a').href = '//github.com/caub/misc';

document.querySelectorAll('#some-projects + ul li').forEach(async li => {
	const a = li.querySelector('a'), url = new URL(a.href);
	const p = url.pathname.slice(1).split('/');
	const r = await fetch(`https://api.github.com/repos/${p[p.length-2]||url.hostname.split('.',1)[0]}/${p[p.length-1]}`).then(r => r.json());
	if (r.stargazers_count) {
		const span = document.createElement('span');
		span.dataset.stars = r.stargazers_count;
		li.append(span);
	}
});
</script>
