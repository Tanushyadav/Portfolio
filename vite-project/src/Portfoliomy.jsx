import React, { useEffect, useRef, useState } from "react";
import userPhoto from "./assets/photo.jpg";

const PROFILE = {
  name: "Tanush Yadav",
  title: "Full-Stack Developer",
  shortBio:
    "Hi, I’m Tanush Yadav, a Full-Stack Developer passionate about building clean, efficient, and user-focused digital experiences. I work with technologies like HTML, CSS, Java, C++, and MySQL, and I enjoy exploring new tools and ideas in the ever-growing tech world.",
  photo: userPhoto, 
  resumeLink: '/resume.docx', 
  email: "tanushyadav9211@gmail.com",
  socials: [
    { name: "GitHub", href: "https://github.com/tanushyadav", icon: "github" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/tanush-yadav-4903562b5/", icon: "linkedin" },
    { name: "Instagram", href: "https://instagram.com/tanush.ydv/", icon: "instagram" },
  ],
};

const PROJECTS = [
  {
    id: 1,
    title: "Hospital Management System",
    description: "",
    image: "/mnt/data/photo form.jpg",
    link: "#",
  },
];

const SKILLS = [
  { name: "React" },
  { name: "JavaScript" },
  { name: "HTML & CSS" },
  { name: "Tailwind / Styling" },
];

function useTypingEffect(words = [], speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= words.length) return;

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed]);

  useEffect(() => {
    if (index >= words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pause);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
    }
  }, [subIndex, index, reverse, words, pause]);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  return `${words[index].slice(0, Math.max(0, subIndex))}${blink ? "|" : " "}`;
}

