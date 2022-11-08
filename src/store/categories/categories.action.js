import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCategories = categoriesArr =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArr);

export const fecthCategoriesStart = () =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fecthCategoriesSuccess = categoriesArr =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categoriesArr
    );

export const fecthCategoriesFailed = error =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
