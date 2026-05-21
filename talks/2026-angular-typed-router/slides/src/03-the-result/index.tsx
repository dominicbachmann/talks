import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { BulletSlide } from "../shared/BulletSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.theResult;

export function TheResultSectionOpener() {
  return <SectionOpener number="03" title="The Result" color={COLOR} />;
}

export function DemoIntroSlide() {
  return (
    <ContentSlide
      title="Live Demo"
      subhead="One source of truth. Every reference checked. Zero codegen."
      color={COLOR}
    >
      <p style={{ fontSize: "0.9em", color: MUTED, lineHeight: 1.5 }}>
        We'll walk through autocomplete, typos, a rename refactor, and typed parameters.
      </p>
        <aside className="notes">
            autocomplete, typos, rename, typed parameters, with and without eslint plugin
        </aside>
    </ContentSlide>
  );
}

const routesSnippet = `export const appRoutes = [
  { path: '', component: Root },
  { 
   path: 'page1',
   loadComponent: () => import('./features/page1').then(m => m.Page1) 
  },
  { 
    path: 'page3/:param/:other-param', 
    component: Page3,
    loadChildren: () => import('./features/child-routes').then(m => m.routes) 
  },
  ...
] as const satisfies Routes;`;

export function OneSourceOfTruthSlide() {
  return (
    <ContentSlide
      title="One Source of Truth"
      color={COLOR}
    >
      <CodePanel code={routesSnippet} language="typescript" fontSize="0.55em" />
    </ContentSlide>
  );
}

const dtsSnippet = `import type { appRoutes } from './src/app/app.routes';

declare module 'angular-typed-router' {
  interface UserTypedRoutes {
    routes: typeof appRoutes;
  }
  interface RouteParamTypes {
    param: SomeBrandedType;
    'other-param': SomeOtherBrandedType;
  }
}`;

export function TenLineConnectorSlide() {
  return (
    <ContentSlide
      title="The small Connector"
      subhead="One .d.ts file. That's the whole wiring."
      color={COLOR}
    >
      <CodePanel code={dtsSnippet} language="typescript" fontSize="0.65em" />
      <p
        style={{
          fontSize: "0.85em",
          color: MUTED,
          marginTop: "0.9em",
          lineHeight: 1.5,
        }}
      >
        From here on, the library "sees" your routes — no build step, no codegen.
      </p>
    </ContentSlide>
  );
}

const autocompleteSnippet = `this.router.navigateByUrl('/');
                          ┃
                          ┣━ '/'
                          ┣━ '/page1'
                          ┣━ '/page2'
                          ┣━ '/page2/child'
                          ┣━ '/page3'
                          ┣━ '/page3/lazy-child'
                          ┣━ '/intermediate/child'
                          ┗━ '/with-param/...'`;

export function AutocompleteSlide() {
  return (
    <ContentSlide
      title="Autocomplete on Every Path"
      subhead="Type `/` — TypeScript lists every valid URL in your app."
      color={COLOR}
    >
      <CodePanel code={autocompleteSnippet} language="text" fontSize="0.7em" />
    </ContentSlide>
  );
}

const typoCatchSnippet = `// Before — blank page in production
this.router.navigateByUrl('/projcts');

// After — compile error
this.router.navigateByUrl('/projcts');
//                        ~~~~~~~~~~
// Argument of type '"/projcts"' is not assignable
// to parameter of type Path.`;

export function TypoCatchSlide() {
  return (
    <ContentSlide
      title="Typos Become Compile Errors"
      subhead="The blank page you would have shipped is now a red squiggle."
      color={COLOR}
    >
      <CodePanel code={typoCatchSnippet} language="typescript" fontSize="0.65em" />
    </ContentSlide>
  );
}

const templateSnippet = `<a routerLink="/page2/child">Child</a>
<a routerLink="/page3/lazy-child">Lazy</a>
<a routerLink="/with-param/home/else">With Param</a>

<!-- typo? same red squiggle, in your template -->
<a routerLink="/page2/chld">Child</a>`;

export function TemplateLinksSlide() {
  return (
    <ContentSlide
      title="routerLink — Same Safety"
      subhead="The directive checks paths just like the router does."
      color={COLOR}
    >
      <CodePanel code={templateSnippet} language="html" fontSize="0.7em" />
    </ContentSlide>
  );
}

export function RefactorMomentSlide() {
  return (
    <BulletSlide
      title="Better refactoring"
      subhead="Rename one route path. Watch the whole codebase react."
      color={COLOR}
      bullets={[
        <>Change a route</>,
        <>Every <code>navigateByUrl</code> and <code>routerLink</code> referencing it lights up red — instantly</>,
        <>One change. Every broken reference.</>,
      ]}
    />
  );
}

const paramSnippet = `// in typed-router.d.ts
interface RouteParamTypes {
  param: SomeBrandedType;
  'other-param': SomeOtherBrandedType;
}

// ✓ allowed — branded values flow into the path
router.navigateByUrl(\`/with-param/\${userId}/\${tab}\`);

// ✗ compile error — string isn't assignable to SomeBrandedType
router.navigateByUrl('/with-param/foo/bar');`;

export function ParamTypesSlide() {
  return (
    <ContentSlide
      title="Parameters You Can Constrain"
      subhead="`:param` segments only accept the values you allow."
      color={COLOR}
    >
      <CodePanel code={paramSnippet} language="typescript" fontSize="0.65em" />
    </ContentSlide>
  );
}
