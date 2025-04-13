/* eslint-disable @typescript-eslint/no-explicit-any */
import { HomeAssistant, LovelaceCardEditor, hasConfigOrEntityChanged } from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers
import { CSSResultGroup, LitElement, PropertyValues, TemplateResult, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { CARD_VERSION } from './const';
import quotesData from './data/quotes.json';
import { localize } from './localize/localize';
import type { BookTimeCardConfig } from './types';

/* eslint no-console: 0 */
console.info(
  `%c  LITERATURE-TIME \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'book-time-card',
  name: 'Literature Time',
  description: 'A card that shows literary quotes based on the time of day',
});

interface BookQuote {
  time: string;
  timestring: string;
  quote: string;
  title: string;
  author: string;
}

declare global {
  interface Window {
    Papa: any;
  }
}

// TODO Name your custom element
@customElement('book-time-card')
export class BookTimeCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement('book-time-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      name: 'Literature Time',
    };
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: BookTimeCardConfig;
  @state() private quotes: BookQuote[] = quotesData;
  @state() private currentQuote: BookQuote | null = null;
  @state() private currentTimeQuotes: BookQuote[] = [];
  private timerRef: number | null = null;
  private quoteIntervalRef: number | null = null;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public async setConfig(config: BookTimeCardConfig): Promise<void> {
    console.log('Setting config:', config);
    this.config = config;
    this.updateCurrentTimeQuotes();
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      console.log('No config available');
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    console.log('Rendering card with state:', {
      quotes: this.quotes.length,
      currentQuote: this.currentQuote,
      currentTimeQuotes: this.currentTimeQuotes.length,
    });

    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning'));
    }

    if (this.config.show_error) {
      return this._showError(localize('common.show_error'));
    }

    return html`
      <ha-card>
        <div class="card-content">
          ${this.currentQuote
            ? html`
                <div class="quote-container">
                  <div class="quote-text">
                    "${unsafeHTML(this.formatQuote(this.currentQuote.quote, this.currentQuote.timestring))}"
                  </div>
                  <div class="quote-footer">
                    <div class="title">${this.currentQuote.title}</div>
                    <div class="author">by ${this.currentQuote.author}</div>
                  </div>
                </div>
              `
            : html`
                <div class="loading-container">
                  <div class="loading-text">Loading quotes...</div>
                  <div class="quote-count">
                    ${this.quotes.length > 0 ? `${this.quotes.length} quotes loaded` : 'No quotes available'}
                  </div>
                </div>
              `}
        </div>
      </ha-card>
    `;
  }

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
  }

  private formatQuote(quote: string, timestring: string): string {
    const regex = new RegExp(`(${timestring})`, 'gi');
    return quote.replace(regex, '<strong class="highlight">$1</strong>');
  }

  private updateCurrentTimeQuotes(): void {
    console.log('Updating current time quotes');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    console.log('Current time:', currentTime);

    let matchingQuotes = this.quotes.filter((quote) => quote.time === currentTime);
    console.log('Matching quotes for current time:', matchingQuotes.length);

    if (matchingQuotes.length === 0) {
      const prevDate = new Date(now.getTime() - 60000);
      const prevHours = prevDate.getHours().toString().padStart(2, '0');
      const prevMinutes = prevDate.getMinutes().toString().padStart(2, '0');
      const prevTime = `${prevHours}:${prevMinutes}`;
      console.log('No quotes for current time, checking previous minute:', prevTime);

      matchingQuotes = this.quotes.filter((quote) => quote.time === prevTime);
      console.log('Matching quotes for previous minute:', matchingQuotes.length);
    }

    this.currentTimeQuotes = matchingQuotes;

    if (matchingQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
      this.currentQuote = matchingQuotes[randomIndex];
      console.log('Selected quote:', this.currentQuote);
    } else {
      this.currentQuote = null;
      console.log('No matching quotes found');
    }
  }

  private scheduleNextUpdate(): void {
    const now = new Date();
    const nextMinute = new Date(now);
    nextMinute.setMinutes(now.getMinutes() + 1);
    nextMinute.setSeconds(0);
    nextMinute.setMilliseconds(0);

    const timeUntilNextMinute = nextMinute.getTime() - now.getTime();
    console.log('Scheduling next update in', timeUntilNextMinute, 'ms');

    if (this.timerRef) {
      clearTimeout(this.timerRef);
    }

    this.timerRef = window.setTimeout(() => {
      this.updateCurrentTimeQuotes();
      this.scheduleNextUpdate();
    }, timeUntilNextMinute);
  }

  connectedCallback(): void {
    super.connectedCallback();
    console.log('Card connected');
    this.updateCurrentTimeQuotes();
    this.scheduleNextUpdate();

    this.quoteIntervalRef = window.setInterval(() => {
      if (this.currentTimeQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.currentTimeQuotes.length);
        this.currentQuote = this.currentTimeQuotes[randomIndex];
        console.log('Rotating to new quote:', this.currentQuote);
      }
    }, 20000);
  }

  disconnectedCallback(): void {
    console.log('Card disconnected');
    if (this.timerRef) {
      clearTimeout(this.timerRef);
    }
    if (this.quoteIntervalRef) {
      clearInterval(this.quoteIntervalRef);
    }
    super.disconnectedCallback();
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css`
      .card-content {
        padding: 16px;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .quote-container {
        max-width: 800px;
        width: 100%;
        background: var(--card-background-color);
        border-radius: 12px;
        padding: 24px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .quote-text {
        font-size: 1.5rem;
        line-height: 1.6;
        margin-bottom: 24px;
        font-style: italic;
        color: var(--primary-text-color);
      }

      .quote-text .highlight {
        font-weight: bold;
        color: var(--primary-color);
      }

      .quote-footer {
        text-align: right;
        border-top: 1px solid var(--divider-color);
        padding-top: 16px;
        margin-top: 16px;
      }

      .title {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .author {
        font-size: 1rem;
        color: var(--secondary-text-color);
      }

      .loading-container {
        text-align: center;
      }

      .loading-text {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: var(--primary-text-color);
      }

      .quote-count {
        font-size: 0.9rem;
        color: var(--secondary-text-color);
      }
    `;
  }
}
