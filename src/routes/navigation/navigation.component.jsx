import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext  } from 'react';
import { ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const signOutHandler = async() => {
        const resp = await signOutUser();
        setCurrentUser(null);
    }

    return (
        <Fragment>
            <div className={'navigation'}>
                <Link className={'logo-container'} to={'/'}>
                   <CrwnLogo className={'logo'}></CrwnLogo>
                </Link>
                <div className={'nav-links-container'}>
                    <Link className={'nav-link'} to={'/shop'}>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span onClick={signOutHandler} className='nav-link'> SIGN OUT </span>
                        ) : (
                            <Link className={'nav-link'} to={'/auth'}>
                                SIGN IN
                            </Link>
                        )
                    }

                </div>
            </div>
            <Outlet></Outlet>
        </Fragment>
    )
}

export default Navigation;