import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SingUpForm from "../../components/sign-up-form/sing-up-form.component";
const SignIn = () => {
    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sing in page</h1>
            <button onClick={ logGoogleUser }>
                Sign in with Google popup
            </button>
            <SingUpForm></SingUpForm>
        </div>
    )
}

export default SignIn;