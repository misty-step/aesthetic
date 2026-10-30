// Landmark's release notes as https://landmark.mistystep.io/changelog.html renders them: the page shell from
// misty-step/landmark site/changelog.html and the releases from CHANGELOG.md, both at 2a39fd1 (read 2026-10-30),
// verbatim. The screen shows 0.28.15 back to 0.28.1; the page continues with the 1.x line. Generated from
// CHANGELOG.md; edit by re-reading it, never by hand.
export const SHA = '2a39fd1112da58d7095f912c42eedf276f604fc6';
export const PAGE_URL = 'https://landmark.mistystep.io/changelog.html';
export const SOURCE = `https://github.com/misty-step/landmark/blob/${SHA}/CHANGELOG.md`;
export const SITE = 'https://landmark.mistystep.io/';
export const NAV: [string, string][] = [['features', 'features.html'], ['get started', 'get-started.html'], ['changelog', 'changelog.html'], ['github', 'https://github.com/misty-step/landmark']];
export const TITLE = 'Release notes';
// The lede, verbatim; its dash is Landmark's.
export const LEDE_HTML = 'Generated from this site\'s deployed revision of <a class="sp-link" href="https://landmark.mistystep.io/CHANGELOG.md">CHANGELOG.md</a> \u2014 the same notes published with Landmark\'s <a class="sp-link" href="https://github.com/misty-step/landmark/releases">GitHub Releases</a>.';
export const CREDIT = { before: 'a', name: 'Misty Step', href: 'https://mistystep.io', after: 'project', github: 'Landmark on GitHub' };

