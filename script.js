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

    if (document.getElementById('starsInput')) {
        const starsInput = document.getElementById('starsInput');
        const purchaseBtn = document.getElementById('purchaseBtn');
        const purchaseBtnText = purchaseBtn.querySelector('.font-numeric');

        starsInput.addEventListener('input', function() {
            // Эта логика - временная.
            // В будущем здесь будет запрос к бэкенду для получения цены.
            const quantity = parseInt(this.value, 10);
            if (!isNaN(quantity) && quantity > 0) {
                const price = Math.round(quantity * 1.4); // Примерный расчет
                purchaseBtnText.textContent = price;
            } else {
                purchaseBtnText.textContent = '0';
            }
        });
    }
});

function navigateTo(page, event) {
    event.preventDefault();

    if (window.location.pathname.endsWith('/' + page) || window.location.pathname.endsWith(page)) {
        return;
    }

    try {
        if (tg) {
            tg.HapticFeedback.impactOccurred('light');
        }
    } catch (e) {
        console.error("Haptic feedback failed", e);
    }
    
    setTimeout(() => {
        window.location.href = page;
    }, 50);
}