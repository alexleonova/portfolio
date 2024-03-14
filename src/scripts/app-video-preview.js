// class AppVideoPreview extends HTMLElement {
// 	static parentDelegateElements = 'article.card';
// 	picture = null;
// 	video = null;
// 	target = null;
// 	playPromise = null;

// 	connectedCallback() {
// 		this.picture = this.querySelector('picture'); 
// 		this.video = this.querySelector('video');

// 		if (!this.picture && !this.video) {
// 			console.warn('app-video-preview should contains <picture> and <video> elements.');
// 			return;
// 		}

// 		const parent = this.parentElement;
// 		this.target = this;

// 		if (parent.matches(AppVideoPreview.parentDelegateElements)) {
// 			this.target = parent;
// 		}

// 		if (!this.video.autoplay) {
// 			this.target.addEventListener('pointerenter', this.playVideo.bind(this));
// 			this.target.addEventListener('pointerleave', this.stopVideo.bind(this));
// 		} else {
// 			this.target.addEventListener('click', this.toggleVideo.bind(this));
// 		}
// 	}

// 	disconnectedCallback() {
// 		if (!this.video.autoplay) {
// 			this.target.removeEventListener('pointerenter', this.playVideo.bind(this));
// 			this.target.removeEventListener('pointerleave', this.stopVideo.bind(this));
// 		} else {
// 			this.target.removeEventListener('click', this.toggleVideo.bind(this));
// 		}
// 	}

// 	playVideo() {
// 		this.picture.hidden = true;
// 		this.video.hidden = false;
// 		this.playPromise = this.video.play();
// 	}

// 	stopVideo() {
// 		if (this.playPromise) {
// 			this.playPromise.then(_ => {
// 				this.video.pause();
// 			});
// 		}

// 		this.video.currentTime = 0;
// 		this.picture.hidden = false;
// 		this.video.hidden = true;
// 	}

// 	toggleVideo() {
// 		if (this.video.paused) {
// 			this.video.play();
// 		} else {
// 			this.video.pause();
// 		}
// 	}
// }

// customElements.define('app-video-preview', AppVideoPreview);