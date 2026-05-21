import { SectionOpener } from "../shared/SectionOpener";
import { ContentSlide } from "../shared/ContentSlide";
import { CodePanel } from "../shared/CodePanel";
import { SECTION_COLORS, BODY, MUTED } from "../shared/theme";

const COLOR = SECTION_COLORS.underTheHood;

export function UnderTheHoodSectionOpener() {
  return <SectionOpener number="05" title="Under the Hood" color={COLOR} />;
}

const withoutAsConst = `export const appRoutes: Routes = [
  { path: 'projects', component: Projects },
  { path: 'settings', component: Settings },
];

// TypeScript sees:
// path: string  ← cant do anything with this`;

const withAsConst = `export const appRoutes = [
  { path: 'projects', component: Projects },
  { path: 'settings', component: Settings },
] as const satisfies Routes;

// TypeScript sees:
// path: 'projects' | 'settings' ← every literal`;

export function AsConstSatisfiesSlide() {
  return (
    <ContentSlide
      title={<>Ingredient #1 — <code>as const satisfies Routes</code></>}
      subhead="Preserve the literal types — and still validate against Angular's Routes."
      color={COLOR}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1em",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.8em",
              fontWeight: 700,
              color: "#f85149",
              marginBottom: "0.4em",
            }}
          >
            ✗ Without
          </div>
          <CodePanel code={withoutAsConst} fontSize="0.6em" />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.8em",
              fontWeight: 700,
              color: "#3fb950",
              marginBottom: "0.4em",
            }}
          >
            ✓ With
          </div>
          <CodePanel code={withAsConst} fontSize="0.6em" />
        </div>
      </div>
    </ContentSlide>
  );
}

const augmentSnippet = `// inside the library
export interface UserTypedRoutes {}
//               ^ empty interface — a slot waiting to be filled

// inside your app — declaration merging fills the slot
declare module 'angular-typed-router' {
  interface UserTypedRoutes {
    routes: typeof appRoutes;
  }
}`;

export function AugmentationSlide() {
  return (
    <ContentSlide
      title="Layer 1 — Interface Augmentation"
      subhead='"Hey TypeScript: here is extra info about this library."'
      color={COLOR}
    >
      <CodePanel code={augmentSnippet} language="typescript" fontSize="0.65em" />
      <p
        style={{
          fontSize: "0.85em",
          color: MUTED,
          marginTop: "0.9em",
          lineHeight: 1.5,
        }}
      >
        The library ships an empty interface. Your app pours your routes into it.
        From there on, every internal type sees them.
      </p>
    </ContentSlide>
  );
}

const pipelineCss = `
.pipe-box {
  font-size: 0.6em;
  font-weight: 600;
  padding: 0.25em 0.7em;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  color: oklch(85% .01 0);
  text-align: left;
  line-height: 1.3;
}
.pipe-arrow {
  text-align: center;
  font-size: 0.65em;
  color: ${COLOR};
  opacity: 0.5;
  line-height: 1;
  margin: -0.05em 0;
}
.pipe-note {
  font-size: 0.85em;
  color: oklch(65% .01 0);
  font-weight: 400;
  margin-left: 0.5em;
}
`;

export function PipelineOverviewSlide() {
  const steps: { title: string; note: string }[] = [
    { title: "Routes array", note: "your typed-router.d.ts wires it in" },
    { title: "ExtractRawPaths", note: "distributive conditional over Routes[number]" },
    { title: "Three branches per route", note: "self, eager children, lazy children" },
    { title: "Is it navigable?", note: "component / loadComponent / redirectTo" },
    { title: "JoinPathSegments", note: "template literal types — parent + child" },
    { title: "Raw paths with :param markers", note: "e.g. 'org/:org-id/project/:project-id'" },
    { title: "→ RawPathToUrl   |   → RawPathToCommands", note: "string form & tuple form" },
    { title: "Path  &  Commands", note: "every valid URL, every valid tuple" },
  ];
  return (
    <ContentSlide
      title="Layer 2 — The Type Pipeline"
      subhead="A chain of small types that walk your route tree."
      color={COLOR}
      padding="0 8%"
    >
      <style>{pipelineCss}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
          width: "75%",
          margin: "0 auto",
        }}
      >
        {steps.map((s, i) => (
          <div key={s.title}>
            <div
              className="pipe-box"
              style={{
                borderLeft: `3px solid ${COLOR}`,
                opacity: 1 - i * 0.05,
              }}
            >
              {s.title}
              <span className="pipe-note">— {s.note}</span>
            </div>
            {i < steps.length - 1 && <div className="pipe-arrow">↓</div>}
          </div>
        ))}
      </div>
    </ContentSlide>
  );
}

