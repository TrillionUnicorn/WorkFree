import { G as attributes, F as stringify } from "./index2.js";
function Button($$renderer, $$props) {
  let {
    variant = "primary",
    size = "md",
    children,
    loading = false,
    class: className = "",
    $$slots,
    $$events,
    ...rest
  } = $$props;
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-lg hover:shadow-glow",
    secondary: "bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 text-white shadow-lg hover:shadow-glow",
    outline: "border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10",
    ghost: "text-primary-400 hover:bg-primary-500/10"
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  const baseClasses = "font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";
  $$renderer.push(`<button${attributes({
    class: `${stringify(baseClasses)} ${stringify(variantClasses[variant])} ${stringify(sizeClasses[size])} ${stringify(className)}`,
    disabled: loading,
    ...rest
  })}>`);
  if (loading) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  children($$renderer);
  $$renderer.push(`<!----></button>`);
}
export {
  Button as B
};
