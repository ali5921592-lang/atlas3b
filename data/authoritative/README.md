# Authoritative anatomy sources

- `uberon-human-view-v2026-10-01.obo`: official UBERON human-view release downloaded from the `v2026-10-01` release of `obophenotype/uberon`.
- `UBERON-LICENSE.txt`: license notice from the official UBERON repository (CC BY 3.0).

`npm run content:build` parses the ontology locally, matches it to the 3,370 source-model records and writes `dist/data/anatomy-cards-tr.json`. The generated card keeps the ontology identifier, match score, parent/part-of relations, terminology source and an A/B/C evidence grade. A missing or ambiguous match is not silently promoted to a verified structure-specific claim.

Latin terminology is read from the project's IFAA / Terminologia Anatomica 2.07 crosswalk. The generated Turkish educational prose is original to this project and does not contain OpenStax text.
