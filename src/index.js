const btn = document.querySelector('button.mobile-menu-button')
const menu = document.querySelector('div.mobile-menu')
const backdrop = document.querySelector('#nav-backdrop')

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden')
})

document.querySelectorAll('.mobile-menu a').forEach(function (a) {
    a.addEventListener('click', () => {
        setTimeout(() => {
            menu.classList.toggle('hidden')
        }, 150)
    })
})

backdrop.addEventListener('click', () => {
    menu.classList.toggle('hidden')
})

// Carousel
const buttons = document.querySelectorAll('[data-carousel-button]')
const previousButton = document.querySelector('[data-carousel-button="prev"]')
const nextButton = document.querySelector('[data-carousel-button="next"]')

previousButton.disabled = true

buttons.forEach(button => {
    button.addEventListener('click', e => {
        const offset = button.dataset.carouselButton === 'next' ? 1 : -1
        const slides = button.closest('[data-carousel]').querySelector('[data-slides]')

        const previousActiveSlide = slides.querySelector('[data-active]')

        let newIndex = [...slides.children].indexOf(previousActiveSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        if (newIndex === 0) {
            previousButton.disabled = true
            nextButton.disabled = false
        } else if (newIndex === slides.children.length - 1) {
            nextButton.disabled = true
            previousButton.disabled = false
        } else {
            nextButton.disabled = false
            previousButton.disabled = false
        }

        const currentActiveSlide = slides.children[newIndex]

        currentActiveSlide.dataset.active = true

        // Change previous slide
        previousActiveSlide.classList.remove('translate-x-0')
        previousActiveSlide.classList.remove('z-20')
        previousActiveSlide.classList.add('-translate-x-full')
        previousActiveSlide.classList.add('z-10')

        // Change next slide
        currentActiveSlide.classList.remove('translate-x-full')
        currentActiveSlide.classList.remove('-translate-x-full')
        currentActiveSlide.classList.remove('z-10')
        currentActiveSlide.classList.add('translate-x-0')
        currentActiveSlide.classList.add('z-20')

        const nextActiveSlide = slides.children[newIndex + 1]
        if (nextActiveSlide) {
            nextActiveSlide.classList.remove('translate-x-0')
            nextActiveSlide.classList.remove('-translate-x-full')
            nextActiveSlide.classList.add('translate-x-full')
        }

        if (newIndex === 0) {
            slides.children[slides.children.length - 1].classList.remove('translate-x-0')
            slides.children[slides.children.length - 1].classList.add('-translate-x-full')
            slides.children[slides.children.length - 1].classList.add('translate-x-full')
        }
        if (newIndex === slides.children.length - 1) {
            slides.children[0].classList.remove('translate-x-0')
            slides.children[0].classList.remove('translate-x-full')
            slides.children[0].classList.add('-translate-x-full')
        }

        if (e.target.dataset.carouselButton === 'next') {
        }

        delete previousActiveSlide.dataset.active
    })
})

let contactForm = document.getElementById('contact-form')

contactForm.addEventListener('submit', async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await submitContactInfo(formData)
})

async function submitContactInfo(formData) {
    const jsonFormData = Object.fromEntries(formData.entries())

    const response = await fetch('https://spd-contact.onrender.com/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(jsonFormData)
    })

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    if (response.ok) {
        alert('Thank you for your query.\nWe will get in touch with you shortly.')
    }

    return response.json()
}

document.getElementById('spd-copyright').innerHTML = `©2022-${new Date().getFullYear()} <a href="#top" class="hover:underline ml-1 text-spd-red">Sprint Devs</a>. All Rights Reserved.`
