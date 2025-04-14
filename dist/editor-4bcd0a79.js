import { _ as __decorate } from './literature-time-card-4d80ebe9.js';
import { fireEvent } from 'custom-card-helpers';
import { LitElement, html, css } from 'lit';
import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { property, state, customElement } from 'lit/decorators';
import { FormfieldBase } from '@material/mwc-formfield/mwc-formfield-base.js';
import { styles } from '@material/mwc-formfield/mwc-formfield.css.js';
import { SelectBase } from '@material/mwc-select/mwc-select-base.js';
import { ListBase } from '@material/mwc-list/mwc-list-base.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';
import { MenuSurfaceBase } from '@material/mwc-menu/mwc-menu-surface-base.js';
import { RippleBase } from '@material/mwc-ripple/mwc-ripple-base.js';
import { NotchedOutlineBase } from '@material/mwc-notched-outline/mwc-notched-outline-base.js';
import { styles as styles$1 } from '@material/mwc-select/mwc-select.css';
import { styles as styles$2 } from '@material/mwc-list/mwc-list.css';
import { styles as styles$3 } from '@material/mwc-list//mwc-list-item.css';
import { styles as styles$4 } from '@material/mwc-ripple/mwc-ripple.css';
import { styles as styles$5 } from '@material/mwc-menu/mwc-menu.css';
import { styles as styles$6 } from '@material/mwc-menu/mwc-menu-surface.css';
import { styles as styles$7 } from '@material/mwc-notched-outline/mwc-notched-outline.css';
import { SwitchBase } from '@material/mwc-switch/deprecated/mwc-switch-base.js';
import { styles as styles$8 } from '@material/mwc-switch/deprecated/mwc-switch.css';
import { TextFieldBase } from '@material/mwc-textfield/mwc-textfield-base.js';
import { styles as styles$9 } from '@material/mwc-textfield/mwc-textfield.css';
import 'lit/directives/unsafe-html.js';

const formfieldDefinition = {
  'mwc-formfield': class extends FormfieldBase {
    static get styles() {
      return styles;
    }
  },
};

const selectDefinition = {
  'mwc-select': class extends SelectBase {
    static get styles() {
      return styles$1;
    }
  },
  'mwc-list': class extends ListBase {
    static get styles() {
      return styles$2;
    }
  },
  'mwc-list-item': class extends ListItemBase {
    static get styles() {
      return styles$3;
    }
  },
  'mwc-ripple': class extends RippleBase {
    static get styles() {
      return styles$4;
    }
  },
  'mwc-menu': class extends MenuBase {
    static get styles() {
      return styles$5;
    }
  },
  'mwc-menu-surface': class extends MenuSurfaceBase {
    static get styles() {
      return styles$6;
    }
  },
  'mwc-notched-outline': class extends NotchedOutlineBase {
    static get styles() {
      return styles$7;
    }
  },
};

const switchDefinition = {
  'mwc-switch': class extends SwitchBase {
    static get styles() {
      return styles$8;
    }
  },
  'mwc-ripple': class extends RippleBase {
    static get styles() {
      return styles$4;
    }
  },
};

const textfieldDefinition = {
  'mwc-textfield': class extends TextFieldBase {
    static get styles() {
      return styles$9;
    }
  },
  'mwc-notched-outline': class extends NotchedOutlineBase {
    static get styles() {
      return styles$7;
    }
  },
};

let LiteratureTimeCardEditor = class LiteratureTimeCardEditor extends ScopedRegistryHost(LitElement) {
    constructor() {
        super(...arguments);
        this._initialized = false;
    }
    setConfig(config) {
        this._config = config;
        this.loadCardHelpers();
    }
    shouldUpdate() {
        if (!this._initialized) {
            this._initialize();
        }
        return true;
    }
    get _name() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.name) || 'Literature Time';
    }
    get _entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.entity) || '';
    }
    get _show_warning() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.show_warning) || false;
    }
    get _show_error() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.show_error) || false;
    }
    render() {
        return html `
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
    _initialize() {
        if (this.hass === undefined)
            return;
        if (this._config === undefined)
            return;
        if (this._helpers === undefined)
            return;
        this._initialized = true;
    }
    async loadCardHelpers() {
        this._helpers = await window.loadCardHelpers();
    }
    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        if (this[`_${target.configValue}`] === target.value) {
            return;
        }
        if (target.configValue) {
            if (target.value === '') {
                const tmpConfig = Object.assign({}, this._config);
                delete tmpConfig[target.configValue];
                this._config = tmpConfig;
            }
            else {
                this._config = Object.assign(Object.assign({}, this._config), { [target.configValue]: target.checked !== undefined ? target.checked : target.value });
            }
        }
        fireEvent(this, 'config-changed', { config: this._config });
    }
};
LiteratureTimeCardEditor.elementDefinitions = Object.assign(Object.assign(Object.assign(Object.assign({}, textfieldDefinition), selectDefinition), switchDefinition), formfieldDefinition);
LiteratureTimeCardEditor.styles = css `
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
__decorate([
    property({ attribute: false })
], LiteratureTimeCardEditor.prototype, "hass", void 0);
__decorate([
    state()
], LiteratureTimeCardEditor.prototype, "_config", void 0);
__decorate([
    state()
], LiteratureTimeCardEditor.prototype, "_helpers", void 0);
LiteratureTimeCardEditor = __decorate([
    customElement('literature-time-card-editor')
], LiteratureTimeCardEditor);

export { LiteratureTimeCardEditor };
