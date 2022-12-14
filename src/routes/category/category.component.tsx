import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import {
    selectCategoriesIsLoading,
    selectCategoriesMap,
} from '../../store/categories/categories.selector';
import Footer from '../footer/footer.component';
import { CategoryContainer, Title } from './category.styles';

type categoryRouteParams = {
    category: string;
};

const Category = () => {
    const { category } = useParams<
        keyof categoryRouteParams
    >() as categoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category}</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                    {products &&
                        products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </CategoryContainer>
            )}
            <Footer />
        </Fragment>
    );
};

export default Category;