const extractRoutesSnippet = `export type ExtractRawPaths<
  Routes extends readonly Route[],
  Prefix extends string = ''
> = Routes[number] extends infer R
  ? R extends Route
    ? ExtractRawPathsFromRoute<R, Prefix>
    : never
  : never;`;

export function ExtractRawPathsSlide() {
  return (
    <ContentSlide
      title={<>The Engine — <code>ExtractRawPaths</code></>}
      subhead="A distributive conditional iterates the whole array at the type level."
      color={COLOR}
    >
      <CodePanel
        code={extractRoutesSnippet}
        language="typescript"
        fontSize="0.7em"
      />
      <ul
        style={{
          fontSize: "0.78em",
          color: MUTED,
          lineHeight: 1.6,
          margin: "1em 0 0",
          paddingLeft: "1.2em",
        }}
      >
        <li><code>Routes[number]</code> — "for each route in the array"</li>
        <li><code>extends infer R</code> — give that route a name we can match against</li>
        <li>Recurse into <code>ExtractRawPathsFromRoute</code> for each one</li>
        <li>Output: a union of raw path strings</li>
      </ul>
    </ContentSlide>
  );
}

const extractRouteSnippet = `export type ExtractRawPathsFromRoute<R extends Route, Prefix extends string = ''> =
  | (IsNavigable<R> extends true
      ? JoinPathSegments<Prefix, RoutePathOrEmpty<R>>
      : never)
  | (R['children'] extends readonly Route[]
      ? ExtractRawPaths<R['children'], JoinPathSegments<Prefix, RoutePathOrEmpty<R>>>
      : never)
  | (R['loadChildren'] extends () => Promise<any>
      ? ExtractRawPaths<ExtractLazyChildRoutes<R>, JoinPathSegments<Prefix, RoutePathOrEmpty<R>>>
      : never);`;

export function ExtractRouteSlide() {
  return (
    <ContentSlide
      title="Three Branches Per Route"
      subhead="Itself, eager children, lazy children — union them all."
      color={COLOR}
    >
      <CodePanel
        code={extractRouteSnippet}
        language="typescript"
        fontSize="0.55em"
      />
      <p
        style={{
          fontSize: "0.8em",
          color: MUTED,
          marginTop: "0.8em",
          lineHeight: 1.5,
        }}
      >
        Each route contributes <i>up to three</i> things to the raw-path union: itself,
        its eager children, and its lazy children. <code>Prefix</code> threads the parent
        path down so children come out fully qualified.
      </p>
    </ContentSlide>
  );
}

const rawPathToUrlSnippet = `// ResolveParam<Name> = RouteParamTypes[Name]  // or never if undeclared

export type RawPathToUrl<S extends string> =
  S extends \`\${infer Start}:\${infer Param}/\${infer Rest}\`
    ? \`\${Start}\${ResolveParam<Param>}/\${RawPathToUrl<Rest>}\`
    : S extends \`\${infer Start}:\${infer Param}\`
      ? \`\${Start}\${ResolveParam<Param>}\`
      : S extends \`\${infer Start}**/\${infer Rest}\`
        ? \`\${Start}\${string}/\${RawPathToUrl<Rest>}\`
        : S extends \`\${infer Start}**\`
          ? Start extends '' ? RootCatchAll : \`\${Start}\${string}\`
          : S;`;

export function RawPathToUrlSlide() {
  return (
    <ContentSlide
      title={<><code>RawPathToUrl</code> — Template Literal Surgery</>}
      subhead="Walk the raw path, swap each :param for its declared type."
      color={COLOR}
    >
      <CodePanel
        code={rawPathToUrlSnippet}
        language="typescript"
        fontSize="0.55em"
      />
      <p
        style={{
          fontSize: "0.78em",
          color: BODY,
          marginTop: "0.7em",
          lineHeight: 1.5,
        }}
      >
        <code>'org/:org-id/project/:project-id'</code> becomes
        {" "}<code>{"`org/${OrgId}/project/${ProjectId}`"}</code>.
      </p>
    </ContentSlide>
  );
}

