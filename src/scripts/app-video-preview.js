class AppVideoPreview extends HTMLElement {
	static parentDelegateElements = 'article.card';
	video = null;
	target = null;
	playPromise = null;

	connectedCallback() {
		this.video = this.querySelector('video');

		if (!this.video) {
			console.warn('app-video-preview should contains <video> element.');
			return;
		}

		const parent = this.parentElement;
		this.target = this;

		if (parent.matches(AppVideoPreview.parentDelegateElements)) {
			this.target = parent;
		}

		this.target.addEventListener('pointerenter', this.playVideo.bind(this));
		this.target.addEventListener('pointerleave', this.stopVideo.bind(this));
	}

	disconnectedCallback() {
		this.target.removeEventListener('pointerenter', this.playVideo.bind(this));
		this.target.removeEventListener('pointerleave', this.stopVideo.bind(this));
	}

	playVideo() {
		this.playPromise = this.video.play();
	}

	stopVideo() {
		if (this.playPromise) {
			this.playPromise.then(_ => {
				this.video.pause();
			});
		}
		
		// @TODO
		this.video.load();
	}
}

customElements.define('app-video-preview', AppVideoPreview);