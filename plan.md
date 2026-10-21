# Hanpars full-site rebuild plan

## Direction and current status

Rebuild **hanpars.com in its existing GoDaddy Website Builder**. Keep the domain, email setup, product data and existing page addresses. This is the default for the user's request, not authorization to move hosting or change DNS. The live site remains unchanged while the redesign is built in GoDaddy's saved draft. Publication of the complete redesign will be a separate approval.

The public content of all 12 current pages has been reviewed and preserved locally. A native **manual GoDaddy backup was created on 21 October 2026**, shown in Site History as **Today, 16:18 — Manual Backup**. It is a builder version-history backup, not a portable export of account, customer or domain data. No reset or restore was performed.

The design reference is the owner-supplied and already-published Regulatory Affairs page. Its approved content can be retained without another capability-approval round; the redesign must not strengthen its claims or add unsupported certifications, guarantees, figures, facilities or medical outcomes.

## Proposed design

Use a clean pharmaceutical-business design: deep navy **#0B2A4A**, sky blue **#62D0F5**, pale-blue sections, generous white space, strong headings and restrained icons. Use the existing Hanpars brand rather than inventing a new identity. Where available in the builder, use Plus Jakarta Sans for headings and Source Sans 3 for body text; otherwise choose one coherent builder-supported sans-serif pairing.

Replace the oversized repeated slogan/banner with a compact shared brand header and page-specific heroes. Give each page one clear H1 and descriptive calls to action. Stack sections and buttons cleanly on mobile; keep catalogue scrolling inside its own region. Use native headings, buttons, FAQ and form components wherever possible, with readable contrast, visible keyboard focus and meaningful image descriptions. Avoid unnecessary animation and auto-advancing carousels.

**English throughout:** navigation, body copy, cookie banner, form fields, confirmations, metadata and footer labels. The existing logo includes Persian lettering; use an English-only brand treatment in the draft while retaining the original asset as a source, and include that choice in the review.

## Proposed navigation — no pages deleted

**Home · Products · Services · Company · Insights · Contact**

| Group | Pages and retained addresses |
|---|---|
| Home | `/home`; retain current root-domain homepage behavior |
| Products | Finished Dosage Forms `/fdf`; APIs `/api`; Excipients `/excipient`; Nutrition `/nutrition` |
| Services | Regulatory Affairs `/regulatory-affairs`; FDF CDMO `/fdf-cdmo` |
| Company | About Hanpars `/about-us`; How We Work `/culture`; Markets & Sourcing `/markets` |
| Insights | `/blog-1` |
| Contact | `/contact-us-1` |

This replaces the current **Our Footprint navigation folder** with the clearer Company/Services grouping. Culture and Blog receive clearer navigation labels, but their URLs and useful content remain. No deletion, merge, redirect, domain or DNS change is included.

Unless the owner chooses a different priority, provide two enquiry paths: **Request a sourcing quote** and **Discuss regulatory / CDMO support**. Prefer one compact global contact action, with the two choices explained in page heroes and on Contact. Builder-supported section anchors may be used after confirming that they work; do not present unimplemented anchors or conditional forms as functional.

## Homepage structure

1. **Hero:** a concise pharmaceutical sourcing and service proposition, with the two enquiry choices.
2. **Product pathways:** APIs, finished dosage forms, excipients and nutrition, linked to existing catalogues.
3. **Services:** Regulatory Affairs and manufacturing/development partnerships, with Hanpars' coordination role described accurately rather than implying ownership of factories.
4. **How a project begins:** share the requirement, review the brief, agree the scope and next steps. No invented response-time, supply or approval guarantees.
5. **Financial obligations and commitments:** a prominent, readable section explaining principal costs for goods, shipping, and project/profit-sharing responsibilities, including the reasons. **Exact owner input is required before this copy can be written or published.** Distinguish general commercial terms from actual outstanding balances. Do not invent amounts, percentages, liabilities, promises, timing or reasons; do not publish “TBC” placeholders or omit this requirement from the final rebuild.
6. **Insights:** one controlled editorial area rather than overlapping Weekly Blog, GLOBAL NEWS and duplicate market widgets. Keep dated articles as an archive; do not present old posts as current weekly news.
7. **Final enquiry and newsletter:** clear contact action and the existing subscription functionality.

## Page-by-page work

