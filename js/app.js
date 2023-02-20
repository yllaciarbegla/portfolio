window.addEventListener('load', windowLoad);

function windowLoad() {

	let page = document.querySelector('.page');

	setTimeout(function () {
		page.classList.add("loaded");
	}, 500);

	// Theme switch
	const html = document.documentElement;
	const saveUserTheme = localStorage.getItem('user-theme');
	const themeButton = document.querySelector('.theme-switch__button');

	let userTheme;
	if (window.matchMedia) {
		userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => !saveUserTheme ? changeTheme() : null);

	if (themeButton) {
		themeButton.addEventListener('click', function () {
			changeTheme(true);
		});
	}

	function setThemeClass() {
		if (saveUserTheme) {
			html.classList.add(saveUserTheme);
		} else {
			html.classList.add(userTheme);
		}
	}

	setThemeClass();

	function changeTheme(saveTheme = false) {
		let currentTheme = html.classList.contains('light') ? 'light' : 'dark';
		let newTheme;

		if (currentTheme === 'light') {
			newTheme = 'dark';
		} else if (currentTheme === 'dark') {
			newTheme = 'light';
		}
		html.classList.remove(currentTheme);
		html.classList.add(newTheme);

		saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
	}

	// Cursor
	let aura = document.querySelector('.aura');
	let cursor = document.querySelector('.cursor');
	let activeButtons = document.querySelectorAll('.active-button');

	document.addEventListener('mousemove', function (e) {
		let x = e.clientX;
		let y = e.clientY;

		cursor.style.left = x + 'px';
		cursor.style.top = y + 'px';

		aura.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
	});

	document.addEventListener('mousedown', function () {
		cursor.classList.add('cursorinnerhover');
	});

	document.addEventListener('mouseup', function () {
		cursor.classList.remove('cursorinnerhover');
	});

	document.addEventListener('mouseover', function () {
		cursor.classList.remove('hidden');
		aura.classList.remove('hidden');
	});

	document.addEventListener('mouseout', function () {
		cursor.classList.add('hidden');
		aura.classList.add('hidden');
	});

	activeButtons.forEach(item => {
		item.addEventListener('mouseover', function () {
			cursor.classList.add('active');
			aura.classList.add('active');
		});

		item.addEventListener('mouseout', function () {
			cursor.classList.remove('active');
			aura.classList.remove('active');
		});
	})

	// Slider

	new Swiper('.swiper', {
		speed: 700,
		keyboard: true,
		simulateTouch: false,
		mousewheel: true,
		navigation: {
			nextEl: '.swiper-button-next',
		},
		direction: 'horizontal',
		effect: 'coverflow',
		coverflowEffect: {
			slideShadows: false,
			rotate: 100,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'progressbar',
		},
		breakpoints: {
			768: {
				direction: 'vertical',
			}
		}
	});

	// Animations

	function onEntry(entry) {
		entry.forEach(change => {
			if (change.isIntersecting) {
				change.target.classList.add('_element-show');
			}
		});
	}

	let options = {
		threshold: [0.5]
	};
	let observer = new IntersectionObserver(onEntry, options);
	let elements = document.querySelectorAll('.element-animation');

	for (let elm of elements) {
		observer.observe(elm);
	}

	// Projects

	let workTarget = document.querySelector('.work__bottom');

	workTarget.addEventListener('mouseover', (e) => {
		switch (e.target) {
			case firstLink:
				showeItem(firstItem);
				break;
			case secondLink:
				showeItem(secondItem);
				break;
			case thirdLink:
				showeItem(thirdItem);
				break;
			case fourthLink:
				showeItem(fourthItem);
				break;
			case fifthLink:
				showeItem(fifthItem);
				break;
		}
	});

	workTarget.addEventListener('mouseout', (e) => {
		switch (e.target) {
			case firstLink:
				hideItem(firstItem);
				break;
			case secondLink:
				hideItem(secondItem);
				break;
			case thirdLink:
				hideItem(thirdItem);
				break;
			case fourthLink:
				hideItem(fourthItem);
				break;
			case fifthLink:
				hideItem(fifthItem);
				break;
		}
	});

	function showeItem(item) {
		if (!item.classList.contains('hello')) {
			item.classList.add('hello');
		}
	}

	function hideItem(item) {
		item.classList.remove('hello');
	}
}