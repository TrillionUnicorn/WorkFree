import { y as attr, G as attributes, F as stringify, J as bind_props, z as head, x as ensure_array_like } from "../../../chunks/index2.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { I as Input } from "../../../chunks/Input.js";
import { e as escape_html } from "../../../chunks/context.js";
function Textarea($$renderer, $$props) {
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
    const baseClasses = "w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none";
    const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";
    $$renderer2.push(`<div class="w-full">`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label class="block text-sm font-medium text-slate-300 mb-2"${attr("for", rest.id || rest.name)}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <textarea${attributes({
      class: `${stringify(baseClasses)} ${stringify(errorClasses)} ${stringify(className)}`,
      id: rest.id || rest.name,
      ...rest
    })}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> `);
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let formData = { name: "", email: "", company: "", subject: "", message: "" };
    let isSubmitting = false;
    let errors = {};
    const contactInfo = [
      {
        icon: "📧",
        title: "Email",
        value: "hello@workfree.com",
        link: "mailto:hello@workfree.com"
      },
      {
        icon: "🌐",
        title: "Website",
        value: "workfree.com",
        link: "https://workfree.com"
      },
      {
        icon: "💼",
        title: "LinkedIn",
        value: "WorkFree",
        link: "https://linkedin.com/company/workfree"
      },
      {
        icon: "🐦",
        title: "Twitter",
        value: "@WorkFree",
        link: "https://twitter.com/workfree"
      }
    ];
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
    const faqs = [
      {
        question: "What is your typical response time?",
        answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please mention it in your message."
      },
      {
        question: "Do you offer demos?",
        answer: "Yes! We offer personalized demos for all potential customers. Schedule a demo through our contact form or directly via email."
      },
      {
        question: "What industries do you serve?",
        answer: "We serve 10+ industries including healthcare, manufacturing, aviation, construction, corporate training, and more."
      },
      {
        question: "Can I try WorkFree before purchasing?",
        answer: "Absolutely! We offer a 14-day free trial with full access to our platform. No credit card required."
      }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head($$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Contact WorkFree - Get in Touch</title>`);
        });
        $$renderer4.push(`<meta name="description" content="Have questions about WorkFree? Contact us for demos, support, or partnership opportunities. We respond within 24 hours."/>`);
      });
      $$renderer3.push(`<div class="min-h-screen py-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h1 class="text-5xl md:text-6xl font-bold mb-6">Get in <span class="text-gradient">Touch</span></h1> <p class="text-xl text-slate-300 max-w-3xl mx-auto">Have questions? Want to schedule a demo? We're here to help. Reach out and we'll respond within 24 hours.</p></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"><div class="lg:col-span-2">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<h2 class="text-3xl font-bold mb-6">Send us a Message</h2> <form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
          Input($$renderer4, {
            label: "Name *",
            type: "text",
            placeholder: "John Doe",
            error: errors.name,
            required: true,
            get value() {
              return formData.name;
            },
            set value($$value) {
              formData.name = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            label: "Email *",
            type: "email",
            placeholder: "john@company.com",
            error: errors.email,
            required: true,
            get value() {
              return formData.email;
            },
            set value($$value) {
              formData.email = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
          Input($$renderer4, {
            label: "Company",
            type: "text",
            placeholder: "Your Company",
            get value() {
              return formData.company;
            },
            set value($$value) {
              formData.company = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            label: "Subject",
            type: "text",
            placeholder: "How can we help?",
            get value() {
              return formData.subject;
            },
            set value($$value) {
              formData.subject = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> `);
          Textarea($$renderer4, {
            label: "Message *",
            placeholder: "Tell us about your training needs...",
            error: errors.message,
            rows: 6,
            required: true,
            get value() {
              return formData.message;
            },
            set value($$value) {
              formData.message = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          Button($$renderer4, {
            type: "submit",
            variant: "primary",
            size: "lg",
            loading: isSubmitting,
            class: "w-full",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->${escape_html("Send Message")}`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--></form>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-6">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<h3 class="text-2xl font-bold mb-6">Contact Information</h3> <div class="space-y-4"><!--[-->`);
          const each_array = ensure_array_like(contactInfo);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let info = each_array[$$index];
            $$renderer4.push(`<a${attr("href", info.link)} target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors duration-300"><div class="text-3xl">${escape_html(info.icon)}</div> <div><div class="text-sm text-slate-400">${escape_html(info.title)}</div> <div class="font-semibold text-primary-400">${escape_html(info.value)}</div></div></a>`);
          }
          $$renderer4.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<h3 class="text-2xl font-bold mb-6">Follow Us</h3> <div class="flex flex-wrap gap-3"><!--[-->`);
          const each_array_1 = ensure_array_like(socialLinks);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let social = each_array_1[$$index_1];
            $$renderer4.push(`<a${attr("href", social.href)} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300"${attr("aria-label", social.name)}><span class="text-2xl">${escape_html(social.icon)}</span> <span class="text-sm font-semibold">${escape_html(social.name)}</span></a>`);
          }
          $$renderer4.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "bg-gradient-to-br from-primary-900/30 to-secondary-900/30 border border-primary-500/30",
        children: ($$renderer4) => {
          $$renderer4.push(`<h3 class="text-xl font-bold mb-3">⏱️ Response Time</h3> <p class="text-slate-300 text-sm mb-4">We typically respond within <span class="text-primary-400 font-semibold">24 hours</span> during business days.</p> <p class="text-slate-400 text-xs">Business Hours: Monday - Friday, 9 AM - 6 PM PST</p>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <section>`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<h2 class="text-4xl font-bold mb-8 text-center">Frequently Asked <span class="text-gradient">Questions</span></h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
          const each_array_2 = ensure_array_like(faqs);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let faq = each_array_2[$$index_2];
            $$renderer4.push(`<div class="bg-slate-800/50 rounded-lg p-6"><h3 class="text-lg font-bold mb-3 text-primary-400">${escape_html(faq.question)}</h3> <p class="text-slate-300">${escape_html(faq.answer)}</p></div>`);
          }
          $$renderer4.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></section> <section class="mt-20">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<h2 class="text-4xl font-bold mb-8 text-center">Meet the <span class="text-gradient">Team</span></h2> <div class="max-w-2xl mx-auto"><div class="bg-slate-800/50 rounded-lg p-8 text-center"><div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">👨‍💻</div> <h3 class="text-2xl font-bold mb-2">Hunter Ho</h3> <p class="text-primary-400 mb-4">Founder &amp; CEO</p> <p class="text-slate-300 mb-6">Former VR/AR engineer with 15+ years of experience in training technology and simulation. Passionate about making dangerous jobs safer through technology.</p> <div class="flex justify-center gap-4"><a href="https://github.com/HunterHo07" target="_blank" rel="noopener noreferrer" class="text-2xl hover:scale-110 transition-transform duration-300">🔗</a> <a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="text-2xl hover:scale-110 transition-transform duration-300">💼</a></div></div></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></section></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
