import Image from "next/image";

// Change this to your real contact email.
const CONTACT_EMAIL = "hello@nexusforge.com";

const services = [
  {
    name: "Websites",
    text: "Fast, clean sites that turn visitors into customers.",
  },
  {
    name: "Automations",
    text: "Workflows that take repetitive work off your team.",
  },
  {
    name: "Media marketing",
    text: "Content and campaigns that get your brand noticed.",
  },
];

export default function ComingSoon() {
  return (
    <div className="page">
      <header className="top">
        <Image
          src="/logo.jpeg"
          alt="Nexus Forge logo"
          width={3368}
          height={3368}
          className="logo"
          priority
        />
        <span className="wordmark">Nexus Forge</span>
        <span className="status">Launching soon</span>
      </header>

      <main className="hero">
        <section className="copy">
          <h1>
            Your next website, automation and campaign are being forged.
          </h1>
          <p className="lead">
            Nexus Forge is a digital agency for modern businesses. We build
            websites, automate the busywork and run media marketing, all at
            prices that make sense.
          </p>

          <ul className="services">
            {services.map((s) => (
              <li key={s.name}>
                <strong>{s.name}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>

          <div className="actions">
            <a
              className="btn"
              href={`mailto:${CONTACT_EMAIL}?subject=Nexus%20Forge%20launch%20update`}
            >
              Get notified at launch
            </a>
            <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>

        <figure className="visual">
          <Image
            src="/banner.jpeg"
            alt="Nexus Forge banner"
            width={1264}
            height={843}
            className="banner"
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        </figure>
      </main>

      <footer className="foot">
        © 2026 Nexus Forge. All rights reserved.
      </footer>
    </div>
  );
}