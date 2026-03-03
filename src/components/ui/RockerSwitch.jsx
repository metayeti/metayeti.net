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
//  File:         src/components/ui/RockerSwitch.jsx
//  Description:  Rocker switch UI component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-01
//  Updated:      2026-03-03
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useEffect } from 'react';
import { useState, forwardRef } from 'react';
import { isMobile } from 'react-device-detect';

import switch1_sfx from '@/assets/sfx/switch1.mp3';
import switch2_sfx from '@/assets/sfx/switch2.mp3';

import './RockerSwitch.scss';

const sfx = {
	on: new Audio(switch1_sfx),
	// tweak sfx for mobile because switch2.mp3 is very high pitched, making it
	// sound MUCH louder on mobile than on desktop - so just use the same sfx
	// for both sounds on mobile (also avoids loading about 8kb on mobile)
	off: new Audio(isMobile ? switch1_sfx : switch2_sfx),
};

const RockerSwitch = forwardRef(function RockerSwitch({ onSwitchToggle, initialToggled = false }, ref) {
	const [isToggled, setIsToggled] = useState(initialToggled);

	useEffect(() => {
		setIsToggled(initialToggled);
	}, [initialToggled]);

	const handleClick = () => {
		const next = !isToggled;
		setIsToggled(next);
		onSwitchToggle?.(next);
		sfx[next ? 'on' : 'off'].play();
	};

	return (
		<button onClick={handleClick} className={`rocker-switch${isToggled ? ' rocker-switch--toggled' : ''}`}>
			<div className="rocker-switch__inner">
				<div className="rocker-switch__container">
					<div className="rocker-switch__side rocker-switch__side--left">
						<div className="rocker-switch__depth rocker-switch__depth--left"></div>
						<div className="rocker-switch__face rocker-switch__face--left">
							<div className="rocker-switch__icon rocker-switch__icon--o"></div>
						</div>
					</div>
					<div className="rocker-switch__side rocker-switch__side--right">
						<div className="rocker-switch__face rocker-switch__face--right">
							<div className="rocker-switch__icon rocker-switch__icon--i"></div>
						</div>
						<div className="rocker-switch__depth rocker-switch__depth--right"></div>
					</div>
				</div>
			</div>
		</button>
	);
});

export default RockerSwitch;
