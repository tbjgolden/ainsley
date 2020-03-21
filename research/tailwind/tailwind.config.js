module.exports = {
  theme: {
    textIndent: (theme, { negative }) => ({ sm: "2rem" })
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled"
  ],
  plugins: [
    require("tailwindcss-text-indent"),
    require("tailwindcss-image-rendering"),
    require("tailwindcss-filters"),
    require("tailwind-caret-color"),
    require("tailwindcss-blend-mode"),
    require("tailwindcss-colorize"),
    require("tailwindcss-writing-mode"),
    require("tailwindcss-hyphens"),
    require("tailwindcss-list-reset"),
    require("tailwindcss-flexbox-order"),
    require("tailwindcss-scroll-snap")
  ]
};
