# Publish to npm and script the release flow

Priority: P3 · Status: blocked · Estimate: S

**Deletion candidate (2026-06-11, awaiting ratification):** the
operator asked for an install path that avoids npm credentials, and
the registry research (007 child 8) confirms one: a shadcn-compatible
registry is static JSON served from aesthetic.mistystep.io — no npm
account anywhere — and git-tag + jsDelivr already cover the pin and
CDN paths. npm publish adds a third channel only if a consumer
specifically demands `npm install` resolution. The release-scripting
oracle (one command bumps every consumer) migrates to 007 child 8.

## Goal

Make consuming and upgrading the system one boring command: a real npm
package plus a scripted release that bumps every consumer.

## Oracle

- [ ] `npm view @misty-step/aesthetic version` returns the latest tag
      (requires operator `npm login`; this is the blocker).
- [ ] One command cuts a release: bumps version, tags, pushes, publishes.
- [ ] One command (or CI job) bumps the pin in both consumers (vanity
      jsdelivr URL + SRI hash, misty-step dependency ref) and opens PRs
      or commits.

## Notes

**Why (consumer lens):** today an upgrade is three manual edits across
two repos; the third consumer makes it four. Blocked only on npm
credentials, which the operator must enter personally. Until then the
git-tag + jsdelivr path keeps working.
