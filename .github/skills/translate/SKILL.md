---
name: translate
description: Add or improve translations for different languages.
---

# Translate

## Languages

- `config/i18n.ts`: configure supported languages used by backend.
- `resources/lang/{lang}/*.json`: backend translation files for each supported language.
- `resources/js/i18n.ts`: configure supported languages used by frontend.
- `public/static/lang/{lang}/*.json`: frontend translation files for each supported language.
- When adding a new language, ensure it is added consistently across all the above files.

## Messages

- Translation files should be in JSON format.
- Validate JSON syntax to avoid errors.
- Maintain consistent keys across different languages.
- Keep translations up-to-date with the source language (usually English).
- Sort keys alphabetically for easier maintenance.

## Usage

- Frontend use `t('key.path')` to retrieve translations.
