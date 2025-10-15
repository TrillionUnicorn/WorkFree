import { json } from "@sveltejs/kit";
const waitlist = [];
const POST = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return json({ error: "Invalid email address" }, { status: 400 });
    }
    const exists = waitlist.some((entry) => entry.email === email);
    if (exists) {
      return json({ error: "Email already registered" }, { status: 409 });
    }
    waitlist.push({
      email,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`New waitlist signup: ${email}`);
    return json({ success: true, message: "Successfully joined waitlist" });
  } catch (error) {
    console.error("Waitlist error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
const GET = async () => {
  return json({ count: waitlist.length });
};
export {
  GET,
  POST
};
