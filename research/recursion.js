const input = [
  [
    ["o-", ":hover"],
    ["o-", ":focus"],
    ["o-", ":active"]
  ],
  [
    ["s-", "@media(min-width:384px)"],
    ["m-", "@media(min-width:768px)"],
    ["l-", "@media(min-width:1024px)"],
    ["x-", "@media(min-width:1536px)"]
  ]
];

// prettier-ignore
const expected = [
  [["", ""], ["", ""]],
  [["", ""], ["s-", "@media(min-width:384px)"]],
  [["", ""], ["m-", "@media(min-width:768px)"]],
  [["", ""], ["l-", "@media(min-width:1024px)"]],
  [["", ""], ["x-", "@media(min-width:1536px)"]],
  [["o-", ":hover"], ["", ""]],
  [["o-", ":hover"], ["s-", "@media(min-width:384px)"]],
  [["o-", ":hover"], ["m-", "@media(min-width:768px)"]],
  [["o-", ":hover"], ["l-", "@media(min-width:1024px)"]],
  [["o-", ":hover"], ["x-", "@media(min-width:1536px)"]],
  [["o-", ":focus"], ["", ""]],
  [["o-", ":focus"], ["s-", "@media(min-width:384px)"]],
  [["o-", ":focus"], ["m-", "@media(min-width:768px)"]],
  [["o-", ":focus"], ["l-", "@media(min-width:1024px)"]],
  [["o-", ":focus"], ["x-", "@media(min-width:1536px)"]],
  [["o-", ":active"], ["", ""]],
  [["o-", ":active"], ["s-", "@media(min-width:384px)"]],
  [["o-", ":active"], ["m-", "@media(min-width:768px)"]],
  [["o-", ":active"], ["l-", "@media(min-width:1024px)"]],
  [["o-", ":active"], ["x-", "@media(min-width:1536px)"]]
];

const combinations = mods => {
  let list = [[]];
  while (mods.length)
    list = mods.shift().flatMap(opt => list.map(prev => [...prev, opt]));
  return list;
};

const result = combinations(input.map(mod => [["", ""], ...mod]));

const expOut = expected
  .map(x => x.toString())
  .sort()
  .join(";");
const resOut = result
  .map(x => x.toString())
  .sort()
  .join(";");

if (expOut === resOut) {
  console.log("Yay success");
} else {
  console.log("fail :(");
  console.log("expected");
  console.log(expected);
  console.log("but got");
  console.log(JSON.stringify(result, null, 2));
}
