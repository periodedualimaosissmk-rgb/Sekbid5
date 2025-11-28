class ThemeSwitcher extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .theme-btn {
                    transition: all 0.3s ease;
                }
                .theme-btn:hover {
                    transform: scale(1.1);
                }
                .active-theme {
                    border: 2px solid #9f7aea;
                    box-shadow: 0 0 10px rgba(159, 122, 234, 0.5);
                }
            </style>
            <div class="flex space-x-4">
                <button class="theme-btn w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center active-theme" data-theme="dark">
                    <i data-feather="moon" class="w-5 h-5 text-purple-400"></i>
                </button>
                <button class="theme-btn w-10 h-10 rounded-full bg-white flex items-center justify-center" data-theme="light">
                    <i data-feather="sun" class="w-5 h-5 text-yellow-500"></i>
                </button>
                <button class="theme-btn w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center" data-theme="colorful">
                    <i data-feather="droplet" class="w-5 h-5 text-white"></i>
                </button>
            </div>
        `;

        this.shadowRoot.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                this.shadowRoot.querySelectorAll('.theme-btn').forEach(b => {
                    b.classList.remove('active-theme');
                });
                
                // Add active class to clicked button
                btn.classList.add('active-theme');
                
                // Change theme
                const theme = btn.getAttribute('data-theme');
                document.documentElement.className = theme;
                
                if (theme === 'colorful') {
                    document.body.classList.remove('bg-gray-900', 'text-gray-100');
                    document.body.classList.add('bg-gradient-to-br', 'from-purple-900', 'via-gray-900', 'to-blue-900');
                } else {
                    document.body.classList.remove('bg-gradient-to-br', 'from-purple-900', 'via-gray-900', 'to-blue-900');
                    document.body.classList.add('bg-gray-900', 'text-gray-100');
                }
            });
        });
    }
}

customElements.define('theme-switcher', ThemeSwitcher);