import { z as head, x as ensure_array_like, F as stringify } from "../../chunks/index2.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { B as Button } from "../../chunks/Button.js";
import { C as Card } from "../../chunks/Card.js";
import { I as Input } from "../../chunks/Input.js";
import { e as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    let email = "";
    let isSubmitting = false;
    const features = [
      {
        icon: "🥽",
        title: "Immersive VR/AR Training",
        description: "Full immersion in 3D training environments with photorealistic graphics and spatial audio."
      },
      {
        icon: "🤖",
        title: "AI-Powered Personalization",
        description: "Adaptive learning paths that adjust difficulty based on your performance in real-time."
      },
      {
        icon: "🎯",
        title: "Risk-Free Practice",
        description: "Practice dangerous scenarios safely without real-world consequences or expensive equipment."
      },
      {
        icon: "📊",
        title: "Deep Analytics",
        description: "Track progress, identify knowledge gaps, and measure training effectiveness with precision."
      },
      {
        icon: "🏆",
        title: "90% Retention Rate",
        description: "Achieve 3x better knowledge retention compared to traditional training methods."
      },
      {
        icon: "💰",
        title: "70% Cost Savings",
        description: "Reduce training costs dramatically while improving outcomes and safety."
      }
    ];
    const howItWorks = [
      {
        step: "1",
        title: "Choose Your Training",
        description: "Select from 500+ pre-built simulations or create custom scenarios for your specific needs.",
        icon: "🎮"
      },
      {
        step: "2",
        title: "Immerse & Learn",
        description: "Put on your VR headset and experience realistic training with AI coaching and haptic feedback.",
        icon: "🥽"
      },
      {
        step: "3",
        title: "Track & Improve",
        description: "Review detailed analytics, get personalized recommendations, and continuously improve your skills.",
        icon: "📈"
      }
    ];
    const pricingTiers = [
      {
        name: "Starter",
        price: "$49",
        originalPrice: "$99",
        period: "/month",
        description: "Perfect for small teams and pilot programs",
        features: [
          "50+ pre-built scenarios",
          "Up to 25 users",
          "Basic VR support",
          "Progress tracking",
          "Email support"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "Professional",
        price: "$249",
        originalPrice: "$499",
        period: "/month",
        description: "For growing teams and departments",
        features: [
          "Everything in Starter",
          "Custom scenarios",
          "Up to 500 users",
          "Advanced VR/AR support",
          "AI personalization",
          "Advanced analytics",
          "Priority support"
        ],
        cta: "Start Free Trial",
        popular: true
      },
      {
        name: "Enterprise",
        price: "$1,499",
        originalPrice: "$2,999",
        period: "/month",
        description: "For large organizations",
        features: [
          "Everything in Professional",
          "Unlimited users",
          "White-label platform",
          "API integration",
          "Custom development",
          "Dedicated success manager",
          "On-site training"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head($$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>WorkFree - Immersive VR/AR Training Platform | Transform Workplace Learning</title>`);
        });
        $$renderer4.push(`<meta name="description" content="Revolutionary VR/AR training platform with AI-powered personalization. Reduce training costs by 70% while improving retention by 400%. Join 1,000+ companies transforming workplace learning."/>`);
      });
      $$renderer3.push(`<section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"><div class="hero-bg absolute inset-0 -z-10"><div class="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-secondary-900/20 to-accent-900/20"></div> <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920')] bg-cover bg-center opacity-20"></div></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10"><div class="animate-float"><h1 class="text-5xl md:text-7xl font-bold mb-6"><span class="text-gradient">Transform Training</span> <br/> with VR &amp; AI</h1></div> <p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">The world's most advanced training simulation platform. Reduce costs by 70% while improving retention by 400%.</p> <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">`);
      Button($$renderer3, {
        variant: "primary",
        size: "lg",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Start Free Trial`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "outline",
        size: "lg",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Watch Demo`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="flex flex-wrap justify-center gap-6 text-sm text-slate-400"><div class="flex items-center gap-2"><span class="text-green-400">✓</span> <span>1,000+ Companies</span></div> <div class="flex items-center gap-2"><span class="text-green-400">✓</span> <span>500+ Simulations</span></div> <div class="flex items-center gap-2"><span class="text-green-400">✓</span> <span>90% Retention Rate</span></div> <div class="flex items-center gap-2"><span class="text-green-400">✓</span> <span>SOC 2 Certified</span></div></div></div> <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div></section> <section class="fade-in-section py-20 bg-slate-900/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold mb-4">Why Choose <span class="text-gradient">WorkFree</span>?</h2> <p class="text-xl text-slate-300 max-w-3xl mx-auto">We're not just another training platform. We're revolutionizing how the world learns.</p></div> <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      const each_array = ensure_array_like(features);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let feature = each_array[$$index];
        Card($$renderer3, {
          class: "feature-card",
          hover: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-5xl mb-4">${escape_html(feature.icon)}</div> <h3 class="text-2xl font-bold mb-3">${escape_html(feature.title)}</h3> <p class="text-slate-300">${escape_html(feature.description)}</p>`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer3.push(`<!--]--></div></div></section> <section class="fade-in-section py-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold mb-4">How It <span class="text-gradient">Works</span></h2> <p class="text-xl text-slate-300 max-w-3xl mx-auto">Get started in minutes with our simple 3-step process</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
      const each_array_1 = ensure_array_like(howItWorks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let step = each_array_1[$$index_1];
        $$renderer3.push(`<div class="relative">`);
        Card($$renderer3, {
          hover: true,
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="text-6xl mb-4">${escape_html(step.icon)}</div> <div class="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-glow">${escape_html(step.step)}</div> <h3 class="text-2xl font-bold mb-3">${escape_html(step.title)}</h3> <p class="text-slate-300">${escape_html(step.description)}</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--></div></div></section> <section id="pricing" class="fade-in-section py-20 bg-slate-900/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-bold mb-4">Simple, <span class="text-gradient">Transparent</span> Pricing</h2> <p class="text-xl text-slate-300 max-w-3xl mx-auto mb-4">50% off for early adopters. Limited time offer!</p> <div class="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold"><span>🎉</span> <span>Early Bird Pricing Active</span></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
      const each_array_2 = ensure_array_like(pricingTiers);
      for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
        let tier = each_array_2[$$index_3];
        Card($$renderer3, {
          class: `relative ${stringify(tier.popular ? "ring-2 ring-primary-500 shadow-glow-lg" : "")}`,
          hover: true,
          children: ($$renderer4) => {
            if (tier.popular) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--> <div class="text-center mb-6"><h3 class="text-2xl font-bold mb-2">${escape_html(tier.name)}</h3> <p class="text-slate-400 text-sm mb-4">${escape_html(tier.description)}</p> <div class="flex items-baseline justify-center gap-2"><span class="text-slate-500 line-through text-xl">${escape_html(tier.originalPrice)}</span> <span class="text-5xl font-bold text-gradient">${escape_html(tier.price)}</span> <span class="text-slate-400">${escape_html(tier.period)}</span></div></div> <ul class="space-y-3 mb-8"><!--[-->`);
            const each_array_3 = ensure_array_like(tier.features);
            for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
              let feature = each_array_3[$$index_2];
              $$renderer4.push(`<li class="flex items-start gap-2"><span class="text-green-400 mt-1">✓</span> <span class="text-slate-300">${escape_html(feature)}</span></li>`);
            }
            $$renderer4.push(`<!--]--></ul> `);
            Button($$renderer4, {
              variant: tier.popular ? "primary" : "outline",
              size: "lg",
              class: "w-full",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html(tier.cta)}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer3.push(`<!--]--></div></div></section> <section id="mission" class="fade-in-section py-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"><div><h2 class="text-4xl md:text-5xl font-bold mb-6">Our <span class="text-gradient">Mission</span></h2> <p class="text-xl text-slate-300 mb-6">To make dangerous jobs safer and complex skills accessible to everyone through immersive VR/AR training.</p> <p class="text-lg text-slate-400 mb-8">We believe that everyone deserves access to world-class training without the risks, costs, or limitations of traditional methods. Our platform democratizes expertise and makes learning engaging, effective, and safe.</p> <h3 class="text-3xl font-bold mb-4">Our <span class="text-gradient">Vision</span></h3> <p class="text-lg text-slate-400 mb-6">A world where anyone can master any skill safely and affordably, where workplace accidents are eliminated through perfect practice, and where learning is so engaging that it feels like play.</p> <div class="grid grid-cols-2 gap-6"><div class="bg-glass p-4 rounded-lg"><div class="text-3xl font-bold text-gradient mb-1">$366B</div> <div class="text-sm text-slate-400">Training Market</div></div> <div class="bg-glass p-4 rounded-lg"><div class="text-3xl font-bold text-gradient mb-1">2.8B</div> <div class="text-sm text-slate-400">Employees Worldwide</div></div> <div class="bg-glass p-4 rounded-lg"><div class="text-3xl font-bold text-gradient mb-1">70%</div> <div class="text-sm text-slate-400">Cost Reduction</div></div> <div class="bg-glass p-4 rounded-lg"><div class="text-3xl font-bold text-gradient mb-1">400%</div> <div class="text-sm text-slate-400">Better Retention</div></div></div></div> <div class="relative"><div class="bg-glass p-8 rounded-2xl"><div class="aspect-video bg-gradient-to-br from-primary-900/50 to-secondary-900/50 rounded-lg flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-4">🎯</div> <p class="text-xl font-semibold">Mission-Driven Innovation</p></div></div></div></div></div></div></section> <section class="fade-in-section py-20 bg-slate-900/50"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">`);
      Card($$renderer3, {
        class: "text-center",
        children: ($$renderer4) => {
          $$renderer4.push(`<h2 class="text-4xl md:text-5xl font-bold mb-4">Join the <span class="text-gradient">Waitlist</span></h2> <p class="text-xl text-slate-300 mb-8">Be among the first to experience the future of workplace training. Get early access and exclusive pricing.</p> <form class="max-w-md mx-auto"><div class="flex flex-col sm:flex-row gap-4">`);
          Input($$renderer4, {
            type: "email",
            placeholder: "Enter your email",
            required: true,
            class: "flex-1",
            get value() {
              return email;
            },
            set value($$value) {
              email = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          Button($$renderer4, {
            type: "submit",
            variant: "primary",
            size: "lg",
            loading: isSubmitting,
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->${escape_html("Join Waitlist")}`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></div> `);
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--></form> <div class="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400"><div class="flex items-center gap-2"><span>🔒</span> <span>No spam, ever</span></div> <div class="flex items-center gap-2"><span>🎁</span> <span>Exclusive early access</span></div> <div class="flex items-center gap-2"><span>💰</span> <span>Special pricing</span></div></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></section>`);
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
