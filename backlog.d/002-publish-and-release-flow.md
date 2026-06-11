# Publish to npm and script the release flow

Priority: P1 · Status: blocked · Estimate: S

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
