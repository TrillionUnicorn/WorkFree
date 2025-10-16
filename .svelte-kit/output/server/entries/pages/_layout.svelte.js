import { x as ensure_array_like, y as attr, z as head } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { B as Button } from "../../chunks/Button.js";
import { e as escape_html } from "../../chunks/context.js";
const favicon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.157%2022.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282%2029.608A29.92%2029.92%200%200%200%208.764%2049.65a31.5%2031.5%200%200%200%203.108%2020.231%2030%2030%200%200%200-4.477%2011.183%2031.9%2031.9%200%200%200%205.448%2024.116c10.402%2014.887%2030.942%2019.297%2045.791%209.835l26.083-16.624A29.92%2029.92%200%200%200%2098.235%2078.35a31.53%2031.53%200%200%200-3.105-20.232%2030%2030%200%200%200%204.474-11.182%2031.88%2031.88%200%200%200-5.447-24.116'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.817%20106.582a20.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.503%2018%2018%200%200%201%20.624-2.435l.49-1.498%201.337.981a33.6%2033.6%200%200%200%2010.203%205.098l.97.294-.09.968a5.85%205.85%200%200%200%201.052%203.878%206.24%206.24%200%200%200%206.695%202.485%205.8%205.8%200%200%200%201.603-.704L69.27%2076.28a5.43%205.43%200%200%200%202.45-3.631%205.8%205.8%200%200%200-.987-4.371%206.24%206.24%200%200%200-6.698-2.487%205.7%205.7%200%200%200-1.6.704l-9.953%206.345a19%2019%200%200%201-5.296%202.326%2020.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.502%2017.99%2017.99%200%200%201%208.13-12.052l26.081-16.623a19%2019%200%200%201%205.3-2.329%2020.72%2020.72%200%200%201%2022.237%208.243%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-.624%202.435l-.49%201.498-1.337-.98a33.6%2033.6%200%200%200-10.203-5.1l-.97-.294.09-.968a5.86%205.86%200%200%200-1.052-3.878%206.24%206.24%200%200%200-6.696-2.485%205.8%205.8%200%200%200-1.602.704L37.73%2051.72a5.42%205.42%200%200%200-2.449%203.63%205.79%205.79%200%200%200%20.986%204.372%206.24%206.24%200%200%200%206.698%202.486%205.8%205.8%200%200%200%201.602-.704l9.952-6.342a19%2019%200%200%201%205.295-2.328%2020.72%2020.72%200%200%201%2022.237%208.242%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-8.13%2012.053l-26.081%2016.622a19%2019%200%200%201-5.3%202.328'%20style='fill:%23fff'/%3e%3c/svg%3e";
function Navigation($$renderer) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Product" },
    { href: "/pitch", label: "Pitch Deck" },
    { href: "/contact", label: "Contact" }
  ];
  $$renderer.push(`<nav class="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/10"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><a href="/" class="flex items-center space-x-2 group"><div class="text-3xl group-hover:scale-110 transition-transform duration-300">🎯</div> <span class="text-xl font-bold text-gradient">WorkFree</span></a> <div class="hidden md:flex items-center space-x-8"><!--[-->`);
  const each_array = ensure_array_like(navLinks);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$renderer.push(`<a${attr("href", link.href)} class="text-slate-300 hover:text-white transition-colors duration-300 font-medium relative group">${escape_html(link.label)} <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></span></a>`);
  }
  $$renderer.push(`<!--]--></div> <div class="hidden md:block">`);
  Button($$renderer, {
    variant: "primary",
    size: "sm",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Join Waitlist`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div> <button class="md:hidden text-white p-2" aria-label="Toggle menu">`);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
  }
  $$renderer.push(`<!--]--></button></div></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></nav> <div class="h-16"></div>`);
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const footerLinks = {
      product: [
        { label: "Features", href: "/product#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Demo", href: "/product" },
        { label: "Roadmap", href: "/pitch#roadmap" }
      ],
      company: [
        { label: "About", href: "/#mission" },
        { label: "Pitch Deck", href: "/pitch" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/contact" }
      ],
      resources: [
        { label: "Documentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Community", href: "#" },
        { label: "Support", href: "/contact" }
      ],
      legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "GDPR", href: "#" }
      ]
    };
    const socialLinks = [
      {
        name: "GitHub",
        icon: "🔗",
        href: "https://github.com/HunterHo07"
      },
      {
        name: "LinkedIn",
        icon: "💼",
        href: "https://linkedin.com/company/workfree"
      },
      {
        name: "Twitter",
        icon: "🐦",
        href: "https://twitter.com/workfree"
      },
      {
        name: "Discord",
        icon: "💬",
        href: "https://discord.gg/workfree"
      },
      {
        name: "YouTube",
        icon: "📺",
        href: "https://youtube.com/workfree"
      }
    ];
    $$renderer2.push(`<footer class="bg-slate-950 border-t border-white/10 mt-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8"><div class="col-span-2 md:col-span-4 lg:col-span-1"><a href="/" class="flex items-center space-x-2 mb-4 group"><div class="text-3xl group-hover:scale-110 transition-transform duration-300">🎯</div> <span class="text-xl font-bold text-gradient">WorkFree</span></a> <p class="text-slate-400 text-sm mb-4">Immersive training simulations for the future of workplace learning.</p> <div class="flex space-x-3"><!--[-->`);
    const each_array = ensure_array_like(socialLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let social = each_array[$$index];
      $$renderer2.push(`<a${attr("href", social.href)} target="_blank" rel="noopener noreferrer" class="text-2xl hover:scale-110 transition-transform duration-300"${attr("aria-label", social.name)}>${escape_html(social.icon)}</a>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div><h3 class="text-white font-semibold mb-4">Product</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(footerLinks.product);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let link = each_array_1[$$index_1];
      $$renderer2.push(`<li><a${attr("href", link.href)} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div><h3 class="text-white font-semibold mb-4">Company</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_2 = ensure_array_like(footerLinks.company);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let link = each_array_2[$$index_2];
      $$renderer2.push(`<li><a${attr("href", link.href)} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div><h3 class="text-white font-semibold mb-4">Resources</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_3 = ensure_array_like(footerLinks.resources);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let link = each_array_3[$$index_3];
      $$renderer2.push(`<li><a${attr("href", link.href)} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div><h3 class="text-white font-semibold mb-4">Legal</h3> <ul class="space-y-2"><!--[-->`);
    const each_array_4 = ensure_array_like(footerLinks.legal);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let link = each_array_4[$$index_4];
      $$renderer2.push(`<li><a${attr("href", link.href)} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">${escape_html(link.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div> <div class="border-t border-white/10 pt-8"><div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"><p class="text-slate-400 text-sm">© ${escape_html(currentYear)} WorkFree. All rights reserved.</p> <div class="flex items-center space-x-4 text-sm text-slate-400"><span>Built with ❤️ by Hunter Ho</span> <span>•</span> <a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">Portfolio</a></div></div></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head($$renderer, ($$renderer2) => {
    $$renderer2.push(`<link rel="icon"${attr("href", favicon)}/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/>`);
  });
  $$renderer.push(`<div class="min-h-screen flex flex-col">`);
  Navigation($$renderer);
  $$renderer.push(`<!----> <main class="flex-1">`);
  children?.($$renderer);
  $$renderer.push(`<!----></main> `);
  Footer($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
