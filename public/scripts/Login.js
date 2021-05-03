import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Login');
  }
  async getHtml() {
    return `
    <div class="card">
      <div class="card-header"></div>
      <div class="card-body">
        <h4 class="card-title text-center">User Login</h4>

        <form class="container" style="max-width: 900px" action="/login " method="POST">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input input class="form-control" type="email" name="email" placeholder="E-mail:" />
            <div class="form-text text-secondary blockquote-footer">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input class="form-control" type="password" name="password" placeholder="Password:" />
          </div>
          <div class="mb-3 form-check"></div>
          <div class="text-center">
            <button type="button" class="btn btn-outline-info">
            <a href="/" data-link>Go back</a>
            </button>
            <button type="submit" class="btn btn-outline-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
    `;
  }
}
