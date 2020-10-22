v3

---

After using this in a few projects there have been a few pain points.

Therefore it makes sense to try and resolve these; but to do so will require a
slight change of design.

In particular:

- Removing libraries in favour of letting users simply copy paste what they need
- using @import for imports, and only allow importing of CSS.
- creating a simpler, more abbreviated and purpose designed language for ainsley
  that is used to generate the over the wire JSON
- better optimizations for the over the wire JSON
- removing the overcomplicated inheritance of variables

Been experimenting with different ideas, this is what I have so far:

```none
%breakpoints: [600, 800, 1000, 1200]
%pseudo: full | abbreviated | no | split | []

${scale}px: [0, 1, 2, 3, (4,8,16..1024), (6,12,24..1536), 11111111, 50%, 100%, 100vh, 100vw]
${scale-with-negative}px: [{scale}, -1, -2, -3, (-4,-8,-16..-1024), (-6,-12,-24..-1536), -11111111, -50%, -100%, -100vh, -100vw]
${overflow}: [hidden, scroll, auto, visible]

@import https://gist.githubusercontent.com/tbjgolden/3277a380d335803632765c2647c1a028/raw/f9300f4910c1a517820c87c0136cd593c07c13b8/hard-reset.css;

{scalar}: {scale}
{direction}: {scale}
{flexCrossAxes}: {scale}
color: {colors}
background-color: {colors}
font-size: {headerTypeScale}; line-height: 1.2
font-size: {copyTypeScale}; line-height: 1.3
padding: {scale}
padding-{direction}: {scale}
background-position: {xLoc} {yLoc}
border-{direction}: {scale} solid {colors}
flex: {flexChange} {flexChange} {flexBasis}
overflow: {overflow} {overflow}
display: [inline, block, flex, none, inline-block, inline-flex]
text-decoration: [line-through, underline, none]
font-style: [italic, normal]
text-transform: [line-through, underline, none]
font-style: [italic, normal]
text-transform: [uppercase, lowercase]
overflow-wrap: [break-word, anywhere, normal]
background-repeat: [repeat, no-repeat]
position: [relative, absolute, fixed, sticky]
text-align: [left, center, right, justify]
vertical-align: [top, middle, bottom]
cursor: [default, pointer]
pointer-events: [none, all]
z-index: [0, 1, 2, 4, 8, 16, 32]
opacity: [0, 10, 20, 40, 80, 100]
white-space: [pre, pre-wrap, nowrap, normal]
background-size: [cover, contain]
flex-direction: [row, column, row-reverse, column-reverse]
justify-content: [center, flex-start, flex-end, space-between, space-evenly]
line-height: [1, 1.2, 1.3]
font-weight: [400, 600, 700]
margin: {scale-with-negative}
margin-{direction}: {scale-with-negative}
```

While there are definitely thought out areas of language design here, there's
also some areas that need more thinking through.

---

Performance

I've noticed some performance issues on some projects in production, which is
concerning.

There are many ways to combat this.

- Use a worker to generate the CSS.
- Discourage excessive recursion in the language design.
- Discourage excessive recursion in the flatten/minify functions.
- Replace the config functions with something that can be better optimized.
  - could enable caching of subtrees which would allow much quicker duplication
  - also could use the CSS stylesheet api gradually to start the DOM work
    earlier
- wasm, asm or bitwise ops to improve performance.
