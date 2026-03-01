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
//  File:         components/ui/RockerSwitch.jsx
//  Description:  Rocker switch UI component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-01
//  Updated:      2026-03-02
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useEffect } from 'react';
import { useState, useImperativeHandle, forwardRef } from 'react';

import './RockerSwitch.scss';

const RockerSwitch = forwardRef(function RockerSwitch({ onSwitchToggle, initialToggled = false }, ref) {
	const [isToggled, setIsToggled] = useState(initialToggled);

	/*
	useImperativeHandle(ref, () => ({
		manualSwitch: () => {
			setIsToggled(true);
		},
	}));
	*/
	useEffect(() => {
		setIsToggled(initialToggled);
	}, [initialToggled]);

	const handleClick = () => {
		const next = !isToggled;
		setIsToggled(next);
		onSwitchToggle?.(next);
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
