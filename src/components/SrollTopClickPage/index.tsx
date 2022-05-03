import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		const timer = setTimeout(() => {
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}, 50);

		return () => clearTimeout(timer);
	}, [pathname]);

	return null;
}
