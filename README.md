# Anatomi Atlas

Mobile-responsive Turkish anatomy education prototype with 2,338 selectable Z-Anatomy meshes. Static ES modules and locally bundled Three.js 0.180.0. No API keys, backend, analytics or remote model dependencies.

## Run

Serve `dist/` with a static HTTP server; ES modules cannot be opened using file URLs. `dist/index.html` is the entry point. Hosting metadata lives in `.openai/hosting.json`.

## Features

Real Draco-compressed anatomical geometry, six visibility categories, Turkish/English search, touch orbit/pan/zoom, selection, focus, isolate, hide, transparency, separation slider, front/back/reset, and responsive educational notes.

Models load on demand. Initial view loads skeleton and muscle; other files are loaded when requested. All assets except optional Google Fonts are local. The manifest supports standalone display; this is not a native iOS/Android package and does not provide offline guarantees.

## Content and limitations

`catalog.json` maps original GLTF node indices to stable IDs. Four non-anatomical source title meshes are excluded. Counts refer to distinct model pieces, not unique organs or the totality of human anatomy. Tendons come from tendon-related structures within the muscle file. The model represents an adult male and is not a clinical gold standard.

`content.js` has 28 introductory topic records; other structures explicitly show missing content. Related substructures are marked as receiving general notes about the parent structure. Disease causation and comprehensive clinical explanations are not complete. No AI-generated diagnosis endpoint exists. Turkish content requires expert editorial review before clinical use.

## Attribution and reuse

Models: Z-Anatomy contributors / Gauthier Kervyn; BodyParts3D / DBCLS / Kousaku Okubo. GLB conversions retrieved from https://github.com/Liyucheng1997/242_lab-human-anatomy. Preserve the full `dist/models/SOURCE-LICENSE.txt`. Model files are unchanged. Z-Anatomy is CC BY-SA 4.0; BodyParts3D is CC BY-SA 2.1 Japan. Source includes separately credited noncommercial kidney and inner-ear assets; this prototype is for noncommercial education. Commercial distribution requires an asset-level license audit or replacement of restricted assets.

Short educational notes cite OpenStax Anatomy and Physiology 2e, J. Gordon Betts et al., Rice University, and are shared under CC BY-NC-SA 4.0. Each applicable card links to the supporting section. Original models remain downloadable under their source licenses. Three.js license is included at `dist/vendor/LICENSE`.

## Validation

All five model files were decoded with the Draco decoder and parsed using Three.js GLTFLoader. All 2,338 entries map to real nonempty geometries and have valid material and world bounds. JavaScript syntax and static resources checked. Browser visual/interaction testing and physical iOS/Android device testing have not been performed. Optional WebMCP search/selection APIs are feature-detected; a supported live WebMCP context was not available for contract validation.

## Next delivery milestones

1. Expert-reviewed Turkish name, function and clinical notes for each structure, with source tracking.
2. Model-by-model commercial license clearance and anatomical fidelity review.
3. Native mobile packaging, device performance profiling, LOD assets and offline downloads.
4. Automated interaction coverage and accessibility testing on real devices.

## Rendering update
Tissue-specific physical materials, natural/atlas palettes, representative procedural surface detail, softer lighting and reduced selection tint. 27 topic cards now include Latin labels, anatomical relations, clinical context and study notes. Geometry is unchanged. Node checks cover material mapping, shader hooks, palette restoration, content matching and static resources; GPU shader compilation and browser interaction were not tested.

