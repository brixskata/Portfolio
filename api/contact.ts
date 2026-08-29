type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const TO_EMAIL = (process.env.CONTACT_TO_EMAIL || "brixquils16@gmail.com").trim();
const FROM_EMAIL = (process.env.CONTACT_FROM_EMAIL || "Portfolio contact <onboarding@resend.dev>").trim();
const RESEND_API_KEY = (process.env.RESEND_API_KEY || "").trim();
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const requestCounts = new Map<string, { count: number; windowStartedAt: number }>();

function json(res: ApiResponse, status: number, body: unknown) {
  return res.status(status).json(body);
}

function getClientIp(req: ApiRequest) {
  const forwarded = req.headers?.["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(",")[0]?.trim() || "unknown";
}

function allowedRequest(ip: string) {
  const now = Date.now();
  const previous = requestCounts.get(ip);
  if (!previous || now - previous.windowStartedAt >= RATE_WINDOW_MS) {
    requestCounts.set(ip, { count: 1, windowStartedAt: now });
    return true;
  }
  if (previous.count >= RATE_LIMIT) return false;
  previous.count += 1;
  return true;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  if (!allowedRequest(getClientIp(req))) return json(res, 429, { error: "Too many messages. Please try again in a moment." });
  if (!RESEND_API_KEY) return json(res, 503, { error: "The contact form is not configured yet. Please use the email link instead." });

  const body = (req.body ?? {}) as { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (body.website) return json(res, 400, { error: "Please provide valid form details." });
  if (!name || name.length > MAX_NAME_LENGTH || !email || email.length > MAX_EMAIL_LENGTH || !isValidEmail(email) || !message || message.length > MAX_MESSAGE_LENGTH) {
    return json(res, 400, { error: "Please check your name, email, and message." });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) return json(res, 502, { error: "Your message could not be sent right now. Please use the email link instead." });
    return json(res, 200, { message: "Thanks — your message has been sent." });
  } catch {
    return json(res, 500, { error: "Something went wrong while sending your message." });
  }
}
