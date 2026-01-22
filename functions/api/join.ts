import { Resend } from "resend";

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing fields" }),
        { status: 400 }
      );
    }

    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Alloc-8 <no-reply@alloc-8.co.uk>",
      to: "info@alloc-8.co.uk",
      replyTo: email,
      subject: `Join the journey: ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: "Server error" }),
      { status: 500 }
    );
  }
};
