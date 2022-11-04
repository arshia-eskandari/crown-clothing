import {
    CategoryItemContainer,
    BackgroundImage,
    Body,
} from './category-item.styles';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ category }) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <CategoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
            <Body>
                <h2>{title}</h2>
                <p>Show Now</p>
            </Body>
        </CategoryItemContainer>
    );
};

export default CategoryItem;
