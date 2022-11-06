import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setCategories } from '../../store/categories/categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firbase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments();
            console.log(categoriesArray);
            dispatch(setCategories(categoriesArray));
        };
        getCategoriesMap();
    }, [dispatch]); // dispatch will never change (run only once)

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
