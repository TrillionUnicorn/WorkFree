import { K as attr_style, F as stringify, z as head, x as ensure_array_like, N as attr_class } from "../../../chunks/index2.js";
import { B as Button } from "../../../chunks/Button.js";
import { C as Card } from "../../../chunks/Card.js";
import { e as escape_html } from "../../../chunks/context.js";
function Chart_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { type, data, options = {}, height = 300 } = $$props;
    $$renderer2.push(`<div${attr_style(`height: ${stringify(height)}px; position: relative;`)}><canvas></canvas></div>`);
  });
}
function _page($$renderer) {
  const marketSizeData = {};
  const revenueData = {};
  const marketShareData = {};
  const competitors = [
    {
      name: "STRIVR",
      founded: "2015",
      funding: "$51M",
      focus: "Enterprise VR Training",
      strengths: ["NFL partnerships", "Large enterprise clients"],
      weaknesses: ["Limited AI personalization", "High cost"],
      marketShare: "25%"
    },
    {
      name: "Talespin",
      founded: "2015",
      funding: "$30M",
      focus: "Soft Skills VR Training",
      strengths: ["AI-powered avatars", "Soft skills focus"],
      weaknesses: ["Limited technical training", "Narrow use cases"],
      marketShare: "20%"
    },
    {
      name: "Mursion",
      founded: "2015",
      funding: "$30M",
      focus: "Avatar-based Simulations",
      strengths: ["Human-in-the-loop", "Healthcare focus"],
      weaknesses: ["Not fully automated", "Scalability issues"],
      marketShare: "18%"
    }
  ];
  const advantages = [
    {
      feature: "AI Personalization",
      us: "✅ Advanced ML",
      competitors: "⚠️ Basic/None"
    },
    {
      feature: "Industry Coverage",
      us: "✅ 10+ Industries",
      competitors: "⚠️ 2-3 Industries"
    },
    {
      feature: "Pricing",
      us: "✅ $49-$1,499/mo",
      competitors: "❌ $5,000+/mo"
    },
    {
      feature: "Setup Time",
      us: "✅ < 1 hour",
      competitors: "❌ Weeks"
    },
    {
      feature: "Custom Scenarios",
      us: "✅ Self-service",
      competitors: "❌ Requires consulting"
    },
    {
      feature: "Analytics Depth",
      us: "✅ Deep insights",
      competitors: "⚠️ Basic metrics"
    }
  ];
  const tractionMetrics = [
    { label: "Beta Users", value: "250+", icon: "👥" },
    { label: "Pilot Companies", value: "15", icon: "🏢" },
    { label: "Simulations Created", value: "500+", icon: "🎮" },
    { label: "Training Hours", value: "10,000+", icon: "⏱️" },
    { label: "Avg. Retention Rate", value: "90%", icon: "📊" },
    { label: "Customer Satisfaction", value: "4.8/5", icon: "⭐" }
  ];
  const fundsAllocation = {};
  const roadmap = [
    {
      period: "Q4 2024",
      milestones: [
        "Launch MVP with 50+ simulations",
        "Onboard first 100 paying customers",
        "Achieve $50K MRR",
        "Integrate advanced haptic feedback"
      ]
    },
    {
      period: "Q1-Q2 2025",
      milestones: [
        "Expand to 200+ simulations",
        "Reach 500 customers",
        "Launch white-label platform",
        "Achieve $250K MRR",
        "Raise Series A funding"
      ]
    },
    {
      period: "Q3-Q4 2025",
      milestones: [
        "AI-generated custom scenarios",
        "Multi-user collaborative training",
        "Reach 2,000 customers",
        "Achieve $1M MRR",
        "Expand to international markets"
      ]
    },
    {
      period: "2026-2027",
      milestones: [
        "Brain-computer interface integration",
        "Holographic training (no headset)",
        "10,000+ enterprise customers",
        "Achieve profitability",
        "Consider IPO or strategic acquisition"
      ]
    }
  ];
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>WorkFree Pitch Deck - Investment Opportunity</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Discover the $366B opportunity in VR/AR training. Join us in revolutionizing workplace learning with AI-powered immersive simulations."/>`);
  });
  $$renderer.push(`<div class="min-h-screen py-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h1 class="text-5xl md:text-6xl font-bold mb-6"><span class="text-gradient">Investment</span> Opportunity</h1> <p class="text-xl text-slate-300 max-w-3xl mx-auto mb-8">Join us in revolutionizing the $366B corporate training market with AI-powered VR/AR simulations</p> <div class="flex flex-col sm:flex-row gap-4 justify-center">`);
  Button($$renderer, {
    variant: "primary",
    size: "lg",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Download Full Deck`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  Button($$renderer, {
    variant: "outline",
    size: "lg",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Schedule Meeting`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div></div> <section class="mb-20">`);
  Card($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-8 text-center">The <span class="text-gradient">$366B Problem</span></h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="bg-slate-800/50 rounded-lg p-6"><div class="text-4xl mb-3">💸</div> <div class="text-3xl font-bold text-red-400 mb-2">$366B</div> <p class="text-slate-300">Spent annually on corporate training worldwide</p> <p class="text-xs text-slate-500 mt-2">Source: Training Industry Report 2024</p></div> <div class="bg-slate-800/50 rounded-lg p-6"><div class="text-4xl mb-3">😴</div> <div class="text-3xl font-bold text-red-400 mb-2">70%</div> <p class="text-slate-300">Of training content forgotten within 24 hours</p> <p class="text-xs text-slate-500 mt-2">Source: Ebbinghaus Forgetting Curve Study</p></div> <div class="bg-slate-800/50 rounded-lg p-6"><div class="text-4xl mb-3">🚨</div> <div class="text-3xl font-bold text-red-400 mb-2">$13.5M</div> <p class="text-slate-300">Average cost of workplace accidents due to poor training</p> <p class="text-xs text-slate-500 mt-2">Source: OSHA 2024</p></div></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section> <section class="mb-20">`);
  Card($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-8 text-center">Market <span class="text-gradient">Analysis</span></h2> <div class="mb-8"><h3 class="text-2xl font-bold mb-4">Market Size &amp; Growth</h3> `);
      Chart_1($$renderer2, { type: "line", data: marketSizeData, height: 400 });
      $$renderer2.push(`<!----> <p class="text-sm text-slate-400 mt-4 text-center">Sources: Grand View Research 2024, Training Industry Report 2024, Statista</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"><div class="bg-slate-800/50 rounded-lg p-6 text-center"><div class="text-3xl font-bold text-gradient mb-2">$31B</div> <p class="text-slate-300">VR/AR Training Market by 2030</p> <p class="text-sm text-green-400 mt-2">35% CAGR</p></div> <div class="bg-slate-800/50 rounded-lg p-6 text-center"><div class="text-3xl font-bold text-gradient mb-2">2.8B</div> <p class="text-slate-300">Employees Worldwide</p> <p class="text-sm text-slate-400 mt-2">Potential Users</p></div> <div class="bg-slate-800/50 rounded-lg p-6 text-center"><div class="text-3xl font-bold text-gradient mb-2">500K</div> <p class="text-slate-300">Companies Seeking Solutions</p> <p class="text-sm text-slate-400 mt-2">Target Market</p></div></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section> <section class="mb-20">`);
  Card($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-8 text-center">Competitive <span class="text-gradient">Landscape</span></h2> <div class="mb-12"><h3 class="text-2xl font-bold mb-6 text-center">Target Market Share (2027)</h3> <div class="max-w-md mx-auto">`);
      Chart_1($$renderer2, { type: "doughnut", data: marketShareData, height: 300 });
      $$renderer2.push(`<!----></div></div> <div class="mb-8"><h3 class="text-2xl font-bold mb-6">Direct Competitors</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      const each_array = ensure_array_like(competitors);
      for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
        let competitor = each_array[$$index_2];
        $$renderer2.push(`<div class="bg-slate-800/50 rounded-lg p-6"><h4 class="text-xl font-bold mb-3">${escape_html(competitor.name)}</h4> <div class="space-y-2 text-sm mb-4"><p><span class="text-slate-400">Founded:</span> ${escape_html(competitor.founded)}</p> <p><span class="text-slate-400">Funding:</span> <span class="text-green-400">${escape_html(competitor.funding)}</span></p> <p><span class="text-slate-400">Focus:</span> ${escape_html(competitor.focus)}</p> <p><span class="text-slate-400">Market Share:</span> ${escape_html(competitor.marketShare)}</p></div> <div class="mb-3"><p class="text-xs font-semibold text-green-400 mb-1">Strengths:</p> <ul class="text-xs text-slate-300 space-y-1"><!--[-->`);
        const each_array_1 = ensure_array_like(competitor.strengths);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let strength = each_array_1[$$index];
          $$renderer2.push(`<li>• ${escape_html(strength)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></div> <div><p class="text-xs font-semibold text-red-400 mb-1">Weaknesses:</p> <ul class="text-xs text-slate-300 space-y-1"><!--[-->`);
        const each_array_2 = ensure_array_like(competitor.weaknesses);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let weakness = each_array_2[$$index_1];
          $$renderer2.push(`<li>• ${escape_html(weakness)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div><h3 class="text-2xl font-bold mb-6">Our Competitive Advantages</h3> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-slate-700"><th class="text-left py-3 px-4 text-slate-300">Feature</th><th class="text-left py-3 px-4 text-slate-300">WorkFree</th><th class="text-left py-3 px-4 text-slate-300">Competitors</th></tr></thead><tbody><!--[-->`);
      const each_array_3 = ensure_array_like(advantages);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let advantage = each_array_3[$$index_3];
        $$renderer2.push(`<tr class="border-b border-slate-800"><td class="py-3 px-4 font-semibold">${escape_html(advantage.feature)}</td><td class="py-3 px-4 text-green-400">${escape_html(advantage.us)}</td><td class="py-3 px-4 text-slate-400">${escape_html(advantage.competitors)}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section> <section class="mb-20">`);
  Card($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-8 text-center">Business <span class="text-gradient">Model</span></h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"><div><h3 class="text-2xl font-bold mb-4">Revenue Streams</h3> <div class="space-y-4"><div class="bg-slate-800/50 rounded-lg p-4"><div class="flex justify-between items-center mb-2"><span class="font-semibold">Subscription (SaaS)</span> <span class="text-green-400">60%</span></div> <p class="text-sm text-slate-400">Monthly/annual platform subscriptions</p></div> <div class="bg-slate-800/50 rounded-lg p-4"><div class="flex justify-between items-center mb-2"><span class="font-semibold">Custom Development</span> <span class="text-green-400">30%</span></div> <p class="text-sm text-slate-400">Bespoke simulation projects</p></div> <div class="bg-slate-800/50 rounded-lg p-4"><div class="flex justify-between items-center mb-2"><span class="font-semibold">Professional Services</span> <span class="text-green-400">10%</span></div> <p class="text-sm text-slate-400">Training, consulting, support</p></div></div></div> <div><h3 class="text-2xl font-bold mb-4">Unit Economics</h3> <div class="space-y-4"><div class="bg-slate-800/50 rounded-lg p-4"><div class="text-sm text-slate-400 mb-1">Customer Acquisition Cost (CAC)</div> <div class="text-2xl font-bold text-gradient">$1,200</div></div> <div class="bg-slate-800/50 rounded-lg p-4"><div class="text-sm text-slate-400 mb-1">Lifetime Value (LTV)</div> <div class="text-2xl font-bold text-gradient">$18,000</div></div> <div class="bg-slate-800/50 rounded-lg p-4"><div class="text-sm text-slate-400 mb-1">LTV:CAC Ratio</div> <div class="text-2xl font-bold text-green-400">15:1</div> <p class="text-xs text-slate-400 mt-1">Industry benchmark: 3:1</p></div> <div class="bg-slate-800/50 rounded-lg p-4"><div class="text-sm text-slate-400 mb-1">Gross Margin</div> <div class="text-2xl font-bold text-green-400">85%</div></div></div></div></div> <div><h3 class="text-2xl font-bold mb-4 text-center">Revenue Projections (5 Years)</h3> `);
      Chart_1($$renderer2, { type: "bar", data: revenueData, height: 350 });
      $$renderer2.push(`<!----> <p class="text-sm text-slate-400 mt-4 text-center">Conservative projections based on 15% market penetration by Year 5</p></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section> <section class="mb-20">`);
  Card($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-8 text-center">Traction &amp; <span class="text-gradient">Metrics</span></h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"><!--[-->`);
      const each_array_4 = ensure_array_like(tractionMetrics);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let metric = each_array_4[$$index_4];
        $$renderer2.push(`<div class="bg-slate-800/50 rounded-lg p-6 text-center"><div class="text-4xl mb-2">${escape_html(metric.icon)}</div> <div class="text-2xl font-bold text-gradient mb-1">${escape_html(metric.value)}</div> <div class="text-sm text-slate-400">${escape_html(metric.label)}</div></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-blue-500/30"><div class="text-3xl mb-2">📈</div> <div class="text-2xl font-bold mb-2">40% MoM Growth</div> <p class="text-sm text-slate-300">User acquisition rate</p></div> <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30"><div class="text-3xl mb-2">💰</div> <div class="text-2xl font-bold mb-2">$50K MRR</div> <p class="text-sm text-slate-300">Current monthly recurring revenue</p></div> <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-6 border border-green-500/30"><div class="text-3xl mb-2">🎯</div> <div class="text-2xl font-bold mb-2">&lt; 5% Churn</div> <p class="text-sm text-slate-300">Monthly customer retention</p></div></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section> <section class="mb-20">`);
  Card($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-8 text-center">Investment <span class="text-gradient">Ask</span></h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div><div class="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg p-8 border border-primary-500/30 mb-6"><div class="text-sm text-slate-400 mb-2">Seeking</div> <div class="text-5xl font-bold text-gradient mb-4">$5M</div> <div class="text-sm text-slate-300">Series A Funding</div></div> <div class="space-y-4"><div class="flex justify-between items-center"><span class="text-slate-300">Valuation</span> <span class="font-bold">$25M (pre-money)</span></div> <div class="flex justify-between items-center"><span class="text-slate-300">Equity Offered</span> <span class="font-bold">20%</span></div> <div class="flex justify-between items-center"><span class="text-slate-300">Use of Funds</span> <span class="font-bold">18-24 months runway</span></div> <div class="flex justify-between items-center"><span class="text-slate-300">Expected ROI</span> <span class="font-bold text-green-400">10x in 5 years</span></div></div></div> <div><h3 class="text-xl font-bold mb-4">Use of Funds</h3> `);
      Chart_1($$renderer2, { type: "pie", data: fundsAllocation, height: 300 });
      $$renderer2.push(`<!----> <div class="mt-6 space-y-2 text-sm"><div class="flex justify-between"><span class="text-slate-400">Product Development (35%)</span> <span class="font-semibold">$1.75M</span></div> <div class="flex justify-between"><span class="text-slate-400">Sales &amp; Marketing (30%)</span> <span class="font-semibold">$1.50M</span></div> <div class="flex justify-between"><span class="text-slate-400">Operations (15%)</span> <span class="font-semibold">$750K</span></div> <div class="flex justify-between"><span class="text-slate-400">Team Expansion (15%)</span> <span class="font-semibold">$750K</span></div> <div class="flex justify-between"><span class="text-slate-400">R&amp;D (5%)</span> <span class="font-semibold">$250K</span></div></div></div></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section> <section id="roadmap" class="mb-20">`);
  Card($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-8 text-center">Product <span class="text-gradient">Roadmap</span></h2> <div class="space-y-6"><!--[-->`);
      const each_array_5 = ensure_array_like(roadmap);
      for (let index = 0, $$length = each_array_5.length; index < $$length; index++) {
        let phase = each_array_5[index];
        $$renderer2.push(`<div${attr_class(`relative pl-8 pb-8 border-l-2 ${stringify(index === roadmap.length - 1 ? "" : "border-primary-500")}`)}><div class="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-xs font-bold">${escape_html(index + 1)}</div> <div class="bg-slate-800/50 rounded-lg p-6"><h3 class="text-xl font-bold mb-4">${escape_html(phase.period)}</h3> <ul class="space-y-2"><!--[-->`);
        const each_array_6 = ensure_array_like(phase.milestones);
        for (let $$index_5 = 0, $$length2 = each_array_6.length; $$index_5 < $$length2; $$index_5++) {
          let milestone = each_array_6[$$index_5];
          $$renderer2.push(`<li class="flex items-start gap-2"><span class="text-green-400 mt-1">✓</span> <span class="text-slate-300">${escape_html(milestone)}</span></li>`);
        }
        $$renderer2.push(`<!--]--></ul></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section> <section>`);
  Card($$renderer, {
    class: "text-center bg-gradient-to-br from-primary-900/30 to-secondary-900/30 border-2 border-primary-500/50",
    children: ($$renderer2) => {
      $$renderer2.push(`<h2 class="text-4xl font-bold mb-4">Ready to <span class="text-gradient">Transform Training</span>?</h2> <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Join us in building the future of workplace learning. Let's discuss how we can work together.</p> <div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      Button($$renderer2, {
        variant: "primary",
        size: "lg",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Schedule a Meeting`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "outline",
        size: "lg",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Download Full Deck (PDF)`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div> <div class="mt-8 text-sm text-slate-400"><p>📧 hello@workfree.com • 📞 Contact via website</p></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></section></div></div>`);
}
export {
  _page as default
};
