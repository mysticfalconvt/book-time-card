/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { customElement, property, state } from 'lit/decorators';
import { formfieldDefinition } from '../elements/formfield';
import { selectDefinition } from '../elements/select';
import { switchDefinition } from '../elements/switch';
import { textfieldDefinition } from '../elements/textfield';
import { BookTimeCardConfig } from './types';

@customElement('book-time-card-editor')
export class BookTimeCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: BookTimeCardConfig;

  @state() private _helpers?: any;

  private _initialized = false;

  static elementDefinitions = {
    ...textfieldDefinition,
    ...selectDefinition,
    ...switchDefinition,
    ...formfieldDefinition,
  };

  public setConfig(config: BookTimeCardConfig): void {
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _name(): string {
    return this._config?.name || 'Literature Time';
  }

  get _entity(): string {
    return this._config?.entity || '';
  }

  get _show_warning(): boolean {
    return this._config?.show_warning || false;
  }

  get _show_error(): boolean {
    return this._config?.show_error || false;
  }

  protected render(): TemplateResult {
    return html`
      <div class="card-config">
        <h3>Literature Time Card</h3>
        <div class="description">
          A beautiful card that displays literary quotes matching the current time. Each quote contains a time reference
          that matches the current time of day, creating a unique connection between literature and the present moment.
        </div>
        <div class="tip">
          Quotes will automatically update every minute and rotate through available quotes every 20 seconds.
        </div>
      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles: CSSResultGroup = css`
    .card-config {
      padding: 16px;
    }
    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-top: 0;
      margin-bottom: 16px;
      color: var(--primary-text-color);
    }
    .description {
      color: var(--secondary-text-color);
      margin-bottom: 16px;
      line-height: 1.5;
    }
    .tip {
      background: var(--primary-color);
      color: var(--primary-text-color);
      padding: 12px;
      border-radius: 4px;
      margin-top: 12px;
      opacity: 0.9;
    }
  `;
}