export interface Entry { scope: string | null; text: string; commit: string; href: string }
export interface Release { version: string; href: string; date: string; sections: { title: string; items: Entry[] }[] }
export const RELEASES: Release[] = [
 {
  "version": "0.28.15",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.14...v0.28.15",
  "date": "2026-10-23",
  "sections": [
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "webhook",
      "text": "report rejection and bound notification delivery (#286)",
      "commit": "eb1dcaf",
      "href": "https://github.com/misty-step/landmark/commit/eb1dcaf292ffe0b5357f92808ee8856ab8565593"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.14",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.13...v0.28.14",
  "date": "2026-10-16",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": "site",
      "text": "promote canonical artifacts to the production domain (#278)",
      "commit": "efdd6ba",
      "href": "https://github.com/misty-step/landmark/commit/efdd6ba7fa8a23d13f1c888aec1fd0b3c39f8440"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.13",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.12...v0.28.13",
  "date": "2026-10-15",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": "site",
      "text": "preview canonical artifacts on Cloudflare (#275)",
      "commit": "4bea7cc",
      "href": "https://github.com/misty-step/landmark/commit/4bea7cc43daf8ef7f68cd239a5a800bd3dbc8265"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.12",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.11...v0.28.12",
  "date": "2026-10-15",
  "sections": [
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "site",
      "text": "render canonical release notes at build time (#273)",
      "commit": "907cc73",
      "href": "https://github.com/misty-step/landmark/commit/907cc73f26c4d13273291908ea32f16c888d1379"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.11",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.10...v0.28.11",
  "date": "2026-10-15",
  "sections": [
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "ci",
      "text": "reject skipped checks before merging releases (#270)",
      "commit": "c069a85",
      "href": "https://github.com/misty-step/landmark/commit/c069a85645c4c81ec3ecf7fb8c22f30e3cd89944"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.10",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.9...v0.28.10",
  "date": "2026-10-15",
  "sections": [
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "release",
      "text": "publish Landmark without a paid notes provider (#268)",
      "commit": "2090588",
      "href": "https://github.com/misty-step/landmark/commit/20905881424b1e0c6a0a7195800a5bf59b417e4a"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.9",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.8...v0.28.9",
  "date": "2026-09-23",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": "release",
      "text": "stage protected changelog before publication (#259)",
      "commit": "f4a6e62",
      "href": "https://github.com/misty-step/landmark/commit/f4a6e62cad0bd511a04657e0fa9d3f8abee5b193"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.8",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.7...v0.28.8",
  "date": "2026-09-08",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": "release-transaction",
      "text": "complete ADR-0004 publish-to-receipt (#253)",
      "commit": "a5869d7",
      "href": "https://github.com/misty-step/landmark/commit/a5869d7bc7a89febb47e2f73f49bdd8a75fa9309"
     }
    ]
   },
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "gate",
      "text": "semrel proof requires real origin and an analysis result (#251)",
      "commit": "6eac842",
      "href": "https://github.com/misty-step/landmark/commit/6eac842bfea1a1aa9f84825bc8f37a7fedc3ca6b"
     },
     {
      "scope": "contracts",
      "text": "accept directory links and retire vendored orchestration (MIS-37) (#257)",
      "commit": "01caef6",
      "href": "https://github.com/misty-step/landmark/commit/01caef6f44fd3dc48769b20af78e5c2d111215ed"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.7",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.6...v0.28.7",
  "date": "2026-08-23",
  "sections": [
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "gate",
      "text": "make the semantic-release dry-run proof fail loudly (#249)",
      "commit": "e33c216",
      "href": "https://github.com/misty-step/landmark/commit/e33c21681433da36720a9d3a7eada599239cb386"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.6",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.5...v0.28.6",
  "date": "2026-08-23",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": "self-release",
      "text": "synthesize notes before publication; compose once (#247)",
      "commit": "ebd2619",
      "href": "https://github.com/misty-step/landmark/commit/ebd2619b50455644231f0c8085313d14b955b705"
     }
    ]
   },
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "classification",
      "text": "maintenance scopes are not user-visible; extract H1 changelog sections (#244)",
      "commit": "e129c05",
      "href": "https://github.com/misty-step/landmark/commit/e129c05b763baf91620681951275808a4a9a598d"
     },
     {
      "scope": "classification",
      "text": "classify each conventional entry against its own scope (#246)",
      "commit": "33f2a49",
      "href": "https://github.com/misty-step/landmark/commit/33f2a491e866af92254c57f6da7b389f635f71df"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.5",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.4...v0.28.5",
  "date": "2026-08-22",
  "sections": [
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "deps",
      "text": "restore canonical Hmac::new_from_slice construction (#242)",
      "commit": "410e5a1",
      "href": "https://github.com/misty-step/landmark/commit/410e5a1c34c0944440c96649309cca7a6383925e"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.4",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.3...v0.28.4",
  "date": "2026-08-22",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": "gate",
      "text": "enforce dependency and model-pin freshness",
      "commit": "bfd2fd9",
      "href": "https://github.com/misty-step/landmark/commit/bfd2fd9ba1d1cbaa51248dbbfa9c2b75fd265387"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.3",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.2...v0.28.3",
  "date": "2026-08-21",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": "model-policy",
      "text": "repin all tiers to commodity DeepSeek/Gemini models (#218)",
      "commit": "90dce6f",
      "href": "https://github.com/misty-step/landmark/commit/90dce6fe27624c8a7a10c3aeae85dfac9ab40e69"
     }
    ]
   },
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "manifest",
      "text": "accept any case for model.policy (#220)",
      "commit": "037d2a9",
      "href": "https://github.com/misty-step/landmark/commit/037d2a9b6b642169b8765abf8d5fa55c7d29f4c9"
     },
     {
      "scope": "schema",
      "text": "make manifest model.policy case-insensitive (#221)",
      "commit": "2938de9",
      "href": "https://github.com/misty-step/landmark/commit/2938de96883bab02cdf270a0725f3c00e040eab1"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.2",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.1...v0.28.2",
  "date": "2026-07-14",
  "sections": [
   {
    "title": "Features",
    "items": [
     {
      "scope": null,
      "text": "prepare and bind atomic release transactions (#215)",
      "commit": "a28a590",
      "href": "https://github.com/misty-step/landmark/commit/a28a5900fc7794be3de5d52196562af3990a64cf"
     }
    ]
   }
  ]
 },
 {
  "version": "0.28.1",
  "href": "https://github.com/misty-step/landmark/compare/v0.28.0...v0.28.1",
  "date": "2026-07-09",
  "sections": [
   {
    "title": "Bug Fixes",
    "items": [
     {
      "scope": "fleet",
      "text": "generate and document landmark@v0 + workflow-token releases (#207)",
      "commit": "f5162bb",
      "href": "https://github.com/misty-step/landmark/commit/f5162bb254041b8c32b669aed4eb117f9bdf7fbe"
     }
    ]
   }
  ]
 }
];
