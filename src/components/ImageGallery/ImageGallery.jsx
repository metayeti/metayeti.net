import { useState } from 'react';
import IconChevronLeft from '@/components/icons/IconChevronLeft';
import IconChevronRight from '@/components/icons/IconChevronRight';

import './ImageGallery.scss';

export default function ImageGallery({ images, title }) {
	const [activeIndex, setActiveIndex] = useState(0);

	if (!images?.length) return null;

	const activeImage = images[activeIndex];
	const selectImage = (index) => setActiveIndex(index);

	return (
		<section className="image-gallery" aria-label={`${title} screenshots`}>
			<div className="image-gallery__stage">
				<img src={activeImage.src} alt={`${title} screenshot ${activeIndex + 1}`} />
				{images.length > 1 && (
					<>
						<button
							className="image-gallery__arrow image-gallery__arrow--previous"
							type="button"
							aria-label="Previous screenshot"
							disabled={activeIndex === 0}
							onClick={() => selectImage(activeIndex - 1)}
						>
							<IconChevronLeft />
						</button>
						<button
							className="image-gallery__arrow image-gallery__arrow--next"
							type="button"
							aria-label="Next screenshot"
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
				<div className="image-gallery__thumbnails" aria-label="Choose screenshot">
					{images.map((image, index) => (
						<button
							key={image.filename}
							className={`image-gallery__thumbnail${index === activeIndex ? ' image-gallery__thumbnail--active' : ''}`}
							type="button"
							aria-label={`Show screenshot ${index + 1}`}
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
