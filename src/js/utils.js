export const darkModeHandle = () => {
    let switcherText = document.getElementById('switcherText');
    const darkModeSwitcher = document.getElementById('toggleDarkMode')
    const htmlElement = document.documentElement

    if (localStorage.getItem('mode') === 'dark'){
        htmlElement.classList.add('dark')
        darkModeSwitcher.checked = true
        switcherText.textContent = 'Dark mode'
    } else {
        switcherText.textContent = 'Light mode'
    }

    darkModeSwitcher.addEventListener('input', () => {
        htmlElement.classList.toggle('dark')

        if (htmlElement.classList.contains('dark')) {
            switcherText.textContent = 'Dark mode'
        } else if (!htmlElement.classList.contains('dark')) {
            switcherText.textContent = 'Light mode'
        }

        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('mode', 'dark')
        } else {
            localStorage.setItem('mode', 'light')
        }
    })
}