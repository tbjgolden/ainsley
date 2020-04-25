// singleton embed pattern, using id as the unique identifier
export const embed = (css: string, id?: string): void => {
  let styleEl: HTMLStyleElement | null = null;
  if (id !== undefined) styleEl = document.querySelector(`style#${id}`);

  if (styleEl === null) {
    styleEl = document.createElement("style");
    styleEl.type = "text/css";
    if (id !== undefined) styleEl.setAttribute("id", id);
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = css;
};
