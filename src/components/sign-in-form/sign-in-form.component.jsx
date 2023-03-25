import {useState} from "react";
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";

const defaultFormFields = {
    password: '',
    email: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (e) {
            switch (e.code) {
                case "auth/wrong-password":
                    alert('Incorrect password or email')
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email')
                    break;
                default:
                    console.log(e);
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <SignInContainer >
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type={'email'} onChange={handleChange} name={"email"} value={email}/>
                <FormInput label='Password' required type={'password'} onChange={handleChange} name={"password"}
                           value={password}/>

                <ButtonsContainer>
                    <Button type={'submit'}>Sign In</Button>
                    <Button type={'button'} buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign In</Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    )
}

export default SignInForm;