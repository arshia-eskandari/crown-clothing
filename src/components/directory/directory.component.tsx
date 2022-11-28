import CategoryItem from '../category-item/category-item.component';
import { DirectoryContainer } from './directory.styles';
import { CategoriesType } from '../../routes/home/home.component'; 

export type DirectoryProps = {
    categories: CategoriesType[];
}

const Directory = (props: DirectoryProps) => {
    const categories = props.categories;
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <CategoryItem category={category} key={category.id} />
            ))}
        </DirectoryContainer>
    );
};

export default Directory;
