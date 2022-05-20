import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Auth from '../utils/Auth';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.handleRegister(email, password)
      .catch((e) => { this.setState({ message: e.message }) })
  }

  render() {
    return (
      <div className="sign-form">
        <h3 className="sign-form__title">Регистрация</h3>
        <form className="form sign-form__form" onSubmit={this.handleSubmit}>
          <input
            className="sign-form__input"
            id="email"
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
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="text"
            name="password"
            placeholder="Пароль" />
          <span className="error"></span>
          <button type="submit" className="submit-button sign-form__button" >Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className="sign-form__subtitle">Уже зарегистрированы? Войти</Link>
      </div>
    )
  }
}

export default Register;