/* --------------------- Main component --------------------- */
export default function PortfolioApp() {
  const [projects] = useState(PROJECTS);
  const [skills] = useState(SKILLS);

  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const typed = useTypingEffect(["Full-Stack Developer", "Java & C++", "UI Enthusiast"], 80, 1400);

  useEffect(() => {
    const draft = localStorage.getItem("contactDraft");
    if (draft) setContact(JSON.parse(draft));
  }, []);

  useEffect(() => {
    localStorage.setItem("contactDraft", JSON.stringify(contact));
  }, [contact]);

  function scrollTo(ref) {
    if (ref && ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateContact() {
    const next = {};
    if (!contact.name.trim()) next.name = "Name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) next.email = "Enter a valid email.";
    if (contact.message.trim().length < 10) next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    if (!validateContact()) return;
    setSubmitted(true);
    localStorage.removeItem("contactDraft");
    setTimeout(() => {
      setContact({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/60 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="center justify-center text-white font-bold">
          
            </div>
            <div>
             </div>
          </div>

          <nav className="hidden md:flex gap-4 items-center text-sm">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="px-3 py-2 rounded-md hover:bg-gray-100">
              Home
            </button>
            <button onClick={() => scrollTo(aboutRef)} className="px-3 py-2 rounded-md hover:bg-gray-100">
              About
            </button>
            <button onClick={() => scrollTo(skillsRef)} className="px-3 py-2 rounded-md hover:bg-gray-100">
              Skills
            </button>
            <button onClick={() => scrollTo(projectsRef)} className="px-3 py-2 rounded-md hover:bg-gray-100">
              Projects
            </button>
            <button onClick={() => scrollTo(contactRef)} className="px-3 py-2 rounded-md bg-indigo-600 text-white">
              Contact
            </button>
          </nav>

          <div className="md:hidden">
            <select
              onChange={(e) => {
                if (e.target.value === "about") scrollTo(aboutRef);
                if (e.target.value === "skills") scrollTo(skillsRef);
                if (e.target.value === "projects") scrollTo(projectsRef);
                if (e.target.value === "contact") scrollTo(contactRef);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option>Navigate</option>
              <option value="about">About</option>
              <option value="skills">Skills</option>
              <option value="projects">Projects</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-8 items-center py-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">{PROFILE.name}</h2>
            <p className="text-indigo-600 font-medium mt-2 text-xl">{typed}</p>

            <p className="mt-4 text-gray-700 max-w-xl leading-relaxed">{PROFILE.shortBio}</p>

            <div className="mt-6 flex gap-3 items-center">
              <a
                href={PROFILE.resumeLink}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
                download
              >
                {/* Download SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ width: "20px", height: "20px" }}>
" fill="currentColor" viewBox="0 0 24 24"" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-9 8h10" />
                </svg>
                Download Resume
              </a>

              <button onClick={() => scrollTo(contactRef)} className="px-4 py-2 border rounded hover:bg-gray-100 transition">
                Contact Me
              </button>
            </div>

            <div className="mt-6 flex gap-3 text-sm text-gray-600">
              {PROFILE.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 underline hover:no-underline"
                >
                  {/* Icons */}
                  {s.icon === "github" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ width: "20px", height: "20px" }}>
" fill="currentColor" viewBox="0 0 24 24"
                      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.6 1.6 2.6 1.6s1.6-1.5 2.6-1.6c0 0 .6-1 1.7-1.1 0 0 1.1 0 .1.7 0 0-.7.4-1.2 1.6 0 0-.7 2.1-3.9 1.4v2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
                    </svg>
                  )}
                  {s.icon === "linkedin" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ width: "20px", height: "20px" }}>
" fill="currentColor" viewBox="0 0 24 24"" fill="currentColor" viewBox="0 0 24 24"
                      <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.2 8h3.6v12H1.2zm7.2 0h3.4v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.8 2.6 4.8 6v6.3h-3.6V15c0-1.5 0-3.5-2.1-3.5s-2.4 1.6-2.4 3.4v5.1H8.4z" />
                    </svg>
                  )}
                  {s.icon === "instagram" && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ width: "20px", height: "20px" }}>
" fill="currentColor" viewBox="0 0 24 24"" fill="currentColor" viewBox="0 0 24 24"
                      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.505 4.505 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.503 2.503 0 0 1 12 9.5zm4.8-3.3a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
                    </svg>
                  )}
                  <span className="text-sm">{s.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-56 h-56 rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
              <img
             alt="profile"
             src={PROFILE.photo}
             style={{
             width: "180px",
            height: "180px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  }}
/>
            </div>
          </div>
        </section>

        {/* About */}
        <section ref={aboutRef} className="py-10">
          <h3 className="text-2xl font-semibold">About</h3>
          <div className="mt-4 text-gray-700 max-w-3xl leading-relaxed">
            <p>
              Hi, I’m Tanush Yadav, a Full-Stack Developer passionate about building clean, efficient, and user-focused digital experiences. I work with technologies like HTML, CSS, Java, C++, and MySQL, and I enjoy exploring new tools and ideas in the ever-growing tech world.
            </p>
            <p className="mt-3">
              I completed my 12th from ST. Soldier Public School (2022) and graduated with a BCA from MIMT College (2025). One of my notable projects is a Hospital Management System, where I focused on improving usability and smooth data handling.
            </p>
            <p className="mt-3">I combine professionalism with creativity and a friendly approach to deliver solutions that not only work but feel great to use.</p>
          </div>
        </section>

        {/* Skills */}
        <section ref={skillsRef} className="py-10">
          <h3 className="text-2xl font-semibold">Skills</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name} className="p-4 bg-white rounded shadow-sm">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{s.name}</span>
              
                </div>

                <div className="w-full bg-gray-100 rounded h-3 overflow-hidden">
                  <div style={{ width: `${s.level}%` }} className="h-full rounded bg-gradient-to-r from-indigo-400 to-pink-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section ref={projectsRef} className="py-10">
          <h3 className="text-2xl font-semibold">Projects</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <div className="w-full h-44 bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-4">
                  <h4 className="font-semibold">{p.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section ref={contactRef} className="py-10">
          <h3 className="text-2xl font-semibold">Contact</h3>

          <div className="mt-4 md:flex gap-6">
            <form onSubmit={handleContactSubmit} className="flex-1 bg-white p-6 rounded shadow">
              {submitted && <div className="mb-3 text-sm text-green-600">Message sent — thank you!</div>}

              <div className="grid gap-3">
                <label className="text-sm">Name</label>
                <input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="border p-2 rounded" />
                {errors.name && <div className="text-xs text-red-600">{errors.name}</div>}

                <label className="text-sm">Email</label>
                <input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="border p-2 rounded" />
                {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}

                <label className="text-sm">Message</label>
                <textarea value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} rows={5} className="border p-2 rounded" />
                {errors.message && <div className="text-xs text-red-600">{errors.message}</div>}

                <div className="flex gap-3 items-center">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
                  <button
                    type="button"
                    onClick={() => {
                      setContact({ name: "", email: "", message: "" });
                      setErrors({});
                      localStorage.removeItem("contactDraft");
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>

            <aside className="w-full md:w-80 mt-6 md:mt-0">
              <div className="bg-white p-6 rounded shadow">
                <h4 className="font-medium">Get in touch</h4>
                <p className="mt-2 text-sm text-gray-600">
                  Prefer email? Reach me at{" "}
                  <a href={`mailto:${PROFILE.email}`} className="underline">
                    {PROFILE.email}
                  </a>
                </p>

                <div className="mt-4">
                  <h5 className="text-sm font-semibold">Quick Links</h5>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>
                      <a href={PROFILE.resumeLink} className="underline">
                        Download Resume
                      </a>
                    </li>
                    {PROFILE.socials.map((s) => (
                      <li key={s.name}>
                        <a href={s.href} className="underline">
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-sm text-gray-500">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. Built with React.
          </div>
          <div className="mt-2">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="underline">
              Back to top
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}