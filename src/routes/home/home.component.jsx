import Directory from '../../components/directory/directory.component';
import { CATEGORIES } from '../../config';
import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';

const Home = () => {
    return (
        <Fragment>
            <Outlet />
            <Directory categories={CATEGORIES} />
        </Fragment>
    );
};

export default Home;
