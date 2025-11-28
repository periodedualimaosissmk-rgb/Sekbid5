class MusicPlayer extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        const src = this.getAttribute('data-src') || '';
        
        this.shadowRoot.innerHTML = `
            <style>
                .player-container {
                    transition: all 0.3s ease;
                }
                .player-container:hover {
                    transform: scale(1.02);
                }
            </style>
            <div class="player-container bg-gray-800 rounded-lg overflow-hidden mb-4">
                <div class="p-4 flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="bg-purple-600 p-3 rounded-full mr-3">
                            <i data-feather="play" class="w-5 h-5 text-white"></i>
                        </div>
                        <div>
                            <div class="font-medium">Now Playing</div>
                            <div class="text-sm text-gray-400">Gaming Anthem - Pro Gamer</div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button class="p-2 rounded-full hover:bg-gray-700 transition-colors">
                            <i data-feather="skip-back" class="w-5 h-5 text-gray-400"></i>
                        </button>
                        <button class="p-2 rounded-full hover:bg-gray-700 transition-colors">
                            <i data-feather="skip-forward" class="w-5 h-5 text-gray-400"></i>
                        </button>
                    </div>
                </div>
                <div class="aspect-w-16 aspect-h-9">
                        <iframe 
                        width="100%" 
                        height="200" 
                        src="${src}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        class="w-full h-[200px] gaming-frame">
</iframe>
                </div>
            </div>
        `;
    }
}

customElements.define('music-player', MusicPlayer);