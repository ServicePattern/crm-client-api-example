# Bright Pattern Comm.Widget — Client-Side JS API Example

This repository is a **public, reference integration** for the Bright Pattern
Comm.Widget JavaScript API (the client-side SDK, also called the "CRM adapter API").
It is published for Bright Pattern **customers and partners** so they can learn, by
example, how to embed and control Comm.Widget from their own web application (a CRM,
a helpdesk, a custom agent desktop, etc.).

If you are a coding agent reading this to help build a **custom integration**, treat
this project as the canonical, working example of every SDK capability. The patterns
here (how the API instance is created, how methods are called, how callbacks are
registered and answered) are the patterns a real integration should copy. Adapt the
UI to the customer's product; keep the API-interaction shape.

The project is also used internally for **manual API testing** — it exposes every SDK
method and every event as an interactive control, and logs all traffic in both
directions.

## Official documentation

- SDK spec (methods, events, types): https://help.brightpattern.com/latest:AgentDesktop-client-side-javascript-api-specification/APIMethods

When something here disagrees with the official spec, the spec wins — but note that
[src/brightpattern-client-api-types.d.ts](src/brightpattern-client-api-types.d.ts) is
kept in sync with the SDK and is the most convenient in-repo reference.

## What is Comm.Widget?

Comm.Widget is Bright Pattern's embeddable agent application (softphone, chat, agent
state, interaction handling, knowledge base, etc.). A host page loads the SDK script,
constructs an API instance, and from then on:

- **calls methods** on the instance to command the widget (log in, set agent state,
  start a call, transfer, add a note, …), and
- **registers callbacks** to react to widget events (new interaction, agent state
  change, server error, …) and, for some events, to **supply data back** to the widget
  (custom transfer data, knowledge-base content, record validation, …).

This example wraps each capability in a small HTML control + a controller so a human
can click through the whole surface, and so an integrator can see the exact call.

## How the SDK is loaded and instantiated

See [src/app.ts](src/app.ts). This is the single most important file to understand the
integration entry point.

1. The SDK script is injected at runtime from the tenant:
   `https://<bpatternDomain>/agent/<app>/adapters/api.js`
   where `<app>` is `crmembedded` for Comm.Widget **2.0** (default) or `communicator`
   for **1.0**.
2. Once loaded, it exposes `window.brightpattern.AdApi` (typed as
   `AgentDesktopClientAPI`).
3. The instance is created once and reused everywhere:
   ```ts
   const adApi = new window.brightpattern.AdApi({
       integrationKey,                 // identifies this integration to the tenant
       standalone: false,              // true = no Comm.Widget UI, API only
       disableNewInteractionPopup: false,
   })
   ```
4. The instance is assigned to `window.adApi` **for manual console testing only** —
   a real integration should not leak it to the global scope.
5. `adApi` is then passed into every `initialize<Feature>Handlers(adApi)` function,
   which is where the actual API usage lives.

## Architecture — one feature, three files

Every feature/section follows the same three-part convention. To find or add a
capability, follow this map:

| Part        | Location                                   | Role                                                             |
|-------------|--------------------------------------------|------------------------------------------------------------------|
| **View**    | `src/views/sections/<feature>.html`        | Handlebars partial: the control's markup (inputs, buttons by `id`)|
| **Mount**   | `<section data-name="<feature>">` in [index.html](index.html) | Places the partial in the page                    |
| **Controller** | `src/controllers/<feature>.ts`          | `initialize<Feature>Handlers(adApi)` — wires DOM to the SDK       |

Controllers are the part that matters for integration. They:

- look up DOM elements by `id`,
- attach `onclick`/`onsubmit` handlers that call `adApi.<method>(...)`, and
- register event handlers via `adApi.on('ON_...', handler)`.

Each controller is wired up once in `initializeIntegration()` in
[src/app.ts](src/app.ts). Adding a feature means: create the view partial, add the
`<section>` to [index.html](index.html), create the controller, and call its
`initialize...` function in [src/app.ts](src/app.ts).

Interaction-related controllers live under
[src/controllers/interactions/](src/controllers/interactions/).

## The two halves of the API

### 1. Request methods — you command the widget

Methods return `Promise<OperationResult<T>>`:

```ts
type OperationResult<T = null> =
    | { status: 'success'; data: T }
    | { status: 'error'; error: ResultError }
```

Always branch on `status`; do not assume success. Example (from
[src/controllers/session.ts](src/controllers/session.ts)):

```ts
const result = await adApi.getLoginState()
if (result.status === 'success') {
    console.log(result.data.isLoggedIn)
} else {
    console.error(result.error.name, result.error.code)
}
```

Error codes are enumerated in `resultErrorCodes` (per-request failures) and
`serverErrorCodes` (session/server-level) in the types file.

### 2. Callbacks — the widget notifies you

Register with `adApi.on('ON_EVENT', handler)` and unregister with
`adApi.remove('ON_EVENT', handler)`.

