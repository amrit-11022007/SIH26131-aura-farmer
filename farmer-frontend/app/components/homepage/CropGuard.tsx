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
    <div className="bg-paper font-body text-soil leading-relaxed antialiased">
      {/* ---------- NAV ---------- */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-5 py-3.5">
          <div className="flex items-center gap-2.5 font-display text-xl font-bold">
            <svg className="h-8 w-8 flex-none" viewBox="0 0 32 32">
              <path
                d="M16 3C9 3 4 9 4 16c0 6 4 11 9 12.5C13.5 22 15 15 22 9c-5 3-8 7-9.5 12C21 19 27 12 27 5c-4 0-8 1-11-2z"
                fill="#3F7D4C"
              />
            </svg>
            CropGuard
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-soil-70 md:flex">
            <a
              href="#pillars"
              className="border-b-2 border-transparent px-0 py-1.5 hover:border-marigold hover:text-soil"
            >
              {t("nav1")}
            </a>
            <a
              href="#demo"
              className="border-b-2 border-transparent px-0 py-1.5 hover:border-marigold hover:text-soil"
            >
              {t("nav2")}
            </a>
            <a
              href="#dashboard"
              className="border-b-2 border-transparent px-0 py-1.5 hover:border-marigold hover:text-soil"
            >
              {t("nav3")}
            </a>
            <a
              href="#alerts"
              className="border-b-2 border-transparent px-0 py-1.5 hover:border-marigold hover:text-soil"
            >
              {t("nav4")}
            </a>
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="flex rounded-full border border-line bg-paper-raised p-0.5">
              {(["en", "hi", "mr"] as Lang[]).map((l) => (
                <button
                  key={l}
                  className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                    lang === l ? "bg-leaf text-white" : "text-soil-70"
                  }`}
                  onClick={() => setLang(l)}
                >
                  {l === "en" ? "EN" : l === "hi" ? "हिं" : "मरा"}
                </button>
              ))}
            </div>
            <a
              href="#dashboard"
              className="hidden whitespace-nowrap text-sm font-semibold text-sky md:inline"
            >
              {t("navOfficer")}
            </a>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="py-14">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf-dark before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("heroEyebrow")}
            </p>
            <h1
              className="mt-0 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
              dangerouslySetInnerHTML={html("heroTitle")}
            />
            <p className="mt-5 max-w-[46ch] text-base text-soil-70 sm:text-lg">
              {t("heroLede")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-leaf-dark"
              >
                {t("heroCta1")}
              </a>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-soil px-5 py-3 font-semibold text-soil transition-transform hover:-translate-y-0.5"
              >
                {t("heroCta2")}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="text-sm text-soil-70">
                <strong className="block font-display text-xl font-semibold text-soil">
                  3
                </strong>
                {t("stat1")}
              </div>
              <div className="text-sm text-soil-70">
                <strong className="block font-display text-xl font-semibold text-soil">
                  Offline
                </strong>
                {t("stat2")}
              </div>
              <div className="text-sm text-soil-70">
                <strong className="block font-display text-xl font-semibold text-soil">
                  IPM-first
                </strong>
                {t("stat3")}
              </div>
            </div>
          </div>

          <div className="mx-auto w-[min(300px,84vw)] rounded-[34px] bg-soil p-3.5 shadow-2xl">
            <div className="min-h-[420px] rounded-[22px] bg-paper-raised px-4 py-5">
              <div className="mb-3.5 flex justify-between text-[11px] font-semibold text-soil-70">
                <span>{t("phoneTop1")}</span>
                <span>{t("phoneTop2")}</span>
              </div>
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-leaf bg-leaf-pale">
                <div className="absolute left-0 right-0 top-0 h-0.5 animate-scan bg-gradient-to-r from-transparent via-marigold to-transparent" />
                <svg viewBox="0 0 100 100" className="w-[58%]">
                  <path
                    d="M50 8C25 8 10 30 10 52c0 20 14 36 30 40C33 66 40 42 62 22c-15 10-24 24-28 40C58 58 82 38 82 15c-13 0-26 3-32-7z"
                    fill="#3F7D4C"
                    opacity={0.85}
                  />
                </svg>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-16 w-16 flex-none">
                  <svg width="64" height="64" className="-rotate-90">
                    <circle
                      className="fill-none stroke-line stroke-7"
                      cx="32"
                      cy="32"
                      r="26"
                    />
                    <circle
                      className="fill-none transition-all duration-800 ease-out"
                      cx="32"
                      cy="32"
                      r="26"
                      strokeWidth="7"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: CIRC,
                        strokeDashoffset: heroOffset,
                        stroke: ringColor(heroVal),
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-soil">
                    {heroVal}%
                  </div>
                </div>
                <div className="text-xs text-soil-70">
                  <strong className="block text-sm font-bold text-soil">
                    {t("phoneRingLabel")}
                  </strong>
                  {t("phoneRingSub")}
                </div>
              </div>
              <button className="mt-4 w-full rounded-xl bg-marigold py-3 text-sm font-bold text-white">
                {t("phoneCta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM STRIP ---------- */}
      <section className="bg-soil py-16 text-paper-raised">
        <div className="mx-auto grid max-w-[1180px] gap-6 px-5 md:grid-cols-2">
          <div>
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-marigold-pale before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("probEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {t("probTitle")}
            </h2>
            <p className="mt-3 text-sm text-[#D9D2C2] sm:text-base">
              {t("probBody")}
            </p>
          </div>
          <div>
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-marigold-pale before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("solEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {t("solTitle")}
            </h2>
            <p className="mt-3 text-sm text-[#D9D2C2] sm:text-base">
              {t("solBody")}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- PILLARS ---------- */}
      <section id="pillars" className="py-16">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf-dark before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("pillarsEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {t("pillarsTitle")}
            </h2>
            <p className="mt-3 text-sm text-soil-70 sm:text-base">
              {t("pillarsSub")}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-paper-raised p-6">
              <svg
                className="h-9 w-9 text-leaf-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path d="M12 3v18M5 8l7-5 7 5M4 21h16" />
              </svg>
              <h3 className="text-lg font-semibold">{t("p1Title")}</h3>
              <p className="text-sm text-soil-70">{t("p1Body")}</p>
              <ul className="mt-1.5 list-disc pl-5 text-sm text-soil-70">
                <li className="mb-1">{t("p1L1")}</li>
                <li className="mb-1">{t("p1L2")}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-paper-raised p-6">
              <svg
                className="h-9 w-9 text-leaf-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path d="M3 12h4l3-8 4 16 3-8h4" />
              </svg>
              <h3 className="text-lg font-semibold">{t("p2Title")}</h3>
              <p className="text-sm text-soil-70">{t("p2Body")}</p>
              <ul className="mt-1.5 list-disc pl-5 text-sm text-soil-70">
                <li className="mb-1">{t("p2L1")}</li>
                <li className="mb-1">{t("p2L2")}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-paper-raised p-6">
              <svg
                className="h-9 w-9 text-leaf-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <h3 className="text-lg font-semibold">{t("p3Title")}</h3>
              <p className="text-sm text-soil-70">{t("p3Body")}</p>
              <ul className="mt-1.5 list-disc pl-5 text-sm text-soil-70">
                <li className="mb-1">{t("p3L1")}</li>
                <li className="mb-1">{t("p3L2")}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-paper-raised p-6">
              <svg
                className="h-9 w-9 text-leaf-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path d="M3 3v18h18M7 15l4-5 3 3 5-7" />
              </svg>
              <h3 className="text-lg font-semibold">{t("p4Title")}</h3>
              <p className="text-sm text-soil-70">{t("p4Body")}</p>
              <ul className="mt-1.5 list-disc pl-5 text-sm text-soil-70">
                <li className="mb-1">{t("p4L1")}</li>
                <li className="mb-1">{t("p4L2")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DEMO ---------- */}
      <section id="demo" className="bg-leaf-pale py-16">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf-dark before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("demoEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {t("demoTitle")}
            </h2>
            <p className="mt-3 text-sm text-soil-70 sm:text-base">
              {t("demoSub")}
            </p>
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
                  className={`flex w-full items-center gap-3.5 rounded-xl border-2 bg-paper-raised px-4 py-3.5 text-left ${
                    currentCase === key
                      ? "border-leaf shadow-lg"
                      : "border-line"
                  }`}
                  onClick={() => setCurrentCase(key)}
                >
                  <span
                    className={`h-11 w-11 flex-none rounded-lg ${swatch}`}
                  />
                  <span>
                    <strong className="block text-sm font-semibold">
                      {t(titleKey)}
                    </strong>
                    <span className="text-xs text-soil-70">{t(subKey)}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-line bg-paper-raised p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <strong className="block text-lg font-semibold">
                    {titleMain}
                  </strong>
                  <span className="text-sm text-soil-70">{titleSub}</span>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    c.badge === "low"
                      ? "bg-leaf-pale text-leaf-dark"
                      : c.badge === "med"
                        ? "bg-marigold-pale text-[#8A5A05]"
                        : "bg-alert-pale text-alert"
                  }`}
                >
                  {t(c.badgeText)}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative h-16 w-16 flex-none">
                  <svg width="64" height="64" className="-rotate-90">
                    <circle
                      className="fill-none stroke-line stroke-7"
                      cx="32"
                      cy="32"
                      r="26"
                    />
                    <circle
                      className="fill-none transition-all duration-800 ease-out"
                      cx="32"
                      cy="32"
                      r="26"
                      strokeWidth="7"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: CIRC,
                        strokeDashoffset: demoOffset,
                        stroke: ringColor(c.severity),
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-soil">
                    {c.severity}%
                  </div>
                </div>
                <div className="text-xs text-soil-70">
                  <strong className="block text-sm font-bold text-soil">
                    {t("ringSeverity")}
                  </strong>
                  {t("ringSub1")}
                </div>
              </div>
              <div className="mt-5">
                <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-soil-70">
                  {t("advH4")}
                </h4>
                <ul className="flex flex-col gap-2">
                  {c.checklist[lang].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="font-bold text-leaf">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 rounded-lg border-l-4 border-sky bg-sky-pale px-3.5 py-3 text-sm text-[#2C4A59]">
                {safetyText}
              </div>
              {c.refer && (
                <div className="mt-3.5 rounded-lg border-l-4 border-marigold bg-marigold-pale px-3.5 py-3 text-sm text-[#7A5107]">
                  {t("referNote")}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- VOICE ASSISTANT ---------- */}
      <section className="py-16">
        <div className="mx-auto grid max-w-295 items-center gap-7 px-5 lg:grid-cols-2">
          <div>
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf-dark before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("voiceEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {t("voiceTitle")}
            </h2>
            <p className="mt-3 text-sm text-soil-70 sm:text-base">
              {t("voiceBody")}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-paper-raised p-5">
            <div className="mb-2.5 ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-leaf px-3.5 py-2.5 text-sm text-white">
              {t("chat1")}
            </div>
            <div className="mb-2.5 max-w-[78%] rounded-2xl rounded-bl-md border border-line bg-paper px-3.5 py-2.5 text-sm">
              {t("chat2")}
            </div>
            <div className="mb-2.5 ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-leaf px-3.5 py-2.5 text-sm text-white">
              {t("chat3")}
            </div>
            <div className="mb-2.5 max-w-[78%] rounded-2xl rounded-bl-md border border-line bg-paper px-3.5 py-2.5 text-sm">
              {t("chat4")}
            </div>
            <div className="mt-3.5 flex items-center gap-3">
              <button
                className="flex h-12 w-12 flex-none animate-pulse items-center justify-center rounded-full bg-marigold text-white"
                aria-label="Speak"
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
              <span className="text-sm text-soil-70">{t("micHint")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DASHBOARD ---------- */}
      <section id="dashboard" className="bg-soil py-16 text-paper-raised">
        <div className="mx-auto max-w-295 px-5">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-marigold-pale before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("dashEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {t("dashTitle")}
            </h2>
            <p className="mt-3 text-sm text-[#C8BFA9] sm:text-base">
              {t("dashSub")}
            </p>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <div className="rounded-xl border border-[#4A3D31] bg-[#3A2F26] p-4">
              <strong className="block font-display text-2xl font-semibold text-white">
                214
              </strong>
              <span className="text-xs text-[#C8BFA9]">{t("stat4")}</span>
            </div>
            <div className="rounded-xl border border-[#4A3D31] bg-[#3A2F26] p-4">
              <strong className="block font-display text-2xl font-semibold text-white">
                18
              </strong>
              <span className="text-xs text-[#C8BFA9]">{t("stat5")}</span>
            </div>
            <div className="rounded-xl border border-[#4A3D31] bg-[#3A2F26] p-4">
              <strong className="block font-display text-2xl font-semibold text-white">
                91%
              </strong>
              <span className="text-xs text-[#C8BFA9]">{t("stat6")}</span>
            </div>
            <div className="rounded-xl border border-[#4A3D31] bg-[#3A2F26] p-4">
              <strong className="block font-display text-2xl font-semibold text-white">
                6
              </strong>
              <span className="text-xs text-[#C8BFA9]">{t("stat7")}</span>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-[#4A3D31] bg-[#3A2F26] p-5">
              <h3 className="mb-3.5 text-base font-semibold text-white">
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
                ].map(([day, h, risk], i) => (
                  <div
                    key={i}
                    className={`relative flex-1 rounded-t ${risk ? "bg-marigold" : "bg-leaf"}`}
                    style={{ height: `${h}%` }}
                  >
                    <span className="absolute -bottom-5 left-0 right-0 text-center text-[10px] text-[#C8BFA9]">
                      {day as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#4A3D31] bg-[#3A2F26] p-5">
              <h3 className="mb-3.5 text-base font-semibold text-white">
                {t("panel2Title")}
              </h3>
              <div className="mt-1.5 grid grid-cols-9 gap-1">
                {hotspotLevels.map((lvl, i) => (
                  <i key={i} className={`aspect-square rounded-sm ${lvl}`} />
                ))}
              </div>
              <p className="mt-2.5 text-xs text-[#C8BFA9]">
                {t("hotspotLegend")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ALERTS ---------- */}
      <section id="alerts" className="py-16">
        <div className="mx-auto max-w-195 px-5">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-leaf-dark before:inline-block before:h-0.5 before:w-4 before:bg-marigold">
              {t("alertsEyebrow")}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {t("alertsTitle")}
            </h2>
            <p className="mt-3 text-sm text-soil-70 sm:text-base">
              {t("alertsSub")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start gap-3 rounded-lg border border-line border-l-4 border-l-alert bg-paper-raised px-4 py-4">
              <strong className="text-sm font-semibold">
                {t("alert1Title")}
              </strong>
              <p className="w-full text-sm text-soil-70">{t("alert1Body")}</p>
              <time className="ml-auto whitespace-nowrap text-xs text-soil-70">
                {t("alert1Time")}
              </time>
            </div>
            <div className="flex flex-wrap items-start gap-3 rounded-lg border border-line border-l-4 border-l-marigold bg-paper-raised px-4 py-4">
              <strong className="text-sm font-semibold">
                {t("alert2Title")}
              </strong>
              <p className="w-full text-sm text-soil-70">{t("alert2Body")}</p>
              <time className="ml-auto whitespace-nowrap text-xs text-soil-70">
                {t("alert2Time")}
              </time>
            </div>
            <div className="flex flex-wrap items-start gap-3 rounded-lg border border-line border-l-4 border-l-sky bg-paper-raised px-4 py-4">
              <strong className="text-sm font-semibold">
                {t("alert3Title")}
              </strong>
              <p className="w-full text-sm text-soil-70">{t("alert3Body")}</p>
              <time className="ml-auto whitespace-nowrap text-xs text-soil-70">
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
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-6 w-6 flex-none text-leaf-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z" />
              </svg>
              <div>
                <strong className="block text-sm font-semibold">
                  {t("trust1Title")}
                </strong>
                <p className="mt-0.5 text-sm text-soil-70">{t("trust1Body")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-6 w-6 flex-none text-leaf-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path d="M3 12a9 9 0 1 0 9-9M3 12l3-3M3 12l3 3" />
              </svg>
              <div>
                <strong className="block text-sm font-semibold">
                  {t("trust2Title")}
                </strong>
                <p className="mt-0.5 text-sm text-soil-70">{t("trust2Body")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-6 w-6 flex-none text-leaf-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              <div>
                <strong className="block text-sm font-semibold">
                  {t("trust3Title")}
                </strong>
                <p className="mt-0.5 text-sm text-soil-70">{t("trust3Body")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-6 text-sm text-soil-70">
        <div className="mx-auto flex max-w-295 flex-wrap justify-between gap-2.5 px-5">
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
