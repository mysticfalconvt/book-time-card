import { BookTimeCard } from './book-time-card-a10b35ba.js';

// Ensure the custom element is registered
if (!customElements.get('book-time-card')) {
    customElements.define('book-time-card', BookTimeCard);
    console.info('book-time-card registered');
}

// Register for the card picker
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'book-time-card',
    name: 'Literature Time',
    description: 'A card that shows literary quotes based on the time of day'
});
