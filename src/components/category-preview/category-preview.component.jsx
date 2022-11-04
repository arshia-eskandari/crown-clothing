import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import {
    CategoryPreviewContainer,
    Preview,
    TitleH2,
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <TitleH2>
                <Link to={title}>{title.toUpperCase()}</Link>
            </TitleH2>
            <Preview>
                {products
                    .filter((_, idx) => idx < 4)
                    .map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;
