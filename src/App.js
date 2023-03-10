import Home from './routes/home/home.component';
import { Routes, Route} from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from "./routes/authentication/authentication.component";
const App = () => {
    const Shop = () => {
        return <h1>Shop page</h1>;
    }

    return  (
        <Routes>
            <Route path={'/'} element={<Navigation />}>
                <Route index element={<Home />}></Route>
                <Route path={'shop'} element={<Shop />}></Route>
                <Route path={'auth'} element={<Authentication />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
