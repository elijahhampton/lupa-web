import React from 'react';
import ContainedButton from '../../components/contained-button/ContainedButton';
import FormInput from '../form-input/FormInput';

import firebase from '../../firebase/firebase';
import { setCurrentUser } from '../../redux/user/user.actions';

import { connect } from 'react-redux';

import './styles.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    handleOnSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;
        const { setCurrentUser } = this.props;


        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const userUUID = userCredential.user.uid;
                setCurrentUser(userUUID);
            })
            .catch(error => {
                alert('Oops! Looks like you are using an invalid username or password.  Please try again.')
                setCurrentUser(null)
            })

            this.setState({ email: '', password: '' })

        } catch(error) {
            console.log(error);
        }
    }

    handleOnChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>Welcome back</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleOnSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        label="email"
                        value={this.state.email} 
                        onChange={this.handleOnChange}
                        required />
         
                    <FormInput 
                        name='password' 
                        type='password' 
                        label="password"
                        value={this.state.password} 
                        onChange={this.handleOnChange}
                        required />

                    <div className='buttons'>
                    <ContainedButton type='submit'>
                       Sign in
                   </ContainedButton>
                    </div>

                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
  })

export default connect(null, mapDispatchToProps)(SignIn);