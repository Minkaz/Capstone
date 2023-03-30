import {Routes, Route} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {setCategories} from "../../store/categories/category.action";

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments('categories');
             dispatch(setCategories(categoriesArray));
        }

        getCategoriesMap();
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview></CategoriesPreview>}></Route>
            <Route path={":category"} element={<Category></Category>}></Route>
        </Routes>
    )
}

export default Shop;