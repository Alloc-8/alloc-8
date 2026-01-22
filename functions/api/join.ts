import { Resend } from "resend";

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const resendKey = env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(JSON.stringify({ ok: false, error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const resend = new Resend(resendKey);

    const result = await resend.emails.send({
      from: "Alloc-8 <no-reply@alloc-8.co.uk>",
      to: ["info@alloc-8.co.uk"],
      replyTo: { email }, // so you can hit Reply and respond to the user
      subject: `Join the journey: ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      `,
    });

    // Temporary: include provider result for verification
    return new Response(JSON.stringify({ ok: true, result }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message ?? err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};
