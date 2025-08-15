let tg;

window.addEventListener('load', () => {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();
        }
    } catch (e) {
        console.error("Telegram Web App setup failed", e);
    }

    if (document.body.contains(document.getElementById('starsInput'))) {
        setupHomePage();
    }
});

function setupHomePage() {
    const mainContent = document.getElementById('mainContent');
    const starsInput = document.getElementById('starsInput');
    const starsText = document.getElementById('starsText');
    const balanceWrapper = document.getElementById('balanceWrapper');
    
    const usernameInput = document.getElementById('usernameInput');
    const usernameText = document.getElementById('usernameText');
    const usernameWrapper = document.getElementById('usernameWrapper');

    balanceWrapper.addEventListener('click', () => starsInput.focus());
    usernameWrapper.addEventListener('click', () => usernameInput.focus());

    starsInput.addEventListener('input', () => {
        starsText.textContent = starsInput.value;
        updatePrice(starsInput.value);
    });

    usernameInput.addEventListener('input', () => {
        let value = usernameInput.value;
        if (value.length > 0 && !value.startsWith('@')) {
            value = '@' + value;
        }
        if (value.length > 1 && value.charAt(1) === '@') {
            value = '@' + value.substring(2);
        }
        usernameInput.value = value;
        usernameText.textContent = value;
    });

    starsInput.addEventListener('blur', () => {
        if (starsInput.value === '') {
            starsInput.value = '0';
            starsText.textContent = '0';
            updatePrice('0');
        }
    });

    usernameInput.addEventListener('blur', () => {
        if (usernameInput.value === '' || usernameInput.value === '@') {
            usernameInput.value = '@username';
            usernameText.textContent = '@username';
        }
    });

    mainContent.addEventListener('click', (event) => {
        const isClickInsideWrapper = usernameWrapper.contains(event.target) || balanceWrapper.contains(event.target);
        if (!isClickInsideWrapper) {
            starsInput.blur();
            usernameInput.blur();
        }
    });
}

function updatePrice(quantityStr) {
    const priceText = document.getElementById('priceText');
    const quantity = parseInt(quantityStr, 10);

    if (!isNaN(quantity) && quantity > 0) {
        const price = Math.round(quantity * 1.4);
        priceText.textContent = `${price}₽`;
    } else {
        priceText.textContent = '0₽';
    }
}

function navigateTo(page, event) {
    event.preventDefault();
    if (window.location.pathname.endsWith(page)) return;

    try {
        if (tg) tg.HapticFeedback.impactOccurred('light');
    } catch (e) {
        console.error("Haptic feedback failed", e);
    }
    
    setTimeout(() => { window.location.href = page; }, 50);
}