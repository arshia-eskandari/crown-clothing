import {CATEGORIES_ACTION_TYPES} from './categories.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCategories = categoriesArr =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArr);