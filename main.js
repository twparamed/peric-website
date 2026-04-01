document.addEventListener("DOMContentLoaded", function() {
    // 1. 取得當前網址與語系判斷
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '') currentPath = 'index-zh.html'; // 預設首頁
    const isZh = currentPath.includes('-zh');

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
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPath) {
                        link.classList.add('active');
                    }
                });

                // 設定語系切換按鈕的正確網址
                const langSwitch = document.getElementById(isZh ? 'lang-switch-en' : 'lang-switch-zh');
                if (langSwitch) {
                    let switchPath = isZh ? currentPath.replace('-zh', '') : currentPath.replace('.html', '-zh.html');
                    if(switchPath === '-zh.html') switchPath = 'index-zh.html'; // 防呆
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