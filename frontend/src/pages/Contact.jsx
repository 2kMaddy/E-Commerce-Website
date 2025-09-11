import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Basic front-end validation
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const message = form.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "Please fill in all required fields." });
      return;
    }

    // TODO: Replace with your API endpoint
    // Example POST:
    // await fetch("/api/contact", { method: "POST", body: form });
    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbxNgylV4PI6b96sTxUSdAamKPYVtPHKBqY_JNQXci5ANP-6pedbEQRmQxParFc_dCi8kw/exec",
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone: mobileNo,
          subject,
          query: message,
        }),
      }
    );

    // Demo only
    setTimeout(
      () =>
        setStatus({
          type: "success",
          msg: "Thanks! We'll get back to you soon.",
        }),
      500
    );
    setName("");
    setEmail("");
    setMessage("");
    setMobileNo("");
    setSubject("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Have a question, feedback, or a project idea? We'd love to hear from
            you. Use the form below or reach us via email/phone. Our team
            typically responds within 1–2 business days.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-5 gap-8">
        {/* Left: Form */}
        <section className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-medium">
              Send us a message
            </h2>
            <p className="text-gray-600 mt-2">We'll reply as soon as we can.</p>

            {status?.type && (
              <div
                className={`mt-4 rounded-xl p-3 text-sm ${
                  status.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mobile number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    name="subject"
                    type="text"
                    className="w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Project inquiry, Support..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  How can we help? *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell us a bit about your request…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <input id="consent" type="checkbox" className="mt-1" />
                <label htmlFor="consent">
                  I agree to the processing of my data in accordance with the
                  Privacy Policy.
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Right: Contact details */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-medium">Contact details</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-gray-500">Email</span>
                <a
                  href="mailto:hello@yourcompany.com"
                  className="text-indigo-600 hover:underline"
                >
                  contact@fynlwear.shop
                </a>
              </li>

              <li>
                <span className="block text-gray-500">Hours</span>
                Mon–Fri, 9:30 AM – 6:30 PM IST
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="text-lg font-medium">FAQs</h3>
            <div className="mt-3 divide-y">
              <details className="py-3">
                <summary className="cursor-pointer font-medium">
                  How soon will you reply?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  We usually respond within 1–2 business days.
                </p>
              </details>
              <details className="py-3">
                <summary className="cursor-pointer font-medium">
                  Do you offer on-site meetings?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Yes, by appointment at our Bengaluru office.
                </p>
              </details>
              <details className="py-3">
                <summary className="cursor-pointer font-medium">
                  What information should I include?
                </summary>
                <p className="mt-2 text-sm text-gray-600">
                  Share your goals, timeline, budget (if any), and links to any
                  relevant materials.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-0 overflow-hidden">
            <iframe
              title="Map"
              className="w-full h-60"
              src="https://www.google.com/maps?q=Bengaluru%20Karnataka&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </main>

      {/* Footer note */}
      <footer className="max-w-6xl mx-auto px-4 pb-16">
        <p className="text-xs text-gray-500">
          By contacting us, you agree to our Terms and acknowledge our Privacy
          Policy. We do not sell your personal information. You can request data
          deletion at any time by emailing privacy@yourcompany.com.
        </p>
      </footer>
    </div>
  );
}
