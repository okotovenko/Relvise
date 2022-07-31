//Функція запускає лічильник збільшення чисел від 0 до 'html'в елементі з "data-digits-counter"

window.addEventListener("load", windowLoad);

export function windowLoad() {
	// Функція ініціалізації
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
		if (digitsCounters) {
			digitsCounters.forEach(digitsCounter => {
				digitsCountersAnimate(digitsCounter);
			});
		}
	}
	// Функція анімації
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 3000;
		const startValue = parseInt(digitsCounter.innerHTML);
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}
	// Пуск анімації відразу при завантаженні сторінки
	//digitsCountersInit();

	// Пуск анімації при скролі (при появі блока з лічильниками)
	let options = {

		threshold: 1 // При якій висоті об'єкту буде починатися анімація (0,3 - це 30%)
	}
	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
				if (digitsCountersItems.length) {
					digitsCountersInit(digitsCountersItems);
				}
				// Вимкнення відслідковування і анімації після спрацювання
				// observer.unobserve(targetElement);
			}
		});
	}, options);

	let sections = document.querySelectorAll('.designing__items');
	if (sections.length) {
		sections.forEach(section => {
			observer.observe(section);
		});
	}
}
