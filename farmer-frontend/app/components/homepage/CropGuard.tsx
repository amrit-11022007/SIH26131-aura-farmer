"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { type Lang, translations } from "@/app/data/translation";
import {
  type CaseKey,
  cases,
  titles,
  hotspotLevels,
} from "@/app/data/homepage";

const CIRC = 2 * Math.PI * 26;

function ringColor(percent: number): string {
  if (percent >= 66) return "var(--alert)";
  if (percent >= 30) return "var(--marigold)";
  return "var(--leaf)";
}

/* ---------------- component ---------------- */
export default function CropGuard() {
  const [lang, setLang] = useState<Lang>("en");
  const [currentCase, setCurrentCase] = useState<CaseKey>("healthy");
  const [heroVal, setHeroVal] = useState(0);
  const heroDir = useRef(1);

  // hero ring animation loop
  useEffect(() => {
    const id = setInterval(() => {
      setHeroVal((v) => {
        let next = v + heroDir.current * 2;
        if (next >= 64) {
          heroDir.current = -1;
          next = 64;
        }
        if (next <= 0) {
          heroDir.current = 1;
          next = 0;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(id);
  }, []);

  const t = (key: string) => translations[lang][key] ?? key;
  // helper for strings that may contain inline HTML (e.g. <em>)
  const html = (key: string) => ({ __html: translations[lang][key] ?? key });

  const c = cases[currentCase];
  const [titleMain, titleSub] = titles[currentCase][lang];
  const safetyText =
    typeof c.safety === "string" ? t(c.safety) : c.safety[lang];
  const demoOffset = CIRC * (1 - c.severity / 100);
  const heroOffset = CIRC * (1 - heroVal / 100);

  return (
    <div className="bg-[#F4F0E4] text-[#2E241D] antialiased leading-6 font-sans">
      {/* ---------- NAV ---------- */}
      <header className="sticky top-0 z-40 border-b border-[#DCD5C3] bg-[#F4F0E4]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-295 items-center justify-between gap-3 px-5 py-3.5 lg:px-5">
          <div className="flex items-center gap-2.5 font-serif text-[19px] font-bold text-[#2E241D]">
            <svg className="h-7.5 w-7.5 shrink-0" viewBox="0 0 32 32">
              <path
                d="M16 3C9 3 4 9 4 16c0 6 4 11 9 12.5C13.5 22 15 15 22 9c-5 3-8 7-9.5 12C21 19 27 12 27 5c-4 0-8 1-11-2z"
                fill="#3F7D4C"
              />
            </svg>
            CropGuard
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#5A4A3E] lg:flex">
            <a
              className="border-b-2 border-transparent pb-1.5 transition hover:border-[#E0900F] hover:text-[#2E241D]"
              href="#pillars"
            >
              {t("nav1")}
            </a>
            <a
              className="border-b-2 border-transparent pb-1.5 transition hover:border-[#E0900F] hover:text-[#2E241D]"
              href="#demo"
            >
              {t("nav2")}
            </a>
            <a
              className="border-b-2 border-transparent pb-1.5 transition hover:border-[#E0900F] hover:text-[#2E241D]"
              href="#dashboard"
            >
              {t("nav3")}
            </a>
            <a
              className="border-b-2 border-transparent pb-1.5 transition hover:border-[#E0900F] hover:text-[#2E241D]"
              href="#alerts"
            >
              {t("nav4")}
            </a>
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="flex rounded-full border border-[#DCD5C3] bg-[#FFFDF7] p-1">
              {(["en", "hi", "mr"] as Lang[]).map((l) => (
                <button
                  key={l}
                  className={`rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition ${
                    lang === l ? "bg-[#3F7D4C] text-white" : "text-[#5A4A3E]"
                  }`}
                  onClick={() => setLang(l)}
                >
                  {l === "en" ? "EN" : l === "hi" ? "हिं" : "मरा"}
                </button>
              ))}
            </div>
            <a
              className="hidden whitespace-nowrap text-sm font-semibold text-[#4C7A94] lg:inline"
              href="#dashboard"
            >
              {t("navOfficer")}
            </a>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="py-14 md:py-16">
        <div className="mx-auto grid max-w-295 items-center gap-10 px-5 md:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2C5A38] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("heroEyebrow")}
            </p>
            <h1
              className="font-serif text-[clamp(32px,5.4vw,54px)] leading-[1.06] tracking-[-0.01em] text-[#2E241D]"
              dangerouslySetInnerHTML={html("heroTitle")}
            />
            <p className="mt-4 max-w-[46ch] text-[17px] text-[#5A4A3E]">
              {t("heroLede")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#3F7D4C] px-5 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2C5A38]"
              >
                {t("heroCta1")}
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-[#2E241D] bg-transparent px-5 py-3.5 text-[15px] font-semibold text-[#2E241D] transition hover:-translate-y-0.5"
              >
                {t("heroCta2")}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="text-[13px] text-[#5A4A3E]">
                <strong className="block font-serif text-[22px] text-[#2E241D]">
                  3
                </strong>
                <span>{t("stat1")}</span>
              </div>
              <div className="text-[13px] text-[#5A4A3E]">
                <strong className="block font-serif text-[22px] text-[#2E241D]">
                  Offline
                </strong>
                <span>{t("stat2")}</span>
              </div>
              <div className="text-[13px] text-[#5A4A3E]">
                <strong className="block font-serif text-[22px] text-[#2E241D]">
                  IPM-first
                </strong>
                <span>{t("stat3")}</span>
              </div>
            </div>
          </div>

          <div className="mx-auto w-[min(300px,84vw)] rounded-[34px] bg-[#2E241D] p-3.5 shadow-[0_24px_50px_-20px_rgba(46,36,29,0.45)]">
            <div className="min-h-105 rounded-[22px] bg-[#FFFDF7] p-4 pb-5">
              <div className="mb-3 flex items-center justify-between text-[11px] font-semibold text-[#5A4A3E]">
                <span>{t("phoneTop1")}</span>
                <span>{t("phoneTop2")}</span>
              </div>
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#3F7D4C] bg-[#E7F0E1]">
                <div className="absolute inset-x-0 top-0 h-0.75 bg-linear-to-r from-transparent via-[#E0900F] to-transparent animate-[scanmove_2.4s_ease-in-out_infinite]" />
                <svg viewBox="0 0 100 100" className="w-[58%]">
                  <path
                    d="M50 8C25 8 10 30 10 52c0 20 14 36 30 40C33 66 40 42 62 22c-15 10-24 24-28 40C58 58 82 38 82 15c-13 0-26 3-32-7z"
                    fill="#3F7D4C"
                    opacity={0.85}
                  />
                </svg>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-16 w-16 shrink-0">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="none"
                      stroke="#DCD5C3"
                      strokeWidth="7"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="none"
                      strokeLinecap="round"
                      strokeWidth="7"
                      strokeDasharray={CIRC}
                      strokeDashoffset={heroOffset}
                      stroke={ringColor(heroVal)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-[#2E241D]">
                    {heroVal}%
                  </div>
                </div>
                <div className="text-[12px] text-[#5A4A3E]">
                  <strong className="block text-[14px] font-bold text-[#2E241D]">
                    {t("phoneRingLabel")}
                  </strong>
                  <span>{t("phoneRingSub")}</span>
                </div>
              </div>
              <button className="mt-4 w-full rounded-xl bg-[#E0900F] px-3 py-3 text-sm font-bold text-white">
                {t("phoneCta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM STRIP ---------- */}
      <section className="bg-[#2E241D] py-16 text-[#FFFDF7]">
        <div className="mx-auto grid max-w-295 gap-7 px-5 md:grid-cols-2">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FBEBCE] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("probEyebrow")}
            </p>
            <h2 className="font-serif text-[clamp(22px,3vw,30px)] text-white">
              {t("probTitle")}
            </h2>
            <p className="mt-3 text-[15px] text-[#D9D2C2]">{t("probBody")}</p>
          </div>
          <div>
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FBEBCE] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("solEyebrow")}
            </p>
            <h2 className="font-serif text-[clamp(22px,3vw,30px)] text-white">
              {t("solTitle")}
            </h2>
            <p className="mt-3 text-[15px] text-[#D9D2C2]">{t("solBody")}</p>
          </div>
        </div>
      </section>

      {/* ---------- PILLARS ---------- */}
      <section id="pillars" className="py-16">
        <div className="mx-auto max-w-295 px-5">
          <div className="mb-9 max-w-160">
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2C5A38] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("pillarsEyebrow")}
            </p>
            <h2 className="font-serif text-[clamp(24px,3.6vw,34px)] text-[#2E241D]">
              {t("pillarsTitle")}
            </h2>
            <p className="mt-3 text-[15.5px] text-[#5A4A3E]">
              {t("pillarsSub")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: "M12 3v18M5 8l7-5 7 5M4 21h16",
                title: t("p1Title"),
                body: t("p1Body"),
                list: [t("p1L1"), t("p1L2")],
              },
              {
                icon: "M3 12h4l3-8 4 16 3-8h4",
                title: t("p2Title"),
                body: t("p2Body"),
                list: [t("p2L1"), t("p2L2")],
              },
              {
                icon: "M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
                title: t("p3Title"),
                body: t("p3Body"),
                list: [t("p3L1"), t("p3L2")],
              },
              {
                icon: "M3 3v18h18M7 15l4-5 3 3 5-7",
                title: t("p4Title"),
                body: t("p4Body"),
                list: [t("p4L1"), t("p4L2")],
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col gap-2.5 rounded-[14px] border border-[#DCD5C3] bg-[#FFFDF7] p-5"
              >
                <svg
                  className="h-9 w-9 text-[#2C5A38]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path d={pillar.icon} />
                </svg>
                <h3 className="font-serif text-[18px] text-[#2E241D]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#5A4A3E]">{pillar.body}</p>
                <ul className="ml-4 mt-1 list-disc space-y-1 text-[13px] text-[#5A4A3E]">
                  {pillar.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DEMO ---------- */}
      <section id="demo" className="bg-[#E7F0E1] py-16">
        <div className="mx-auto max-w-295 px-5">
          <div className="mb-9 max-w-160">
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2C5A38] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("demoEyebrow")}
            </p>
            <h2 className="font-serif text-[clamp(24px,3.6vw,34px)] text-[#2E241D]">
              {t("demoTitle")}
            </h2>
            <p className="mt-3 text-[15.5px] text-[#5A4A3E]">{t("demoSub")}</p>
          </div>
          <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col gap-3">
              {(
                [
                  ["healthy", "healthy", "case1Title", "case1Sub"],
                  ["medium", "medium", "case2Title", "case2Sub"],
                  ["severe", "severe", "case3Title", "case3Sub"],
                ] as [CaseKey, string, string, string][]
              ).map(([key, swatch, titleKey, subKey]) => (
                <button
                  key={key}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 bg-[#FFFDF7] p-3.5 text-left ${currentCase === key ? "border-[#3F7D4C] shadow-[0_6px_18px_-10px_rgba(63,125,76,0.5)]" : "border-[#DCD5C3]"}`}
                  onClick={() => setCurrentCase(key)}
                >
                  <span
                    className={`h-11.5 w-11.5 shrink-0 rounded-[10px] ${swatch === "healthy" ? "bg-linear-to-br from-[#7ABF83] to-[#3F7D4C]" : swatch === "medium" ? "bg-linear-to-br from-[#F2C15A] to-[#E0900F]" : "bg-linear-to-br from-[#E3897F] to-[#C1443C]"}`}
                  />
                  <span>
                    <strong className="block text-[14.5px] text-[#2E241D]">
                      {t(titleKey)}
                    </strong>
                    <span className="text-[12.5px] text-[#5A4A3E]">
                      {t(subKey)}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-[14px] border border-[#DCD5C3] bg-[#FFFDF7] p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <strong className="block text-[19px] text-[#2E241D]">
                    {titleMain}
                  </strong>
                  <span className="text-[13px] text-[#5A4A3E]">{titleSub}</span>
                </div>
                <span
                  className={`rounded-full px-3 py-1.5 text-[12px] font-bold ${
                    c.badge === "low"
                      ? "bg-[#E7F0E1] text-[#2C5A38]"
                      : c.badge === "med"
                        ? "bg-[#FBEBCE] text-[#8A5A05]"
                        : "bg-[#F7E2DF] text-[#C1443C]"
                  }`}
                >
                  {t(c.badgeText)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 shrink-0">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="none"
                      stroke="#DCD5C3"
                      strokeWidth="7"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      fill="none"
                      strokeLinecap="round"
                      strokeWidth="7"
                      strokeDasharray={CIRC}
                      strokeDashoffset={demoOffset}
                      stroke={ringColor(c.severity)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-[#2E241D]">
                    {c.severity}%
                  </div>
                </div>
                <div className="text-[12px] text-[#5A4A3E]">
                  <strong className="block text-[14px] font-bold text-[#2E241D]">
                    {t("ringSeverity")}
                  </strong>
                  <span>{t("ringSub1")}</span>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5A4A3E]">
                  {t("advH4")}
                </h4>
                <ul className="space-y-2">
                  {c.checklist[lang].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[14.5px] text-[#2E241D] before:text-[#3F7D4C] before:content-['✓'] before:font-bold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-lg border-l-4 border-[#4C7A94] bg-[#E3EDF1] px-3.5 py-3 text-[13.5px] text-[#2C4A59]">
                {safetyText}
              </div>
              {c.refer && (
                <div className="mt-4 rounded-lg border-l-4 border-[#E0900F] bg-[#FBEBCE] px-3.5 py-3 text-[13.5px] text-[#7A5107]">
                  {t("referNote")}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- VOICE ASSISTANT ---------- */}
      <section className="py-16">
        <div className="mx-auto grid max-w-295 gap-7 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2C5A38] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("voiceEyebrow")}
            </p>
            <h2 className="font-serif text-[clamp(24px,3.6vw,34px)] text-[#2E241D]">
              {t("voiceTitle")}
            </h2>
            <p className="mt-3 text-[15.5px] text-[#5A4A3E]">
              {t("voiceBody")}
            </p>
          </div>
          <div className="rounded-[14px] border border-[#DCD5C3] bg-[#FFFDF7] p-5">
            <div className="max-w-[78%] rounded-[14px] bg-[#3F7D4C] px-3.5 py-2.5 text-[14px] text-white ml-auto rounded-br-1 mb-2.5">
              {t("chat1")}
            </div>
            <div className="max-w-[78%] rounded-[14px] border border-[#DCD5C3] bg-[#F4F0E4] px-3.5 py-2.5 text-[14px] text-[#2E241D] rounded-bl-1 mb-2.5">
              {t("chat2")}
            </div>
            <div className="max-w-[78%] rounded-[14px] bg-[#3F7D4C] px-3.5 py-2.5 text-[14px] text-white ml-auto rounded-br-1 mb-2.5">
              {t("chat3")}
            </div>
            <div className="max-w-[78%] rounded-[14px] border border-[#DCD5C3] bg-[#F4F0E4] px-3.5 py-2.5 text-[14px] text-[#2E241D] rounded-bl-1 mb-3">
              {t("chat4")}
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="Speak"
                className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#E0900F] text-white shadow-[0_0_0_0_rgba(224,144,15,0.45)] animate-[pulse_2.2s_infinite]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
                </svg>
              </button>
              <span className="text-[13px] text-[#5A4A3E]">{t("micHint")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DASHBOARD ---------- */}
      <section id="dashboard" className="bg-[#2E241D] py-16 text-[#FFFDF7]">
        <div className="mx-auto max-w-295 px-5">
          <div className="mb-9 max-w-160">
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FBEBCE] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("dashEyebrow")}
            </p>
            <h2 className="font-serif text-[clamp(24px,3.6vw,34px)] text-white">
              {t("dashTitle")}
            </h2>
            <p className="mt-3 text-[15.5px] text-[#C8BFA9]">{t("dashSub")}</p>
          </div>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["214", t("stat4")],
              ["18", t("stat5")],
              ["91%", t("stat6")],
              ["6", t("stat7")],
            ].map(([value, label], i) => (
              <div
                key={i}
                className="rounded-xl border border-[#4A3D31] bg-[#3A2F26] p-4"
              >
                <strong className="block font-serif text-[26px] text-white">
                  {value}
                </strong>
                <span className="text-[12.5px] text-[#C8BFA9]">{label}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[14px] border border-[#4A3D31] bg-[#3A2F26] p-5">
              <h3 className="mb-4 font-serif text-[16px] text-white">
                {t("panel1Title")}
              </h3>
              <div className="flex h-30 items-end gap-2">
                {[
                  ["Mon", 30, false],
                  ["Tue", 45, false],
                  ["Wed", 70, true],
                  ["Thu", 38, false],
                  ["Fri", 82, true],
                  ["Sat", 55, false],
                  ["Sun", 40, false],
                ].map(([day, height, risk], i) => (
                  <div
                    key={i}
                    className="relative flex-1 rounded-t-sm bg-[#3F7D4C]"
                    style={{ height: `${height}%` }}
                  >
                    <span
                      className={`absolute inset-x-0 -bottom-5 text-center text-[10px] text-[#C8BFA9] ${risk ? "bg-[#E0900F]" : "bg-[#3F7D4C]"}`}
                      style={{ height: risk ? "100%" : "0px" }}
                    />
                    <span className="absolute inset-x-0 -bottom-5 text-center text-[10px] text-[#C8BFA9]">
                      {day as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[14px] border border-[#4A3D31] bg-[#3A2F26] p-5">
              <h3 className="mb-4 font-serif text-[16px] text-white">
                {t("panel2Title")}
              </h3>
              <div className="mt-1 grid grid-cols-9 gap-1">
                {hotspotLevels.map((lvl, i) => (
                  <i
                    key={i}
                    className={`block aspect-square rounded-[3px] ${lvl === "l1" ? "bg-[#3F7D4C]" : lvl === "l2" ? "bg-[#E0900F]" : "bg-[#C1443C]"}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-[12px] text-[#C8BFA9]">
                {t("hotspotLegend")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ALERTS ---------- */}
      <section id="alerts" className="py-16">
        <div className="mx-auto max-w-295 px-5">
          <div className="mb-9 max-w-160">
            <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2C5A38] before:inline-block before:h-0.5 before:w-4 before:bg-[#E0900F]">
              {t("alertsEyebrow")}
            </p>
            <h2 className="font-serif text-[clamp(24px,3.6vw,34px)] text-[#2E241D]">
              {t("alertsTitle")}
            </h2>
            <p className="mt-3 text-[15.5px] text-[#5A4A3E]">
              {t("alertsSub")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start gap-3 rounded-[10px] border border-[#DCD5C3] border-l-4 border-l-[#C1443C] bg-[#FFFDF7] p-4">
              <strong className="text-[14.5px] text-[#2E241D]">
                {t("alert1Title")}
              </strong>
              <p className="w-full text-[13.5px] text-[#5A4A3E]">
                {t("alert1Body")}
              </p>
              <time className="ml-auto text-[12px] text-[#5A4A3E]">
                {t("alert1Time")}
              </time>
            </div>
            <div className="flex flex-wrap items-start gap-3 rounded-[10px] border border-[#DCD5C3] border-l-4 border-l-[#E0900F] bg-[#FFFDF7] p-4">
              <strong className="text-[14.5px] text-[#2E241D]">
                {t("alert2Title")}
              </strong>
              <p className="w-full text-[13.5px] text-[#5A4A3E]">
                {t("alert2Body")}
              </p>
              <time className="ml-auto text-[12px] text-[#5A4A3E]">
                {t("alert2Time")}
              </time>
            </div>
            <div className="flex flex-wrap items-start gap-3 rounded-[10px] border border-[#DCD5C3] border-l-4 border-l-[#4C7A94] bg-[#FFFDF7] p-4">
              <strong className="text-[14.5px] text-[#2E241D]">
                {t("alert3Title")}
              </strong>
              <p className="w-full text-[13.5px] text-[#5A4A3E]">
                {t("alert3Body")}
              </p>
              <time className="ml-auto text-[12px] text-[#5A4A3E]">
                {t("alert3Time")}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TRUST STRIP ---------- */}
      <section className="py-16">
        <div className="mx-auto max-w-295 px-5">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: "M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z",
                title: t("trust1Title"),
                body: t("trust1Body"),
              },
              {
                icon: "M3 12a9 9 0 1 0 9-9M3 12l3-3M3 12l3 3",
                title: t("trust2Title"),
                body: t("trust2Body"),
              },
              {
                icon: "M12 19V5M5 12l7-7 7 7",
                title: t("trust3Title"),
                body: t("trust3Body"),
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-6 w-6 shrink-0 text-[#2C5A38]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path d={item.icon} />
                </svg>
                <div>
                  <strong className="block text-[14.5px] text-[#2E241D]">
                    {item.title}
                  </strong>
                  <p className="mt-1 text-[13px] text-[#5A4A3E]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#DCD5C3] py-6">
        <div className="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-2 px-5 text-[13px] text-[#5A4A3E]">
          <span>
            CropGuard — SIH 2026 · Problem Statement 26131 · Govt. of
            Maharashtra
          </span>
          <span>{t("footerNote")}</span>
        </div>
      </footer>
    </div>
  );
}
