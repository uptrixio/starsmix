window.addEventListener('load', () => {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();
        }
    } catch (e) {
        console.error("Telegram Web App setup failed", e);
    }
});

function navigateTo(page, event) {
    event.preventDefault();

    if (window.location.pathname.endsWith('/' + page) || window.location.pathname.endsWith(page)) {
        return;
    }

    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.HapticFeedback.impactOccurred('light');
        }
    } catch (e) {
        console.error("Haptic feedback failed", e);
    }
    
    setTimeout(() => {
        window.location.href = page;
    }, 50);
}