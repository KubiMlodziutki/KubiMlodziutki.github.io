const imageCount = 9
const imageDir = 'assets/images/'

export function loadGallery() {
	const container = document.getElementById('gallery')

	for (let i = 1; i <= imageCount; i++) {
		fetchAsBlob(`${imageDir}zaba${i}.jpg`).then(blobUrl => {
			const img = document.createElement('img')
			img.dataset.src = blobUrl
			img.alt = `Zaba ${i}`
			container.appendChild(img)
			img.addEventListener('click', () => openModal(blobUrl))
			observer.observe(img)
		})
	}
}

async function fetchAsBlob(path) {
	const resp = await fetch(path)
	const blob = await resp.blob()
	return URL.createObjectURL(blob)
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(e => {
		if (e.isIntersecting) {
			const img = e.target
			img.src = img.dataset.src
			observer.unobserve(img)
		}
	})
}, { threshold: .1 })

function openModal(src) {
	const modal = document.createElement('div')
	modal.className = 'modal'
	modal.innerHTML = `<button aria-label="close">&times;</button><img src="${src}" alt="">`
	document.body.appendChild(modal)
	modal.addEventListener('click', e => {
		if (e.target.tagName === 'BUTTON' || e.target === modal) modal.remove()
	})
}
