// Відслідковуємо прокрутку документу, додаємо клас "active"
// при прокручуванні на "один екран". Якщо ширина екрану
// менше ніж 769рх - кнопка не додаєьтся

export function trackScroll() {
	var scrolled = window.pageYOffset;
	var coords = document.documentElement.clientHeight;
	const screenWidth = window.screen.width;

	if (screenWidth >= 769) {
		if (scrolled > coords) {
			goTopBtn.classList.add('active');
		}
		if (scrolled < coords) {
			goTopBtn.classList.remove('active');
		}
	}
}

// Відслідковуємо клік по кнопці (посилання з класом '._icon-up')
export function backToTop() {
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -20);
		setTimeout(backToTop, 0);
	}
}

var goTopBtn = document.querySelector('._icon-up');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);
