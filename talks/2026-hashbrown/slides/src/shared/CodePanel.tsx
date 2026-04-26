import hljs from "highlight.js/lib/core";
import typescriptLang from "highlight.js/lib/languages/typescript";
import xmlLang from "highlight.js/lib/languages/xml";
import markdownLang from "highlight.js/lib/languages/markdown";
import plaintextLang from "highlight.js/lib/languages/plaintext";
import "highlight.js/styles/github-dark-dimmed.css";

hljs.registerLanguage("typescript", typescriptLang);
hljs.registerLanguage("ts", typescriptLang);
hljs.registerLanguage("html", xmlLang);
hljs.registerLanguage("xml", xmlLang);
hljs.registerLanguage("markdown", markdownLang);
hljs.registerLanguage("md", markdownLang);
hljs.registerLanguage("text", plaintextLang);
hljs.registerLanguage("plaintext", plaintextLang);

export function buildHighlightedHtml(
  code: string,
  language: string | undefined,
): string {
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

interface CodePanelProps {
  code: string;
  language?: string;
  fontSize?: string;
}

export function CodePanel({
  code,
  language = "typescript",
  fontSize = "0.65em",
}: CodePanelProps) {
  return (
    <pre
      style={{
        margin: 0,
        padding: "0.75em 1em",
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        overflow: "auto",
      }}
    >
      <code
        className={`language-${language}`}
        style={{ fontSize, background: "transparent" }}
        dangerouslySetInnerHTML={{
          __html: buildHighlightedHtml(code, language),
        }}
      />
    </pre>
  );
}
