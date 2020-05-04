import "./index.css";
import { embed } from "../../entrypoints/ainsley.client";
import { tachyonsAinsley } from "./ainsley";

const addAinsleyToDOM = async () => {
  const css = await tachyonsAinsley();
  embed(css);
  document.body.style.display = "block";
};

addAinsleyToDOM().catch(console.error);
