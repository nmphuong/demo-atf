import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ trans?: boolean }>`
	width: 100%;
	height: 100%;

	.fade-in-section {
		transform: translateX(${({ trans }) => (trans ? '-40vw' : '40vw')});
		opacity: 0;
		visibility: hidden;
		transition: opacity 1200ms ease-out, transform 1200ms ease-out, visibility 1200ms ease-out;
		transition-delay: 0.4s;
		will-change: opacity, transform, visibility;
	}
	.fade-in-section.is-visible {
		opacity: 1;
		transform: none;
		visibility: visible;
	}
`;

interface ContainerProps {
	children?: React.ReactNode;
	isTrans?: boolean;
}

const FadeScroll: React.FC<ContainerProps> = ({ children, isTrans }) => {
	const [isVisible, setVisible] = useState(false);
	const domRef: any = React.useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => setVisible(entry.isIntersecting));
		});
		observer.observe(domRef.current);
	}, []);

	return (
		<Wrapper trans={isTrans ? true : false}>
			<div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
				{children}
			</div>
		</Wrapper>
	);
};

FadeScroll.defaultProps = {
	isTrans: true
};

const Wrapperz = styled.div<{ trans?: boolean }>`
	width: 100%;
	height: 100%;

	.fade-in-section {
		transform: translateX(${({ trans }) => (trans ? '17vw' : '-20vw')});
		opacity: 0;
		visibility: hidden;
		transition: opacity 1200ms ease-out, transform 1200ms ease-out, visibility 1200ms ease-out;
		transition-delay: 0.4s;
		will-change: opacity, transform, visibility;
		width: 100%;
		height: 100%;
	}
	.fade-in-section.is-visible {
		opacity: 1;
		transform: none;
		visibility: visible;
	}
`;

export const FadeScrollV2: React.FC<ContainerProps> = ({ children, isTrans }) => {
	const [isVisible, setVisible] = useState(false);
	const domRef: any = React.useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => setVisible(entry.isIntersecting));
		});
		observer.observe(domRef.current);
	}, []);

	return (
		<Wrapperz trans={isTrans ? true : false}>
			<div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
				{children}
			</div>
		</Wrapperz>
	);
};

FadeScrollV2.defaultProps = {
	isTrans: true
};

export default FadeScroll;
