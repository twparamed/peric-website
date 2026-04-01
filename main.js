document.addEventListener("DOMContentLoaded", function() {
    // 1. 取得當前語系 (最精準：直接看 html 標籤的 lang 屬性)
    const currentLang = document.documentElement.lang;
    const isZh = currentLang === 'zh-TW';

    // 2. 設定要載入的模組檔名
    const navFile = isZh ? 'navbar-zh.html' : 'navbar.html';
    const footerFile = isZh ? 'footer-zh.html' : 'footer.html';

    // 3. 載入 Navbar
    fetch(navFile)
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('navbar-placeholder');
            if(navPlaceholder) {
                navPlaceholder.innerHTML = data;
                
                // 點亮當前頁面的選單 (Active)
                let currentPath = window.location.pathname.split('/').pop();
                if (currentPath === '') currentPath = isZh ? 'index-zh.html' : 'index.html'; 
                
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPath) {
                        link.classList.add('active');
                    }
                });

                // 設定語系切換按鈕的正確網址
                const langSwitch = document.getElementById(isZh ? 'lang-switch-en' : 'lang-switch-zh');
                if (langSwitch) {
                    let switchPath;
                    if (isZh) {
                        switchPath = currentPath.replace('-zh', '');
                        if (switchPath === currentPath) switchPath = 'index.html';
                    } else {
                        switchPath = currentPath.replace('.html', '-zh.html');
                        if (currentPath === 'index.html' || currentPath === '') switchPath = 'index-zh.html';
                    }
                    langSwitch.setAttribute('href', switchPath);
                }
            }
        });

    // 4. 載入 Footer
    fetch(footerFile)
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if(footerPlaceholder) footerPlaceholder.innerHTML = data;
        });
});