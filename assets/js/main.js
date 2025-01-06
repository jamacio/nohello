document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Light Mode';
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            toggleButton.textContent = 'Light Mode';
        } else {
            toggleButton.textContent = 'Dark Mode';
        }
        localStorage.setItem('theme', theme);
    });
    const userLang = localStorage.getItem('language') || (navigator.language || navigator.userLanguage).split('-')[0];
    fetch('../../../i18n/main.json')
        .then(response => response.json())
        .then(data => {
            const translations = data;

            if (translations[userLang]) {
                document.documentElement.lang = userLang;
                document.querySelectorAll('[data-translate]').forEach(element => {
                    const key = element.getAttribute('data-translate');
                    element.innerHTML = translations[userLang][key] || element.innerHTML;
                });
            }

            const buttonContainer = document.getElementById('button-container');
            Object.keys(translations).forEach(lang => {
                const button = document.createElement('button');
                button.textContent = lang.toUpperCase();
                button.addEventListener('click', () => {
                    document.documentElement.lang = lang;
                    document.querySelectorAll('[data-translate]').forEach(element => {
                        const key = element.getAttribute('data-translate');
                        element.innerHTML = translations[lang][key] || element.innerHTML;
                    });
                    localStorage.setItem('language', lang);
                });
                buttonContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error loading translations:', error));
});