import { Resend } from "resend";

function esc(s: unknown) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const resendKey = env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(JSON.stringify({ ok: false, error: "Missing RESEND_API_KEY" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const {
      emailAddress,
      featuresMatterMost,
      currentPlacementSystem,
      mainChallenges,
    } = await request.json();

    if (!emailAddress) {
      return new Response(JSON.stringify({ ok: false, error: "Missing emailAddress" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const resend = new Resend(resendKey);

    const result = await resend.emails.send({
      from: "Alloc-8 <no-reply@alloc-8.co.uk>",
      to: ["info@alloc-8.co.uk"],
      replyTo: String(emailAddress),
      subject: "Join the journey: new feedback submission",
      html: `
        <h2>New feedback submission</h2>
        <p><strong>Email Address:</strong> ${esc(emailAddress)}</p>
        <p><strong>What features would matter most to you?</strong><br/>${esc(featuresMatterMost)}</p>
        <p><strong>What is your current placement system?</strong><br/>${esc(currentPlacementSystem)}</p>
        <p><strong>What are the main challenges with your current system?</strong><br/>${esc(mainChallenges)}</p>
      `,
    });

    // You can keep this during testing; remove later if you want
    return new Response(JSON.stringify({ ok: true, id: result.data?.id ?? null }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message ?? err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};
