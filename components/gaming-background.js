class GamingBackground extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        iframe {
          width: 100vw;
          height: 56.25vw;
          min-height: 100vh;
          min-width: 177.77vh;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.15;
        }
      </style>
      <iframe 
        src="https://www.youtube.com/embed/BXgOZoWmeIE?autoplay=1&mute=1&loop=1&playlist=BXgOZoWmeIE" 
        frameborder="0" 
        allow="autoplay">
      </iframe>
    `;
  }
}

customElements.define('gaming-background', GamingBackground);