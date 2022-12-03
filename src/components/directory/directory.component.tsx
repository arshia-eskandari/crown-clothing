import CategoryItem from '../category-item/category-item.component';
import { DirectoryContainer } from './directory.styles';
import Contact from '../contact/contact.component';
import { CategoriesType } from '../../routes/home/home.component';
import { Fragment } from 'react';

export type DirectoryProps = {
    categories: CategoriesType[];
};

const Directory = (props: DirectoryProps) => {
    const categories = props.categories;
    return (
        <Fragment>
            <h2 style={{ textAlign: 'center' }}>Crown Clothing</h2>
            <DirectoryContainer>
                {categories.map(category => (
                    <CategoryItem category={category} key={category.id} />
                ))}
            </DirectoryContainer>
            <Contact />
        </Fragment>
    );
};

export default Directory;
