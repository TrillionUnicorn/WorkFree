import { json } from "@sveltejs/kit";
const contacts = [];
const POST = async ({ request }) => {
  try {
    const { name, email, company, subject, message } = await request.json();
    if (!name || !email || !message) {
      return json({ error: "Name, email, and message are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: "Invalid email address" }, { status: 400 });
    }
    contacts.push({
      name,
      email,
      company,
      subject,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`New contact submission from: ${name} (${email})`);
    return json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
const GET = async () => {
  return json({ count: contacts.length });
};
export {
  GET,
  POST
};
