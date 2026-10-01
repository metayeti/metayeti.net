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
//  File:         src/components/ImageGallery/ImageGallery.jsx
//  Description:  Image gallery component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-09-30
//  Updated:      2026-10-01
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useEffect, useRef, useState } from 'react';
import IconChevronLeft from '@/components/icons/IconChevronLeft';
import IconChevronRight from '@/components/icons/IconChevronRight';

import './ImageGallery.scss';

export default function ImageGallery({
	images,
	title,
	label = `${title} screenshots`,
	itemLabel = 'screenshot',
	stageMode = 'fixed',
	thumbnailFit = 'cover',
}) {
	const [activeIndex, setActiveIndex] = useState(0);
	const thumbnailsRef = useRef(null);
	const activeThumbnailRef = useRef(null);
	const touchStartRef = useRef(null);

	useEffect(() => {
		const container = thumbnailsRef.current;
		const thumbnail = activeThumbnailRef.current;
		if (!container || !thumbnail) return;

		const containerRect = container.getBoundingClientRect();
		const thumbnailRect = thumbnail.getBoundingClientRect();
		const visibleLeft = containerRect.left + container.clientLeft;
		const visibleRight = visibleLeft + container.clientWidth;

		if (thumbnailRect.left < visibleLeft) {
			container.scrollBy({ left: thumbnailRect.left - visibleLeft, behavior: 'smooth' });
		} else if (thumbnailRect.right > visibleRight) {
			container.scrollBy({ left: thumbnailRect.right - visibleRight, behavior: 'smooth' });
		}
	}, [activeIndex]);

	if (!images?.length) return null;

	const activeImage = images[activeIndex];
	const selectImage = (index) => setActiveIndex(index);
	const handleTouchStart = (event) => {
		if (
			!window.matchMedia('(width < 640px) and (pointer: coarse)').matches ||
			event.target.closest('button') ||
			event.touches.length !== 1
		) {
			touchStartRef.current = null;
			return;
		}

		const touch = event.touches[0];
		touchStartRef.current = { x: touch.clientX, y: touch.clientY };
	};
	const handleTouchEnd = (event) => {
		const start = touchStartRef.current;
		touchStartRef.current = null;
		if (!start || event.changedTouches.length !== 1) return;

		const touch = event.changedTouches[0];
		const deltaX = touch.clientX - start.x;
		const deltaY = touch.clientY - start.y;
		if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

		selectImage(Math.max(0, Math.min(images.length - 1, activeIndex + (deltaX < 0 ? 1 : -1))));
	};

	return (
		<section
			className={`image-gallery${stageMode !== 'fixed' ? ` image-gallery--${stageMode}` : ''}`}
			aria-label={label}
		>
			<div className="image-gallery__stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
				<img src={activeImage.src} alt={activeImage.alt || `${title} ${itemLabel} ${activeIndex + 1}`} />
				{images.length > 1 && (
					<>
						<button
							className="image-gallery__arrow image-gallery__arrow--previous"
							type="button"
							aria-label={`Previous ${itemLabel}`}
							disabled={activeIndex === 0}
							onClick={() => selectImage(activeIndex - 1)}
						>
							<IconChevronLeft />
						</button>
						<button
							className="image-gallery__arrow image-gallery__arrow--next"
							type="button"
							aria-label={`Next ${itemLabel}`}
							disabled={activeIndex === images.length - 1}
							onClick={() => selectImage(activeIndex + 1)}
						>
							<IconChevronRight />
						</button>
						<span className="image-gallery__count" aria-live="polite">
							{activeIndex + 1} / {images.length}
						</span>
					</>
				)}
			</div>
			{images.length > 1 && (
				<div
					ref={thumbnailsRef}
					className={`image-gallery__thumbnails${thumbnailFit === 'contain' ? ' image-gallery__thumbnails--contain' : ''}`}
					aria-label={`Choose ${itemLabel}`}
				>
					{images.map((image, index) => (
						<button
							key={image.filename || image.src}
							ref={index === activeIndex ? activeThumbnailRef : null}
							className={`image-gallery__thumbnail${index === activeIndex ? ' image-gallery__thumbnail--active' : ''}`}
							type="button"
							aria-label={`Show ${itemLabel} ${index + 1}`}
							aria-pressed={index === activeIndex}
							onClick={() => selectImage(index)}
						>
							<img src={image.src} alt="" loading="lazy" />
						</button>
					))}
				</div>
			)}
		</section>
	);
}
