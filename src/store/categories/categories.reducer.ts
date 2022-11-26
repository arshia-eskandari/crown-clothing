import { Category } from './categories.types';
import {
    fecthCategoriesFailed,
    fecthCategoriesStart,
    fecthCategoriesSuccess,
} from './categories.action';
import { AnyAction } from 'redux';

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (
    state = INITIAL_STATE,
    action: AnyAction
) => {
    if (fecthCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (fecthCategoriesSuccess.match(action)) {
        return {
            ...state,
            categories: action.payload,
            isLoading: false,
        };
    }

    if (fecthCategoriesFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false,
        };
    }

    return state;
};
