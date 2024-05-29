class AppFilterControls extends HTMLElement {
	buttons = [];
	currentButton = null;
	currentFilter = (new URL(location.href)).searchParams.get('filter') || 'all';

	connectedCallback() {
		this.buttons = Array.from(this.querySelectorAll('button.filter__button[aria-pressed]'));

		if (this.buttons.length < 2) {
			console.warn('app-filter-controls should contains at least two <button class="filter__button" aria-pressed="true/false"> elements.');
			return;
		}

		this.currentButton = this.buttons.find(button => button.ariaPressed === 'true');
		
		if (!this.currentButton) {
			this.currentButton = this.buttons.find(button => button.dataset.filter === this.currentFilter);
			this.currentButton.ariaPressed = true;
		}

		this.currentFilter = this.currentButton.dataset.filter;
		this.addEventListener('click', this.onFilterClick.bind(this));
	}

	onFilterClick(event) {
		const target = event.target;

		if (target === this || target === this.currentButton) return;

		this.currentButton.ariaPressed = 'false';
		this.currentButton = target;
		this.currentButton.ariaPressed = 'true';
		this.currentFilter = this.currentButton.dataset.filter;
		const search = (new URLSearchParams(location.search));
		search.set('filter', this.currentFilter);
		history.replaceState(null, null, `?${search.toString()}`);
		this.throwChangeEvent();
	}

	throwChangeEvent() {
		this.dispatchEvent(new CustomEvent(
			'app-filter-controls:change', 
			{ 
				detail: { 
					filter: this.currentFilter 
				}
			}
		));
	}
}

customElements.define('app-filter-controls', AppFilterControls);