import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SingUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('Error creating user: ', e.message);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display name</label>
                <input required type={'text'} onChange={handleChange} name={"displayName"} value={displayName}></input>

                <label>Email</label>
                <input required type={'email'} onChange={handleChange} name={"email"} value={email}></input>

                <label>Password</label>
                <input required type={'password'} onChange={handleChange} name={"password"} value={password}></input>

                <label>Confirm Password</label>
                <input required type={'password'} onChange={handleChange} name={"confirmPassword"}
                       value={confirmPassword}></input>

                <button type={'submit'}>Sign up</button>

            </form>
        </div>
    )
}

export default SingUpForm;