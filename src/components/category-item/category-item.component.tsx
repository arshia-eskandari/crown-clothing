import {
    CategoryItemContainer,
    BackgroundImage,
    Body,
} from './category-item.styles';
import { useNavigate } from 'react-router-dom';
import { CategoriesType } from '../../routes/home/home.component';
import { FC } from 'react';

type CategoryItemProps = {
    category: CategoriesType;
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <CategoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Show Now</p>
            </Body>
        </CategoryItemContainer>
    );
};

export default CategoryItem;
