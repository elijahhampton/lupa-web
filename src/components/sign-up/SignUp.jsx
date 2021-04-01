import React from "react";
import ContainedButton from "../contained-button/ContainedButton";
import FormInput from "../form-input/FormInput";

import firebase from '../../firebase/firebase';

import "./styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleOnSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password != confirmPassword) {
        alert("Password and confirmed password don't match");
        return;
    }

    try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);

        this.setState({
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
    } catch(error) {
        console.log(error)
    }
  }

  handleOnChange = event => {
      const {name, value} = event.target;

      this.setState({ [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleOnSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleOnChange}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleOnChange}
            label="email"
            required
         />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleOnChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleOnChange}
            label="Password"
            required
          />

          <ContainedButton type='submit'>
              SIGN UP
          </ContainedButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
