import { LitElement, html } from "lit-element"

class MyLeaf extends LitElement {
  static get properties() {
    return {
      data: {type: Object}
    };
  }

  render() {
    return html`
      <li>
        ${this.data.id}
      </li>
    `
  }
}

customElements.define("my-leaf", MyLeaf)

