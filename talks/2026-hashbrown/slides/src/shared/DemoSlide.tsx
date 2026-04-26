import { type ReactNode, type CSSProperties, useState, useEffect } from "react";
import { Slide } from "@revealjs/react";
import hljs from "highlight.js/lib/core";
import typescriptLang from "highlight.js/lib/languages/typescript";
import xmlLang from "highlight.js/lib/languages/xml";
import cssLang from "highlight.js/lib/languages/css";
import "highlight.js/styles/github-dark-dimmed.css";

hljs.registerLanguage("typescript", typescriptLang);
hljs.registerLanguage("html", xmlLang);
hljs.registerLanguage("css", cssLang);

export function buildHighlightedHtml(code: string, language: string | undefined): string {
  let inner: string;
  try {
    inner = language
      ? hljs.highlight(code, { language }).value
      : code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  } catch {
    inner = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  const lines = inner.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  const pad = String(lines.length).length;

  return lines
    .map((line, i) => {
      const num = String(i + 1).padStart(pad, " ");
      return (
        `<span style="user-select:none;display:inline-block;min-width:${pad}ch;` +
        `padding-right:1.2em;text-align:right;color:rgba(255,255,255,0.2)">${num}</span>` +
        line
      );
    })
    .join("\n");
}

export interface CodeTab {
  label: string;
  code: string;
  language?: string;
}

interface DemoSlideProps {
  title: ReactNode;
  src: string;
  color?: string;
  tabs?: CodeTab[];
}

export function DemoSlide({ title, src, color = "#3fb950", tabs }: DemoSlideProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [activeTab, setActiveTab] = useState(0);
  const [highlightedHtml, setHighlightedHtml] = useState("");

  useEffect(() => {
    if (view === "code" && tabs && tabs.length > 0) {
      const tab = tabs[activeTab];
      setHighlightedHtml(buildHighlightedHtml(tab.code, tab.language));
    }
  }, [view, activeTab, tabs]);

  useEffect(() => {
    setActiveTab(0);
  }, [tabs]);

  const hasTabs = tabs && tabs.length > 0;

  return (
    <Slide>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.4em" }}>
        <h3 style={{ color, margin: 0, flex: 1, textAlign: "left" }}>{title}</h3>
        {hasTabs && (
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => setView("preview")}
              style={toggleStyle(view === "preview")}
            >
              Preview
            </button>
            <button
              onClick={() => setView("code")}
              style={toggleStyle(view === "code")}
            >
              Code
            </button>
          </div>
        )}
      </div>

      {(!hasTabs || view === "preview") ? (
        <iframe
          src={src}
          style={{
            width: "100%",
            height: "520px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            background: "#0d1117",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "520px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            background: "#0d1117",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {tabs.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: "2px",
                padding: "6px 8px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0,
              }}
            >
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  style={fileTabStyle(i === activeTab)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <pre style={{ margin: 0, flex: 1, overflow: "auto", padding: "1em" }}>
            <code
              className={
                tabs[activeTab].language
                  ? `language-${tabs[activeTab].language}`
                  : undefined
              }
              style={{ fontSize: "0.75em", background: "transparent" }}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </pre>
        </div>
      )}
    </Slide>
  );
}

function toggleStyle(active: boolean): CSSProperties {
  return {
    padding: "4px 12px",
    borderRadius: "4px",
    border: active
      ? "1px solid rgba(255,255,255,0.25)"
      : "1px solid rgba(255,255,255,0.08)",
    background: active ? "rgba(255,255,255,0.1)" : "transparent",
    color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
    cursor: "pointer",
    fontSize: "0.75em",
    fontFamily: "inherit",
    transition: "all 0.15s",
  };
}

function fileTabStyle(active: boolean): CSSProperties {
  return {
    padding: "2px 10px",
    borderRadius: "3px",
    border: "none",
    background: active ? "rgba(255,255,255,0.12)" : "transparent",
    color: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
    cursor: "pointer",
    fontSize: "0.72em",
    fontFamily: "inherit",
  };
}
