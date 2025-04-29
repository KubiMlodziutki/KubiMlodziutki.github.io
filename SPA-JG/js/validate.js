export function attachValidation() {
	const form = document.getElementById('contact-form')
	if (!form) return

	form.addEventListener('submit', e => {
		e.preventDefault()

		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value)
		if (!emailOk) {
			alert('Invalid email')
			return
		}

		const token = grecaptcha.getResponse()
		if (!token) {
			alert('Confirm reCAPTCHA')
			return
		}

		alert('Form sent!')
		form.reset()
		grecaptcha.reset()
	})
}
