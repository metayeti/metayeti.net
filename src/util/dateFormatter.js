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
//  File:         src/util/dateFormatter.js
//  Description:  Utility functions for date formatting.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-13
//  Updated:      2026-03-13
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

/**
 * Converts a date string to a human-readable format.
 *
 * @param {string} dateString The date string to format (e.g., "2025-06-19").
 * @returns {string} The formatted date string (e.g., "June 19, 2025").
 */
export function getHumanReadableDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
