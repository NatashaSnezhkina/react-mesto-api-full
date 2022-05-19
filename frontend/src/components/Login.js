import React from 'react';
import * as Auth from '../utils/Auth';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@test.ru',
      password: 'test',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.email, this.state.password);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="sign-form">
        <h3 className="sign-form__title">Вход</h3>
        <form className="form sign-form__form" onSubmit={this.handleSubmit}>
          <input
            className="sign-form__input"
            value={this.state.email}
            onChange={this.handleChange}
            type="email"
            name="email"
            placeholder="Email"
            required minLength="2"
            maxLength="30" />
          <span className="error"></span>
          <input
            className="sign-form__input"
            value={this.state.password}
            onChange={this.handleChange}
            type="text"
            name="password"
            placeholder="Пароль" />
          <span className="error"></span>
          <button type="submit" className="submit-button sign-form__button" >Войти</button>
        </form>
      </div>
    )
  }
}

export default Login;