| Page | Rebuild outcome |
|---|---|
| Finished Dosage Forms | Clear product hero, searchable reference catalogue, useful enquiry instructions and quote CTA. Preserve all **433 source rows**, including original names, codes, strengths and pack sizes. |
| APIs | Clear API sourcing page and searchable catalogue. Preserve all **1,503 source entries**; do not silently correct suspected typos or imply universal availability. Retain the existing full database destination. |
| Excipients | Explain the sourcing/enquiry purpose, contextualize the existing database link and provide a clear documentation/quote enquiry path. Do not invent grades or product ranges. |
| Nutrition | Improve the sparse landing page, retain its database destination and vitamins context, and provide a direct enquiry path without inventing a broader portfolio. |
| Regulatory Affairs | Preserve the approved six services, four-stage process, markets, audiences and FAQs. Align with shared styling and use native page content where practical instead of a solely embedded body. |
| FDF CDMO | Replace long repetitive prose with dosage-form, development, partner-responsibility and project-enquiry sections. Do not add or imply direct facility ownership, GMP certification or approval guarantees. |
| About Hanpars | Concise company story, existing market/product focus, accurate responsibilities and clear service/product links. Remove unsupported superlatives rather than strengthening them. |
| How We Work | Turn the existing culture narrative into concise working principles and project steps. Preserve useful meaning; do not invent employee programs or sustainability evidence. |
| Markets & Sourcing | Explain existing market focus and sourcing context. Remove or clearly date/source unsupported numeric market claims; do not add new countries or supplier relationships. |
| Insights | Consolidate the duplicate article widgets into one editable archive using native GoDaddy blog functionality where available. Preserve the original article source; no automatic live deletion of the archive. Review time-sensitive claims before presenting them as current. |
| Contact | A clear enquiry-type choice and native GoDaddy form(s), verified English labels and retained routing/reCAPTCHA. Keep the currently published address and phone in the draft; flag legal-name and address inconsistencies for review rather than inventing replacements. |

The existing Hanpars-hosted logo/assets and database links may be retained as owner-provided site material. Do not automatically reuse hotlinked third-party facility/editorial images as evidence of Hanpars operations. Use existing appropriate imagery sparingly; source or generate any genuinely needed new assets separately.

## GoDaddy implementation boundaries

Use native GoDaddy sections for visible page copy, calls to action, forms, FAQs and shared styling so the site is easier to edit and its substantive text is not hidden entirely inside iframes. Searchable catalogues may remain **focused custom HTML widgets**, surrounded by native headings, explanatory content and enquiry buttons.

GoDaddy controls global layout, navigation, font choices and available form/blog functionality; implementation must adapt to the actual controls, not promise arbitrary custom-app features. HTML sections are isolated iframes, and text inside them may not be exposed by parent-page extractors/search crawlers. Do not solve the entire redesign with one embedded replacement page per route without accounting for that limitation.

Keep existing form and newsletter destinations. Use supported native fields, or two labelled forms if dependable conditional branching is unavailable. Never replace a working form with a decorative mock form. Do not send test enquiries externally without deciding how to distinguish/handle them.

Set available English page titles, descriptions, image descriptions and social/favicons, and preserve current routes. Do not promise rankings, indexing or traffic outcomes. Keep existing tracking and consent configuration unless a specific change is approved; English translation must preserve the meaning of the consent notice.

## Build order and review

After approval of this direction, establish the shared design and build the **homepage draft first**. Then rebuild product pages, services, company pages, Contact and Insights using the same system. Preserve original source files and the pre-rebuild backup. Accurate financial obligations remain a required input for the final homepage, not a blocker for drafting the rest of the layout.

Review the complete saved draft with the owner, including catalogue preservation, form routing, mobile behavior, English system text and financial disclosures. Do not publish until the owner approves the final redesign.

## Inputs still needed

**Required:** the actual publishable financial commitments: who pays goods principal and shipping, what project funding/profit-sharing applies, when and why, and whether the disclosure concerns general terms or outstanding balances. No sensitive financial figures need to be made public unless that is the owner's explicit intent.

**Design choice:** prioritize sourcing quotes, regulatory/CDMO enquiries, or both equally. Until answered, use a dual-path draft.

**Review flags, not prerequisites to start a draft:** consistent legal/company naming; spelling of the existing Tehran address; working hours/timezone; catalogue currentness and code meaning; ownership/currentness of external databases; outdated editorial figures; and any new claims or replacement imagery proposed during the rebuild. Preserve owner-approved existing content where appropriate and do not ask for another approval of the exact Regulatory Affairs publication already authorized.

## Local project structure and evidence

