class AppFilterResults extends HTMLElement {
	static classes = {
		animatedCard: 'card--revealed',
		visibleCard: 'card--visible'
	};
	static selectors = {
		filterControls: 'app-filter-controls',
		filterItem: '[data-filter]',
		card: '.card'
	};
	filterControls = null;
	cards = [];
	currentFilter = (new URL(location.href)).searchParams.get('filter') || 'all';

	connectedCallback() {
		this.filterControls = document.querySelector(AppFilterResults.selectors.filterControls);

		if (!this.filterControls) return;

		this.cards = Array.from(this.querySelectorAll(AppFilterResults.selectors.filterItem));
		// this.cards.forEach(card => {
		// 	if (!card.classList.contains(AppFilterResults.classes.animatedCard)) return;

		// 	const observer = new IntersectionObserver(
		// 		([event]) => event.target.classList.toggle(AppFilterResults.classes.visibleCard, event.isIntersecting)
		// 	);
	
		// 	observer.observe(card.querySelector(AppFilterResults.selectors.card));
		// });
		this.filterCards();

		this.filterControls.addEventListener('app-filter-controls:change', this.onFilterControlsChange.bind(this));
	}

	onFilterControlsChange(event) {
		this.currentFilter = event.detail.filter;
		this.filterCards();
	}

	filterCards() {
		if (this.currentFilter === 'all') {
			this.cards.forEach(item => item.hidden = false);
		} else {
			this.cards.forEach(item => item.hidden = item.dataset.filter !== this.currentFilter);
		}
	}
}

customElements.define('app-filter-results', AppFilterResults);