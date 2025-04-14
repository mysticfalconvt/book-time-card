import{_ as t}from"./literature-time-card-34d72596.js";import{fireEvent as e}from"custom-card-helpers";import{LitElement as s,html as i,css as r}from"lit";import{ScopedRegistryHost as a}from"@lit-labs/scoped-registry-mixin";import{property as c,state as o,customElement as m}from"lit/decorators";import{FormfieldBase as l}from"@material/mwc-formfield/mwc-formfield-base.js";import{styles as n}from"@material/mwc-formfield/mwc-formfield.css.js";import{SelectBase as d}from"@material/mwc-select/mwc-select-base.js";import{ListBase as p}from"@material/mwc-list/mwc-list-base.js";import{ListItemBase as u}from"@material/mwc-list/mwc-list-item-base.js";import{MenuBase as f}from"@material/mwc-menu/mwc-menu-base.js";import{MenuSurfaceBase as w}from"@material/mwc-menu/mwc-menu-surface-base.js";import{RippleBase as h}from"@material/mwc-ripple/mwc-ripple-base.js";import{NotchedOutlineBase as g}from"@material/mwc-notched-outline/mwc-notched-outline-base.js";import{styles as y}from"@material/mwc-select/mwc-select.css";import{styles as v}from"@material/mwc-list/mwc-list.css";import{styles as _}from"@material/mwc-list//mwc-list-item.css";import{styles as x}from"@material/mwc-ripple/mwc-ripple.css";import{styles as b}from"@material/mwc-menu/mwc-menu.css";import{styles as j}from"@material/mwc-menu/mwc-menu-surface.css";import{styles as O}from"@material/mwc-notched-outline/mwc-notched-outline.css";import{SwitchBase as z}from"@material/mwc-switch/deprecated/mwc-switch-base.js";import{styles as C}from"@material/mwc-switch/deprecated/mwc-switch.css";import{TextFieldBase as q}from"@material/mwc-textfield/mwc-textfield-base.js";import{styles as V}from"@material/mwc-textfield/mwc-textfield.css";import"lit/directives/unsafe-html.js";const k={"mwc-formfield":class extends l{static get styles(){return n}}},H={"mwc-select":class extends d{static get styles(){return y}},"mwc-list":class extends p{static get styles(){return v}},"mwc-list-item":class extends u{static get styles(){return _}},"mwc-ripple":class extends h{static get styles(){return x}},"mwc-menu":class extends f{static get styles(){return b}},"mwc-menu-surface":class extends w{static get styles(){return j}},"mwc-notched-outline":class extends g{static get styles(){return O}}},L={"mwc-switch":class extends z{static get styles(){return C}},"mwc-ripple":class extends h{static get styles(){return x}}},T={"mwc-textfield":class extends q{static get styles(){return V}},"mwc-notched-outline":class extends g{static get styles(){return O}}};let A=class extends(a(s)){constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||"Literature Time"}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _show_warning(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_warning)||!1}get _show_error(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_error)||!1}render(){return i`
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
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return;const s=t.target;if(this[`_${s.configValue}`]!==s.value){if(s.configValue)if(""===s.value){const t=Object.assign({},this._config);delete t[s.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[s.configValue]:void 0!==s.checked?s.checked:s.value});e(this,"config-changed",{config:this._config})}}};A.elementDefinitions=Object.assign(Object.assign(Object.assign(Object.assign({},T),H),L),k),A.styles=r`
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
  `,t([c({attribute:!1})],A.prototype,"hass",void 0),t([o()],A.prototype,"_config",void 0),t([o()],A.prototype,"_helpers",void 0),A=t([m("literature-time-card-editor")],A);export{A as LiteratureTimeCardEditor};
//# sourceMappingURL=editor-ce18b40d.js.map
