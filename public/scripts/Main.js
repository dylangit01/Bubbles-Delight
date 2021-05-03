import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Main");
  }
  async getHtml() {
    return `

    <!-- Header section -->
    <header>
      <h1>Bubbles Delight</h1>
      <h3>De<em>light</em>ful bubbleteas brewed by Lighthouse Labs!</h3>
    </header>

    <main class="container mt-4">
    <h2 class="mb-4">Heaven in every sip...</h2>
    <div class="row row-cols-1 row-cols-md-4 g-4">
    <div class="col mb-4">
      <div class="card">
        <img src="images/1.jpg" class="card-img-top" alt="bubbletea1" />
        <div class="card-body">
          <h5 class="card-title">Bubbletea 1</h5>
          <p class="card-text">Price: $5.99</p>
          <button type="button" class="w-100 btn btn-outline-danger">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card">
        <img src="images/2.jpg" class="card-img-top" alt="bubbletea2" />
        <div class="card-body">
          <h5 class="card-title">Bubbletea 2</h5>
          <p class="card-text">rice: $5.99</p>
          <button type="button" class="w-100 btn btn-outline-danger">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card">
        <img src="images/3.jpg" class="card-img-top" alt="bubbletea3" />
        <div class="card-body">
          <h5 class="card-title">Bubbletea 3</h5>
          <p class="card-text">Price: $5.99</p>
          <button type="button" class="w-100 btn btn-outline-danger">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card">
        <img src="images/4.jpg" class="card-img-top" alt="bubbletea4" />
        <div class="card-body">
          <h5 class="card-title">Bubbletea 4</h5>
          <p class="card-text">Price: $5.99</p>
          <button type="button" class="w-100 btn btn-outline-danger">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="col mb-4">
      <div class="card">
        <img src="images/5.jpg" class="card-img-top" alt="bubbletea4" />
        <div class="card-body">
          <h5 class="card-title">Bubbletea 4</h5>
          <p class="card-text">Price: $5.99</p>
          <button type="button" class="w-100 btn btn-outline-danger">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</main>;
    `;
  }
}
