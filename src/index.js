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
