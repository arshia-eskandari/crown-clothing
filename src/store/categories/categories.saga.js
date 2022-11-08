import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firbase.utils';
import {
    fecthCategoriesFailed,
    fecthCategoriesSuccess,
} from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

export function* fetchCatgeoriesAsync() {
    try {
        const categoriesArr = yield call(getCategoriesAndDocuments);
        yield put(fecthCategoriesSuccess(categoriesArr))
    } catch (err) {
        yield put(fecthCategoriesFailed(err));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCatgeoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}