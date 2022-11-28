import Directory from '../../components/directory/directory.component';
import { CATEGORIES } from '../../config';
import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';

export type CategoriesType = {
    id: number;
    title: string;
    imageUrl: string;
    route: string;
};

const Home = () => {
    return (
        <Fragment>
            <Outlet />
            <Directory categories={CATEGORIES as CategoriesType[]} />
        </Fragment>
    );
};

export default Home;
