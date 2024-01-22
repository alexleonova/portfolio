class AppStickyHeader extends HTMLElement {
	observer = null;

	connectedCallback() {
		this.observer = new IntersectionObserver(
			([event]) => event.target.toggleAttribute('sticky', event.intersectionRatio < 1),
			{
				rootMargin: '-1px 0px 0px 0px',
				threshold: [1]
			}
		);

		this.observer.observe(this);
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}
}

customElements.define('app-sticky-header', AppStickyHeader);