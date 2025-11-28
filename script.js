document.addEventListener('DOMContentLoaded', function() {
    // ========================
    // TAB SWITCHING
    // ========================
    const tabs = {
        'page-tab': 'page-content',
        'playing-tab': 'playing-content',
        'sosmed-tab': 'sosmed-content',
        'kritik-tab': 'kritik-content',
        'number-tab': 'number-content' // TAB GAME
    };

    // ========================
    // FORM KRITIK → KIRIM EMAIL VIA BREVO
    // ========================
    const kritikForm = document.getElementById('kritik-form');
    const kritikStatus = document.getElementById('kritik-status');

    if (kritikForm && kritikStatus) {
        kritikForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nama = document.getElementById('kritik-nama').value.trim();
            const pesanInput = document.getElementById('kritik-pesan') || document.getElementById('kritik-message');
            const pesan = pesanInput ? pesanInput.value.trim() : '';

            if (!nama || !pesan) {
                kritikStatus.textContent = 'Nama dan pesan wajib diisi.';
                kritikStatus.className = 'text-sm mt-2 text-white';
                return;
            }

            kritikStatus.textContent = 'Mengirim...';
            kritikStatus.className = 'text-sm mt-2 text-white';

            fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': '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',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { 
                        email: 'rafkasatriya61@gmail.com',
                        name: 'RafkaXr Web' 
                    },
                    to: [
                        { email: 'rafkasatriya61@gmail.com' }
                    ],
                    subject: 'Kritik baru dari BioLink',
                    htmlContent: `
                        <p><strong>Nama:</strong> ${nama}</p>
                        <p><strong>Pesan:</strong><br>${pesan.replace(/\n/g, '<br>')}</p>
                    `
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('Brevo response:', data);
                kritikForm.reset();

                kritikStatus.textContent = "";
                kritikStatus.className = "hidden";

                const popup = document.getElementById("popup-success");
                if (popup) {
                    popup.classList.add("show");
                    setTimeout(() => {
                        popup.classList.remove("show");
                    }, 5000);
                }
            })
            .catch(err => {
                console.error(err);
                kritikStatus.textContent = 'Gagal mengirim pesan. Coba lagi nanti.';
                kritikStatus.className = 'text-sm mt-2 text-white';
            });
        });
    }

    // ========================
    // FUNGSIONALITAS TAB
    // ========================
    Object.entries(tabs).forEach(([tabId, contentId]) => {
        const tab = document.getElementById(tabId);
        const content = document.getElementById(contentId);

        if (!tab || !content) return;

        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-content').forEach(el => {
                el.classList.add('hidden');
            });

            document.querySelectorAll('[role="group"] button').forEach(el => {
                el.classList.remove('bg-purple-600', 'text-white');
                el.classList.add('bg-gray-700', 'text-gray-300');
            });

            content.classList.remove('hidden');
            tab.classList.remove('bg-gray-700', 'text-gray-300');
            tab.classList.add('bg-purple-600', 'text-white');

            if (tabId === 'sosmed-tab') {
                showMarketPopup();
            }
            if (tabId === 'game-tab') {
                ();
            }
        });
    });

    // ========================
    // FUNGSI: STOP SEMUA MUSIK AUTOPLAY
    // ========================
    function stopAllAutoplayMusic() {
        const intro = document.getElementById("intro-music");
        if (intro && !intro.paused) {
            intro.pause();
        }

        if (window.ytPlayer) {
            try {
                ytPlayer.stopVideo();
            } catch (e) {
                console.warn("Gagal stop YouTube:", e);
            }
        }
    }

    // ========================
    // PLAYING / LOCAL AUDIO
    // ========================
    const songs = [
      {
        title: "Noviar Rafka Satriya",
        artist: "Anggota",
        file: "https://wa.me/628999809547"
      },
      {
        title: "everything u are",
        artist: "Hindia",
        file: "https://github.com/ChandraGO/Data-Jagoan-Project/raw/refs/heads/master/musikk/everything-u-are.mp3"
      },
      {
        title: "bergema sampai selamanya",
        artist: "Nadhif Basalamah",
        file: "https://github.com/ChandraGO/Data-Jagoan-Project/raw/refs/heads/master/musikk/bergema-sampai-selamanya.mp3"
      },
      {
        title: "Tarot",
        artist: ".Feast",
        file: "https://github.com/ChandraGO/Data-Jagoan-Project/raw/refs/heads/master/musikk/tarot.mp3"
      },
      {
        title: "Silet Open Up",
        artist: "TABOLA BALE (w/ Jacson Seran, Juan Reza, Diva Aurel)",
        file: "https://github.com/ChandraGO/Data-Jagoan-Project/raw/refs/heads/master/musikk/silet-open-up.mp3"
      }
    ];

    const musicList = document.querySelector('#song-list');
    const audioPlayer = document.querySelector('#audio-player');

    if (musicList && audioPlayer) {
      musicList.innerHTML = '';

      let currentIndex = -1;

      songs.forEach((song, index) => {
        const row = document.createElement('div');
        row.className =
          'song-row w-full flex items-center justify-between bg-gray-800 rounded-lg p-3 text-left hover:bg-gray-700 transition-colors';

        row.innerHTML = `
          <div>
            <div class="font-medium">${song.title}</div>
            <div class="text-sm text-gray-400">${song.artist}</div>
          </div>
          <button type="button"
            class="play-btn flex items-center justify-center px-3 py-2 rounded-full bg-purple-600 text-white text-xs hover:bg-purple-500">
            Play
          </button>
        `;

        const playBtn = row.querySelector('.play-btn');

        playBtn.addEventListener('click', () => {
          stopAllAutoplayMusic();

          if (currentIndex === index && !audioPlayer.paused) {
            audioPlayer.pause();
            playBtn.textContent = 'Play';
            row.classList.remove('border-l-4', 'border-purple-500');
            return;
          }

          musicList.querySelectorAll('.song-row').forEach(r => {
            r.classList.remove('border-l-4', 'border-purple-500');
            const btn = r.querySelector('.play-btn');
            if (btn) btn.textContent = 'Play';
          });

          currentIndex = index;
          audioPlayer.src = song.file;
          audioPlayer.play().catch(err => {
            console.error('Gagal memutar audio:', err);
          });

          row.classList.add('border-l-4', 'border-purple-500');
          playBtn.textContent = 'Pause';
        });

        musicList.appendChild(row);
      });

      audioPlayer.addEventListener('ended', () => {
        const rows = musicList.querySelectorAll('.song-row');
        rows.forEach(r => {
          r.classList.remove('border-l-4', 'border-purple-500');
          const btn = r.querySelector('.play-btn');
          if (btn) btn.textContent = 'Play';
        });
        currentIndex = -1;
      });
    }

   
    // optional: scheduleNextMarketPopup();

    // ========================
    // FIX AUTOPLAY for LOCAL VIDEO
    // ========================
    const bgVideo = document.getElementById("bg-video");
    if (bgVideo) {
      bgVideo.play().catch(() => {
        const start = () => {
          bgVideo.play().catch(err => console.error("Video error:", err));
          document.removeEventListener("click", start);
          document.removeEventListener("touchstart", start);
        };

        document.addEventListener("click", start);
        document.addEventListener("touchstart", start);
      });
    }

    // ============================
    // UNIVERSAL RIPPLE EFFECT
    // ============================
    document.addEventListener("click", function (e) {
        const el = e.target.closest("button, a.ripple-container");
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        const circle = document.createElement("span");
        circle.classList.add("ripple");

        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${e.clientX - rect.left - size / 2}px`;
        circle.style.top = `${e.clientY - rect.top - size / 2}px`;

        el.appendChild(circle);
        setTimeout(() => circle.remove(), 1200);
    });

    // =========================
    // YOUTUBE AUTOPLAY MUSIC
    // =========================
    window.ytPlayer = null;

    window.onYouTubeIframeAPIReady = function () {
      window.ytPlayer = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: "QRBsX9FYIZM",
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "QRBsX9FYIZM"
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            console.log("YouTube autoplay started (muted).");
          }
        }
      });
    };

    function attemptUnmute() {
      if (window.ytPlayer && ytPlayer.isMuted()) {
        ytPlayer.unMute();
        console.log("YouTube unmuted after user gesture.");
      }

      document.removeEventListener("click", attemptUnmute);
      document.removeEventListener("touchstart", attemptUnmute);
    }

    document.addEventListener("click", attemptUnmute);
    document.addEventListener("touchstart", attemptUnmute);

    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