Two kinds (see `callbackMessages` in the types file):

- **Notification callbacks** (`needResponse: false`) — fire-and-forget. Just react.
  ```ts
  adApi.on('ON_AGENT_STATE_CHANGE', (state, notReadyReason) => { /* update UI */ })
  ```
- **Data-providing callbacks** (`needResponse: true`) — the widget is **asking the
  host for data**. The handler's **return value (sync or Promise) is sent back** to
  the widget. Returning the wrong shape, or throwing, breaks the widget feature.
  Examples: `ON_REQUEST_TRANSFER_DATA` (see
  [src/controllers/interactions/transfer.ts](src/controllers/interactions/transfer.ts)),
  the `ON_..._KNOWLEDGE_BASE_...` family (see
  [src/controllers/knowledge-base.ts](src/controllers/knowledge-base.ts)),
  `ON_SAVE_ACTIVITY_RECORD`, `ON_VALIDATE_ASSOCIATED_RECORDS`.

`SyncAsyncResult<T> = T | Promise<T>` — data-providing handlers may be async.

### Types are the source of truth

[src/brightpattern-client-api-types.d.ts](src/brightpattern-client-api-types.d.ts)
declares the full `AgentDesktopClientAPI` class (every method signature and every
`on`/`remove` overload) plus all data types, agent/interaction state enums, channel
types, and error codes. It has **no imports by design** — keep it dependency-free.
When exploring "what can the SDK do", read this file first.

## Logging (how to see API traffic)

The `Logger` model ([src/models/logger.ts](src/models/logger.ts)) calls
`adApi.injectMessageLogger((message, data) => ...)`, the SDK hook that reports **every**
inbound and outbound message. The example renders these into the on-page log panel,
color-coded: outgoing request / outgoing result / incoming event / incoming result /
error. Use the on-screen log (and the browser console) to debug any integration.

## Running the example

Requires Node + Yarn (`packageManager: yarn@4.1.1`).

Dev server with hot reload (test page on `localhost:5173`):

```bash
yarn
yarn dev
```

Production build (compiles to `public/`):

```bash
yarn
yarn build
```

You must point the app at a real Bright Pattern tenant via the `bpatternDomain` URL
parameter, e.g.:

```
http://localhost:5173?bpatternDomain=example.brightpattern.com
```

### URL parameters (configuration)

| Param            | Values          | Effect                                                            |
|------------------|-----------------|-------------------------------------------------------------------|
| `bpatternDomain` | tenant hostname | **Required.** Which tenant's SDK/widget to load                   |
| `version`        | `2.0` (default) / `1.0` | Comm.Widget + API version (`crmembedded` vs `communicator` script) |
| `standalone`     | present/absent  | `true` = API only, no Comm.Widget UI                              |
| `no-popup`       | present/absent  | Disable the new-interaction popup                                 |
| `integrationKey` | string          | Integration key (defaults to `test-adapter`)                      |

See [README.md](README.md) for concrete example URLs.

## Tech stack & conventions

- **TypeScript** (strict SDK types), **Vite** dev server/bundler, **Handlebars**
  partials for views ([vite.config.js](vite.config.js) registers `src/views` as the
  partial directory), **Tailwind CSS** v4 plus hand-written CSS in `src/styles/`.
- No framework — plain DOM APIs. Controllers get elements with
  `document.getElementById(...)` / `querySelector(...)`, matched against the `id`s in
  the corresponding view partial.
- Shared helpers in [src/helpers.ts](src/helpers.ts) (`assertDefined`, tree traversal,
  hover highlighting). UI-only models (menu, tabs, hamburger, tree, logger) live in
  `src/models/`.
- Keep new code in the existing style: one controller per feature exporting a single
  `initialize<Feature>Handlers(adApi)` function; wire it in
  [src/app.ts](src/app.ts).

## Guidance for coding agents building a custom integration

When a customer asks you to build an integration based on this repo:

- **Copy the interaction pattern, not the demo UI.** The real, reusable knowledge is
  in `src/controllers/*` and the types file — how the instance is created, how each
  method is called, and which callbacks must return data.
- **Load the SDK from the customer's tenant**, using the same
  `https://<domain>/agent/<app>/adapters/api.js` mechanism; pick `crmembedded` (2.0)
  unless the customer explicitly needs 1.0.
- **Always handle `OperationResult.status === 'error'`** and register
  `ON_SERVER_ERROR` — the example's session controller shows a real re-login recovery
  on error `108` (`user_already_logged_in`).
- **For data-providing callbacks, honor the exact return type** in the handler
  signatures in the types file; the widget depends on the shape you return.
- **Do not expose the API instance globally** in production (the `window.adApi`
  assignment here is a testing convenience only).
- Verify method/event names and payloads against
  [src/brightpattern-client-api-types.d.ts](src/brightpattern-client-api-types.d.ts)
  and the official spec before using them.