```text
/home/ubuntu/hanpars-rebuild/
├── plan.md                 # redesign direction and implementation decisions
├── platform-notes.md       # confirmed GoDaddy backup and platform observations
├── audit/                  # 12 page audits and original public HTML/embed sources
└── content/                # revised copy and catalogue transformations, after plan approval
```

The original GoDaddy site remains unchanged. Following the user's “Create a website” action and explicit direction approval on 21 October 2026, a separate Manus-managed review website has been initialized at `/home/ubuntu/hanpars`. This is not an automatic GoDaddy installation or domain migration. Final publication or domain changes require separate approval.

## Approved review-build implementation

Implement an Astro static website: meaningful page bodies and metadata are generated as HTML for all retained routes; small TypeScript interactions handle menus, catalogue search, guided enquiry briefs and copy/download actions. No customer-data backend or replacement inbox is introduced. Clearly labelled contact and subscription handoffs use the existing live GoDaddy channels; no fake submission-success state or decorative form.

Reuse the approved navy/sky-blue direction with an asymmetric split hero, oversized left-aligned headings, conceptual molecular glass artwork, outlined cards, a compact English wordmark, Plus Jakarta Sans headings and Source Sans 3 body. Images do not depict Hanpars-owned facilities or literal scientific data. Use subtle hover/focus motion and reduced-motion support.

Project structure: `src/layouts` shared document/metadata; `src/components` header/footer/CTA/icons/catalogue; `src/pages` retained routes and dated article details; `src/data` preserved catalogues/articles; `src/scripts` browser interaction; `src/styles` responsive system; `public` favicon/route manifest; `scripts` deterministic source extraction/checks; `dist` static build output. Audit source is nonpublic. Missing financial commitments remain an explicit final-release blocker, not fabricated website copy.

Sources: the current public pages at [Home](https://hanpars.com/home), [FDF](https://hanpars.com/fdf), [API](https://hanpars.com/api), [Excipients](https://hanpars.com/excipient), [Nutrition](https://hanpars.com/nutrition), [Insights](https://hanpars.com/blog-1), [About](https://hanpars.com/about-us), [Culture](https://hanpars.com/culture), [FDF CDMO](https://hanpars.com/fdf-cdmo), [Markets](https://hanpars.com/markets), [Contact](https://hanpars.com/contact-us-1), and [Regulatory Affairs](https://hanpars.com/regulatory-affairs). Findings and preserved sources are in the audit folder.

## User branding override — 21 October 2026

The user explicitly requires the original logo unchanged and supplied white_nobacklogo.png. This supersedes the suggested English-only wordmark treatment. No redraw, recolouring, artwork cropping, replacement typography or AI logo generation. The supplied logo is an exception to any English-only rebranding suggestion.

The later request “use the logo without back and larger” removes the separate background plaque and increases the visible mark size. Preserve the original upload byte-for-byte. For the displayed derivative, trim only alpha-zero canvas margins; retain all visible pixels, transparency and proportions. Show the white artwork at 190px wide on desktop and 156px on mobile, directly against the continuous navy header, and at 190px wide in the footer. No external publication or GoDaddy modification is included.

## FDF portfolio addition — 21 October 2026

Insert a native Product Portfolio component after the FDF introduction and above the existing 433-row reference catalogue. Extract the supplied HTML as data; never execute its embedded script or import its document-wide styles, gold/serif typography, extra H1 or footer. Use the existing navy/sky-blue colours and font pairing for a portfolio introduction and 46/30/16/9 summary, four source capability statements, therapeutic-area buttons, search, scoped card/table views, all original product fields, dated status note and manufacturer-services CTA. Registration, supply-chain and status content is supplied by the owner for this draft, not independently certified by this redesign. Show the October 2026 status context instead of implying live stock updates. Keep the current shared contact details; the attachment’s different footer phone is not a request to replace them. Its supplied contact@hanpars.com mailto may remain a portfolio enquiry option without replacing the existing contact form. All source content is preserved locally. No new page routes, live publishing, DNS, GoDaddy or financial-term changes.

The revised attachment hanpars-product-portfolio_1.html keeps all 46 product field sets and ATC table rows unchanged, but replaces the card-header ATC badges with six dosage-form icon types (tablet, capsule, injection, powder for injection, gel, inhaler). Update the existing component in place rather than adding a duplicate portfolio. Reuse the supplied line-icon shapes in the current pale-blue/navy badge styling. Retain ATC codes in Table view and searchable data. Preserve both attachment versions locally; leave the logo, original 433-row catalogue, English site copy, article detail-page behavior and unprovided homepage financial terms unchanged.
