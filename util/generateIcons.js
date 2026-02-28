//
//  metayeti.net
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  Copyright (c) 2026-present metayeti.net
//  All rights reserved.
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  File:         util/generateIcons.js
//  Description:  Utility that turns development versions of SVG icons into
//                production-ready React components.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-28
//  Updated:      2026-02-28
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         All icons in /dev/icons/ are processed by this utility at
//                once. Components are placed in /src/components/icons/. If
//                there is a comment in the SVG file, it will be extracted and
//                placed as a comment at the top of the generated component.
//                Existing components will only be overwritten if the SVG file
//                is newer than the component file (based on time modified).
//  TODO:         -
//

import fs from 'fs';
import path from 'path';
import { transform } from '@svgr/core';

const INPUT_DIR = path.resolve('dev/icons');
const OUTPUT_DIR = path.resolve('src/components/icons');

// ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const svgFiles = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith('.svg'));

let created = 0;
let skipped = 0;

for (const file of svgFiles) {
	const componentName = path.basename(file, '.svg'); // component name is filename minus extension
	const outputFile = path.join(OUTPUT_DIR, `${componentName}.jsx`);
	const inputFile = path.join(INPUT_DIR, file);

	// only process if SVG is newer than the existing component (or component doesn't exist)
	if (fs.existsSync(outputFile)) {
		const svgMtime = fs.statSync(inputFile).mtimeMs;
		const jsxMtime = fs.statSync(outputFile).mtimeMs;
		if (svgMtime <= jsxMtime) {
			skipped++;
			continue;
		}
	}

	const svgCode = fs.readFileSync(inputFile, 'utf8');

	// extract comment if present
	const commentMatch = svgCode.match(/<!--\s*(.+?)\s*-->/);
	const jsxComment = commentMatch ? `// ${commentMatch[1]}\n\n` : '';

	const jsxCode = await transform(
		svgCode,
		{
			plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
			jsx: { runtime: 'automatic' },
			svgProps: { fill: 'currentColor' },
			svgoConfig: {
				plugins: [
					{
						name: 'removeAttrs',
						params: {
							attrs: ['style', 'class', 'width', 'height'],
						},
					},
				],
			},
		},
		{ componentName },
	);

	fs.writeFileSync(outputFile, jsxComment + jsxCode, 'utf8');
	console.log(`✔  Generated ${componentName}.jsx`);
	created++;
}

console.log(`\nDone. ${created} generated, ${skipped} up to date.`);
