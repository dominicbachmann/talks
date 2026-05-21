import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.setup;

export function SetupSectionOpener() {
  return <SectionOpener number="04" title="How to Set It Up" color={COLOR} />;
}

export function ThreeStepsSlide() {
  const steps = [
    { num: "1", label: "Install", text: <>One command — <code>ng add</code> does the wiring</> },
    { num: "2", label: "Connect", text: <>One <code>.d.ts</code> file points the lib at your routes</> },
    { num: "3", label: "Use", text: <>Swap two imports — <code>TypedRouter</code>, <code>TypedRouterLink</code></> },
  ];
  return (
    <ContentSlide
      title="Three Steps"
      subhead="No build plugin. No codegen. No watchers."
      color={COLOR}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          width: "100%",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.num}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1em",
              padding: "0.6em 1em",
              borderLeft: `3px solid ${COLOR}`,
              background: "rgba(255,255,255,0.02)",
              borderRadius: 6,
            }}
          >
            <span
              style={{
                fontSize: "1.4em",
                fontWeight: 800,
                color: COLOR,
                minWidth: "1.4em",
              }}
            >
              {s.num}
            </span>
            <div>
              <div
                style={{ fontSize: "0.9em", fontWeight: 700, color: BODY }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: "0.8em",
                  color: MUTED,
                  marginTop: "0.15em",
                }}
              >
                {s.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}

const installSnippet = `# adds the package, creates typed-router.d.ts,
# wires it into tsconfig.app.json
ng add angular-typed-router`;

export function InstallSlide() {
  return (
    <ContentSlide
      title={<>Step 1 — <code>ng add</code></>}
      subhead="The schematic does the boring parts."
      color={COLOR}
    >
      <CodePanel code={installSnippet} language="bash" fontSize="0.7em" />
      <ul
        style={{
          fontSize: "0.85em",
          color: MUTED,
          lineHeight: 1.6,
          margin: "1em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li>Installs the package</li>
        <li>Creates <code>typed-router.d.ts</code> for you</li>
        <li>Updates <code>tsconfig.app.json</code> so the compiler picks it up</li>
      </ul>
    </ContentSlide>
  );
}

const connectSnippet = `// typed-router.d.ts (sibling to main.ts)
import type { appRoutes } from './app/app.routes';

declare module 'angular-typed-router' {
  interface UserTypedRoutes {
    routes: typeof appRoutes;
  }

  // constrain param values
  interface RouteParamTypes {
    id: \`\${number}\`;
  }
}`;

export function ConnectRoutesSlide() {
  return (
    <ContentSlide
      title="Step 2 — Connect Your Routes"
      subhead="Declaration merging is the entire config."
      color={COLOR}
    >
      <CodePanel code={connectSnippet} language="typescript" fontSize="0.65em" />
      <p
        style={{
          fontSize: "0.85em",
          color: BODY,
          marginTop: "0.9em",
          lineHeight: 1.5,
        }}
      >
        That's the whole connection. No build plugin. No codegen step.
      </p>
    </ContentSlide>
  );
}

const useSnippet = `import { Component, inject } from '@angular/core';
import { TypedRouter, TypedRouterLink } from 'angular-typed-router';

@Component({
  selector: 'app-nav',
  imports: [TypedRouterLink],
  template: \`<a routerLink="/dashboard">Dashboard</a>\`,
})
export class Nav {
  private readonly router = inject(TypedRouter);

  go() {
    this.router.navigateByUrl('/dashboard');   // ✓ Path
    this.router.navigate(['/', 'projects', id]); // ✓ Commands
  }
}`;

export function UseTypedRouterSlide() {
  return (
    <ContentSlide
      title={<>Step 3 — Use <code>TypedRouter</code> & <code>TypedRouterLink</code></>}
      subhead="Drop-in replacements. Same API, now typed."
      color={COLOR}
    >
      <CodePanel code={useSnippet} language="typescript" fontSize="0.6em" />
    </ContentSlide>
  );
}

const eslintSnippet = `// eslint.config.js
import typedRouter from 'angular-typed-router-eslint';

export default [
  ...typedRouter,
  // forbids @angular/router's Router / RouterLink imports
  // enforces absolute paths (no relativeTo)
  // strips trailing slashes (auto-fix)
];`;

export function EslintPluginSlide() {
  return (
    <ContentSlide
      title="The Companion ESLint Plugin"
      subhead="Keeps untyped escape hatches out of the codebase."
      color={COLOR}
    >
      <CodePanel code={eslintSnippet} language="typescript" fontSize="0.65em" />
      <ul
        style={{
          fontSize: "0.80em",
          color: MUTED,
          lineHeight: 1.6,
          margin: "1em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li><code>no-restricted-imports</code> — block <code>Router</code> / <code>RouterLink</code> from <code>@angular/router</code></li>
        <li><code>no-relative-to-navigation</code> — relative paths can't be typed; force absolute</li></ul>
    </ContentSlide>
  );
}

export function OverheadSlide() {
  return (
    <ContentSlide
      title="Total Overhead"
      color={COLOR}
    >
      <div
        style={{
          fontSize: "1.2em",
          fontWeight: 500,
          color: BODY,
          lineHeight: 1.7,
          padding: "0.4em 0 0.4em 1em",
          borderLeft: `3px solid ${COLOR}`,
        }}
      >
        One declaration file.
        <br />
        Two import swaps.
        <br />
        Routes defined with <code>as const satisfies Routes</code>.
        <br />
        Everything else is automatic.
      </div>
    </ContentSlide>
  );
}
