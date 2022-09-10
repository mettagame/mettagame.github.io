const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = 
<NYI></NYI>
;

class Header extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define("header-component", Header);