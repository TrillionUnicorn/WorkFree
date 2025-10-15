import { G as attributes, F as stringify } from "./index2.js";
function Card($$renderer, $$props) {
  let {
    children,
    class: className = "",
    hover = false,
    glass = true,
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const baseClasses = "rounded-2xl p-6 transition-all duration-300";
  const glassClasses = glass ? "bg-glass" : "bg-slate-800/50 border border-slate-700";
  const hoverClasses = hover ? "hover:scale-105 hover:shadow-glow cursor-pointer" : "";
  $$renderer.push(`<div${attributes({
    class: `${stringify(baseClasses)} ${stringify(glassClasses)} ${stringify(hoverClasses)} ${stringify(className)}`,
    ...rest
  })}>`);
  children($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  Card as C
};
