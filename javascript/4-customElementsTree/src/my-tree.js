import {LitElement, html} from "lit-element"
import "./my-leaf.js"


class MyTree extends LitElement {
  static get properties() {
    return {
      data: {type: Object}
    };
  }


  render() {
    return html`
      <ul>
        <my-leaf data="${JSON.stringify(this.data)}"></my-leaf>
        ${'items' in this.data ? this.data.items.map(item => {
          return html`
            <my-tree data="${JSON.stringify(item)}"></my-tree>
          `
        }) : null}
        </ul>
    `
  }

}

customElements.define("my-tree", MyTree)
