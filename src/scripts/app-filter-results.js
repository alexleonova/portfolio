class AppFilterResults extends HTMLElement {
	filterControls = null;
	cards = [];
	currentFilter = 'all';

	connectedCallback() {
		this.filterControls = document.querySelector('app-filter-controls');

		if (!this.filterControls) return;

		this.cards = Array.from(this.querySelectorAll('[data-filter]'));
		this.filterControls.addEventListener('app-filter-controls:change', this.filterCards.bind(this));
	}

	filterCards(event) {
		this.currentFilter = event.detail.filter;

		if (this.currentFilter === 'all') {
			this.cards.forEach(item => item.hidden = false);
		} else {
			this.cards.forEach(item => item.hidden = item.dataset.filter !== this.currentFilter);
		}
	}
}

customElements.define('app-filter-results', AppFilterResults);