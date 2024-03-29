const form = document.getElementById('contactForm');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	console.log('Submit');

	// Данные из формы
	const formData = new FormData(form);

	async function fetchData() {
		const url = document.location.href;
		console.log('url', url);

		const response = await fetch(url + '/mail.php', {
			method: 'POST',
			body: formData,
		});

		const result = await response.text();
		console.log(result);

		// На основе ответа от сервера показываем сообщения об Успехе или Ошибке
		if (result === 'SUCCESS') {
			document.getElementById('success').hidden = false;
		} else {
			document.getElementById('error').hidden = false;
		}

		// Очищаем поля формы
		form.reset();
	}

	fetchData();
});
