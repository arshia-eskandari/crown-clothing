import ProductCard from '../product-card/product-card.component';
import {
    CategoryPreviewContainer,
    Preview,
    TitleH2,
    StyledLink,
} from './category-preview.styles';
import { CategoryItem } from '../../store/categories/categories.types';

export type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
};

const CategoryPreview = (props: CategoryPreviewProps) => {
    const { title, products } = props;
    return (
        <CategoryPreviewContainer>
            <TitleH2>
                <StyledLink to={title}>{title.toUpperCase()}</StyledLink>
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
