---
name: i18n
description: Add or improve translations for different languages.
---

# I18n (Internationalization) Skill Guide

## Languages

- Backend:
  - `config/i18n.ts`: configure supported languages used by backend.
  - `resources/lang/{lang}/*.json`: backend translation files for each supported language.
  - Read https://docs.adonisjs.com/guides/digging-deeper/i18n for backend i18n details.
- Frontend:
  - `resources/js/i18n.ts`: configure supported languages used by frontend.
  - `public/static/lang/{lang}/*.json`: frontend translation files for each supported language.
  - Read https://react.i18next.com/ for frontend i18n details.
- When adding a new language, ensure it is added consistently across all the above files.

## Messages

- Translation files should be in JSON format.
- Validate JSON syntax to avoid errors.
- Maintain consistent keys across different languages.
- Keep translations up-to-date with the source language (usually English).
- Sort keys alphabetically for easier maintenance.

## How to translate

- Frontend messages:
  - find `t()` function and `<Trans>` component in `resources/js/` for frontend messages.
  - check each language if the message is missing or needs improvement.
- Backend messages:
  - find `i18n.t()` or `messages.get()` in `app/` for backend messages.
  - check each language if the message is missing or needs improvement.
