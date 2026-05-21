import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.stringlyTyped;

export function StringlyTypedSectionOpener() {
  return <SectionOpener number="01" title="Stringly Typed" color={COLOR} />;
}

const routerConfigSnippet = `// routes are configured as strings
export const appRoutes: Routes = [
  { path: 'projects',          component: ProjectsPage },
  { path: 'projects/:id',      component: ProjectDetailPage },
  { path: 'settings',          component: SettingsPage },
];`;

const routerNavigationSnippet = `// and you navigate with strings
this.router.navigateByUrl('/projects/42');

<a [routerLink]="['/projects', project.id]">Open</a>`;

export function RouterIsStringsSlide() {
  return (
    <ContentSlide
      title="The Angular Router Speaks Strings"
      subhead="Both ends of the router — config and navigation — are just strings."
      color={COLOR}
    >
      <CodePanel code={routerConfigSnippet} language="typescript" fontSize="0.6em" />
      <div style={{ height: "0.6em" }} />
      <CodePanel code={routerNavigationSnippet} language="typescript" fontSize="0.6em" />
      <p
        style={{
          fontSize: "0.72em",
          color: MUTED,
          marginTop: "0.8em",
          lineHeight: 1.5,
        }}
      >
        Nothing connects the two. TypeScript has no idea that <code>'/projects/42'</code> is supposed
        to match a route you defined somewhere else.
      </p>
    </ContentSlide>
  );
}

export function OpeningSlide() {
  return (
    <BulletSlide
      title="Routing is a string guessing game"
      subhead="The pattern I keep seeing on every Angular project."
      color={COLOR}
      bullets={[
        <>You hardcode paths as strings — <code>'/projects/42'</code></>,
        <>The compiler doesn't know what a route is — typos compile fine</>,
        <>You only find out something is broken during the runtime</>,
      ]}
    />
  );
}

const typoSnippet = `// somewhere in a component
this.router.navigateByUrl('/projcts/42');
                          // ^^^^^^^^^^ typo
                          // compiles fine.
                          // blank page in production.

// or six months later, somebody renames a route:
{ path: 'projects', ... }  →  { path: 'workspaces', ... }

// the 12 navigateByUrl calls scattered across the app?
// break silently. you (or your coding agent) have to remember to adjust them.`;

export function TypoExampleSlide() {
  return (
    <ContentSlide
      title="Failure Modes"
      subhead="A typo today, or a rename six months from now."
      color={COLOR}
    >
      <CodePanel code={typoSnippet} language="typescript" fontSize="0.7em" />
    </ContentSlide>
  );
}

const constantsSnippet = `export const ROUTES = {
  projects: '/projects',
  settings: '/settings',
  // ... 40 more entries you have to keep in sync
} as const;

router.navigateByUrl(ROUTES.projects);  // ✓ no more typos`;

export function StringConstantsSlide() {
  return (
    <ContentSlide
      title="Workaround #1 — String Constants"
      subhead="Catches typos. Doesn't catch much else."
      color={COLOR}
    >
      <CodePanel code={constantsSnippet} language="typescript" fontSize="0.65em" />
      <ul
        style={{
          fontSize: "0.8em",
          color: MUTED,
          lineHeight: 1.6,
          margin: "0.8em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li>Rename a path in <code>Routes</code>? The constant is now <i>stale</i> and TypeScript can't tell</li>
        <li>Manual maintenance: a second list of routes to keep in sync</li>
      </ul>
    </ContentSlide>
  );
}

const pathsConstSnippet = `// route-paths.ts — one flat list of path strings
export const ROUTES = {
  projects: 'projects',
  projectDetail: 'projects/:id',
} as const;`;

const sharedRoutesSnippet = `// app.routes.ts — the config reads from the same constants
export const appRoutes: Routes = [
  { path: ROUTES.projects,      component: ProjectsPage },
  { path: ROUTES.projectDetail, component: ProjectDetailPage },
];`;

export function SharedConstantsSlide() {
  return (
    <ContentSlide
      title="Workaround #2 — Shared Constants"
      subhead="Use the same constants in the routes config and in navigation."
      color={COLOR}
    >
      <CodePanel code={pathsConstSnippet} language="typescript" fontSize="0.6em" />
      <div style={{ height: "0.6em" }} />
      <CodePanel code={sharedRoutesSnippet} language="typescript" fontSize="0.6em" />
      <p
        style={{
          fontSize: "0.72em",
          color: MUTED,
          marginTop: "0.8em",
          lineHeight: 1.5,
        }}
      >
        Better — but the constant is still a flat list of strings. Children, nested paths,
        and <code>:id</code> are still untyped. And your route tree is not really a tree anymore.
      </p>
    </ContentSlide>
  );
}

export function KeyMomentSlide() {
  return (
    <ContentSlide
      title={<>The Pattern I Kept Seeing</>}
      subhead="Every approach had the same shape and the same flaws."
      color={COLOR}
    >
      <div
        style={{
          fontSize: "0.95em",
          fontWeight: 500,
          color: BODY,
          lineHeight: 1.5,
          padding: "0.3em 0 0.3em 1em",
          borderLeft: `3px solid ${COLOR}`,
        }}
      >
        Every fix I'd seen was a <b style={{ color: COLOR }}>second source of truth</b>.
        <br />
        The routes live in one place and then something else,
        somewhere else, has to be kept in sync by hand. Or you are now limited in how you structure your routes.
      </div>
    </ContentSlide>
  );
}
