import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import { CategoryList } from './category';
import { SubCategoryList } from './subCategory';

const config = {
  key: 'primary',
  storage: AsyncStorage,
};

const state = {
  CategoryList,
  SubCategoryList,
};

export default persistCombineReducers(config, state);