const withoutBranded = `interface RouteParamTypes {
  id: string;
}

// anything goes — every string is a valid id
router.navigateByUrl('/users/not-a-real-id'); // ✓ compiles`;

const withBranded = `type UserId = string & { readonly __brand: 'UserId' };

interface RouteParamTypes {
  id: UserId;
}

// only validated UserIds flow into the path
router.navigateByUrl(\`/users/\${asUserId(raw)}\`); // ✓
router.navigateByUrl('/users/not-a-real-id');      // ✗ compile error`;

export function BrandedTypesSlide() {
  return (
    <ContentSlide
      title={<>Sidebar — <code>Branded Types</code></>}
      subhead="Nominal typing in a structurally-typed language — the trick that makes :param types meaningful."
      color={COLOR}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1em",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.8em",
              fontWeight: 700,
              color: "#f85149",
              marginBottom: "0.4em",
            }}
          >
            ✗ Without
          </div>
          <CodePanel code={withoutBranded} fontSize="0.6em" />
        </div>
        <div>
          <div
            style={{
              fontSize: "0.8em",
              fontWeight: 700,
              color: "#3fb950",
              marginBottom: "0.4em",
            }}
          >
            ✓ With
          </div>
          <CodePanel code={withBranded} fontSize="0.6em" />
        </div>
      </div>
    </ContentSlide>
  );
}

const rawPathToCommandsSnippet = `// Resolve one segment: ':name' → ResolveParam<'name'>, literal → itself
type ResolveSegment<S extends string> =
  S extends \`:\${infer Name}\` ? ResolveParam<Name> : Normalize<S>;

export type RawPathToCommands<P extends string> =
  P extends \`\${infer Head}/\${infer Rest}\`
    ? ResolveSegment<Head> extends infer H
      ? H extends string | number ? [H, ...RawPathToCommands<Rest>] : never
      : never
    : P extends ''
      ? []
      : ResolveSegment<P> extends infer H
        ? H extends string | number ? [H] : never
        : never;`;

export function RawPathToCommandsSlide() {
  return (
    <ContentSlide
      title={<><code>RawPathToCommands</code> — Raw Path → Tuple</>}
      subhead="Same raw path, different shape: split on `/` and resolve each :param in place."
      color={COLOR}
    >
      <CodePanel
        code={rawPathToCommandsSnippet}
        language="typescript"
        fontSize="0.52em"
      />
      <p
        style={{
          fontSize: "0.78em",
          color: BODY,
          marginTop: "0.7em",
          lineHeight: 1.5,
        }}
      >
        <code>'org/:org-id/project/:project-id'</code> → <code>['org', OrgId, 'project', ProjectId]</code>.
        Any segment that resolves to <code>never</code> collapses the whole tuple to <code>never</code> — the route disappears here too.
      </p>
    </ContentSlide>
  );
}

const runtimeSnippet = `@Injectable({ providedIn: 'root' })
export class TypedRouter extends Router {
  override navigate(commands: Commands, extras?: NavigationExtras) {
    return super.navigate(commands, extras);
  }
  override navigateByUrl(url: Path, extras?: NavigationBehaviorOptions) {
    return super.navigateByUrl(url, extras);
  }
  override createUrlTree(commands: Commands, extras?: UrlCreationOptions) {
    return super.createUrlTree(commands, extras);
  }
}

@Directive({ selector: '[routerLink]', providers: [...] })
export class TypedRouterLink extends RouterLink {
  @Input() override set routerLink(v: Commands | Path | UrlTree | null) {
    super.routerLink = v;
  }
}`;

export function RuntimeSlide() {
  return (
    <ContentSlide
      title="The Entire Runtime"
      subhead="Two thin wrappers. The types do all the work."
      color={COLOR}
    >
      <CodePanel
        code={runtimeSnippet}
        language="typescript"
        fontSize="0.58em"
      />
      <p
        style={{
          fontSize: "0.85em",
          color: BODY,
          marginTop: "0.8em",
          lineHeight: 1.5,
        }}
      >
        Everything else happens at compile time and <b>disappears</b>. Zero bytes in your bundle.
      </p>
    </ContentSlide>
  );
}
