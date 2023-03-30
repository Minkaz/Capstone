import Home from './routes/home/home.component';
import { Routes, Route} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "./utils/firebase/firebase.utils";
import {setCurrentUser} from "./store/user/user.action";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
    }, [dispatch])

    return  (
        <Routes>
            <Route path={'/'} element={<Navigation />}>
                <Route index element={<Home />}></Route>
                <Route path={'shop/*'} element={<Shop />}></Route>
                <Route path={'auth'} element={<Authentication />}></Route>
                <Route path={'checkout'} element={<CheckOut />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
