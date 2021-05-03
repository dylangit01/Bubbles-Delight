import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Main");
  }
  async getHtml() {
    const temp = `
        <!-- Header section -->
        <header>
          <h1>Bubbles Delight</h1>
          <h3>De<em>light</em>ful bubbleteas brewed by Lighthouse Labs!</h3>
        </header>

        <main class="container mt-4">
          <h2 class="mb-4">Heaven in every sip...</h2>
          <div id="bubbleteaMenu" class="row row-cols-1 row-cols-md-4 g-4"></div>
        </main>;
      `;
    loadBubbleteas();
    return temp;

  }
}
