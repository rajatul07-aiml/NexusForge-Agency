import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, service, description } = body;

    // Validation
    if (!fullName || !email || !description) {
      return NextResponse.json(
        { error: "Please provide your name, email, and service description." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing from environment variables.");
      return NextResponse.json(
        {
          error:
            "Email service configuration missing. Please add RESEND_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    // HTML Email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 24px; color: #1e293b; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #0A0A0B; padding: 24px 32px; color: #ffffff; border-bottom: 3px solid #6366F1; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 4px 0 0; color: #94A3B8; font-size: 13px; }
            .content { padding: 32px; }
            .field-row { margin-bottom: 20px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: #64748B; margin-bottom: 6px; }
            .field-val { font-size: 15px; font-weight: 600; color: #0F172A; }
            .field-val a { color: #6366F1; text-decoration: none; }
            .desc-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
            .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 32px; font-size: 12px; color: #94A3B8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>⚡ New Project Inquiry</h1>
              <p>Submitted via Nexus Forge website</p>
            </div>
            <div class="content">
              <div class="field-row">
                <div class="field-label">Full Name</div>
                <div class="field-val">${escapeHtml(fullName)}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Email Address</div>
                <div class="field-val"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
              </div>

              <div class="field-row">
                <div class="field-label">Phone Number</div>
                <div class="field-val">${phone ? `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>` : "Not provided"}</div>
              </div>

              <div class="field-row">
                <div class="field-label">Service Required</div>
                <div class="field-val"><span style="background:#EEF2FF; color:#4338CA; padding:4px 10px; border-radius:999px; font-size:13px; font-weight:700;">${escapeHtml(service || "Not specified")}</span></div>
              </div>

              <div class="field-row">
                <div class="field-label">Project Description & Requirements</div>
                <div class="desc-box">${escapeHtml(description)}</div>
              </div>
            </div>
            <div class="footer">
              Nexus Forge &bull; Digital Agency &bull; <a href="https://nexusforgeagency.in" style="color:#6366F1;">nexusforgeagency.in</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New Project Inquiry - Nexus Forge
=================================

Full Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Required: ${service || "Not specified"}

Project Description:
${description}

---
Sent via Nexus Forge (nexusforgeagency.in)
    `.trim();

    // Call Resend API - try custom domain first, fall back to onboarding@resend.dev if domain is not yet verified
    let resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nexus Forge <contact@nexusforgeagency.in>",
        to: ["nexusforge.agency@gmail.com"],
        reply_to: email,
        subject: `New Project Inquiry: ${service || "General"} from ${fullName}`,
        html: htmlContent,
        text: textContent,
      }),
    });

    let resendData = await resendRes.json();

    // If domain nexusforgeagency.in is not verified yet, automatically retry with onboarding@resend.dev
    if (
      !resendRes.ok &&
      typeof resendData.message === "string" &&
      resendData.message.toLowerCase().includes("not verified")
    ) {
      console.warn(
        "nexusforgeagency.in is not yet verified in Resend. Falling back to onboarding@resend.dev to ensure delivery."
      );
      resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Nexus Forge <onboarding@resend.dev>",
          to: ["nexusforge.agency@gmail.com"],
          reply_to: email,
          subject: `New Project Inquiry: ${service || "General"} from ${fullName}`,
          html: htmlContent,
          text: textContent,
        }),
      });
      resendData = await resendRes.json();
    }

    if (!resendRes.ok) {
      console.error("Resend API error:", resendData);
      return NextResponse.json(
        {
          error:
            resendData.message ||
            "Failed to send email via Resend. Please verify your domain and API key.",
        },
        { status: resendRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      id: resendData.id,
      message: "Inquiry sent successfully!",
    });
  } catch (err: any) {
    console.error("Error processing contact form:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

