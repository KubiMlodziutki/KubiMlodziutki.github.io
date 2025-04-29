const SITE_KEY = '6LfdqigrAAAAAPE1cer_FcR1p5PJi4ynf3evqENR'

const pageUrls = {
	about   : '?about',
	gallery : '?gallery',
	contact : '?contact'
}

window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.nav-link').forEach(btn =>
		btn.addEventListener('click', () => navigate(btn.dataset.page))
	)

	const root = document.documentElement
	const toggleBtn = document.getElementById('theme-toggle')
	toggleBtn.addEventListener('click', () => {
		const dark = root.classList.toggle('dark-mode')
		toggleBtn.textContent = dark ? '☀️' : '🌙'
	})

	handlePopState()
})

window.onpopstate = handlePopState

function navigate(page) {
	history.pushState({ page }, page, pageUrls[page])
	render(page)
}

function handlePopState() {
	const page = Object.keys(pageUrls).find(k => pageUrls[k] === location.search) || 'about'
	render(page)
}

function activateLink(page) {
	document.querySelectorAll('.nav-link').forEach(btn =>
		btn.classList.toggle('active', btn.dataset.page === page)
	)
}

function loadRecaptcha() {
	if (window.grecaptcha) {
		grecaptcha.render('recaptcha', { sitekey: SITE_KEY })
	} else {
		window.initRecaptcha = () => grecaptcha.render('recaptcha', { sitekey: SITE_KEY })
	}
}

function render(page) {
	activateLink(page)

	switch (page) {
		case 'about':
			document.title = 'About'
			document.querySelector('main').innerHTML =
				`<section class="about-wrapper">
					<figure>
						<img src="assets/images/portrait.jpg" alt="photo-about" class="about-photo">
						<figcaption style="margin-top:.5rem;font-weight:600">Jakub Gańko</figcaption>
					</figure>
					<div class="about-text">
						<h1 class="title">Hi, I'm Jacob!</h1>
						<p>Your <strong>Frogographer</strong> living near Wrocław.</p>
						<p>my passion for photographing frogs started a dozen or so years ago. I also study at the Wrocław University 
							of Technology, which allows me to create websites like these</p>
						<p>I would love to tell you more about my passions like going to the gym, my budding career path as a <strong>data engineer</strong>, 
							and so on. Maybe I'll write more about that someday...</p>
					</div>
				</section>`
		break

		case 'gallery':
			document.title = 'Gallery'
			document.querySelector('main').innerHTML =
				`<h1 class="title">Gallery</h1>
				<div id="gallery" class="gallery-grid"></div>`
			import('./gallery.js').then(m => m.loadGallery())
		break

		case 'contact':
			document.title = 'Contact'
			document.querySelector('main').innerHTML =
				`<h1 class="title">Contact</h1>
				<form id="contact-form">
					<label>Name
						<input type="text" name="name" required>
					</label>
					<label>Email
						<input type="email" name="email" required>
					</label>
					<label>Message
						<textarea name="message" rows="4" required></textarea>
					</label>
					<div id="recaptcha"></div>
					<button class="submit" type="submit">Send message</button>
				</form>`
			loadRecaptcha()
			import('./validate.js').then(m => m.attachValidation())
		break
	}
}