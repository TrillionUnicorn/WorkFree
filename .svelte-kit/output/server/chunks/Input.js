import { y as attr, G as attributes, F as stringify, J as bind_props } from "./index2.js";
import { e as escape_html } from "./context.js";
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      label,
      error,
      value = "",
      class: className = "",
      $$slots,
      $$events,
      ...rest
    } = $$props;
    const baseClasses = "w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300";
    const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";
    $$renderer2.push(`<div class="w-full">`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label class="block text-sm font-medium text-slate-300 mb-2"${attr("for", rest.id || rest.name)}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <input${attributes(
      {
        value,
        class: `${stringify(baseClasses)} ${stringify(errorClasses)} ${stringify(className)}`,
        id: rest.id || rest.name,
        ...rest
      },
      void 0,
      void 0,
      void 0,
      4
    )}/> `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="mt-1 text-sm text-red-400">${escape_html(error)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { value });
  });
}
export {
  Input as I
};
