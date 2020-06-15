import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './state';

const stateSelector = createFeatureSelector<State>('dash');

export const uiSelector = createSelector(stateSelector, state => state.ui);
export const productsSelector = createSelector(stateSelector, state => state.data.products);
export const taxesSelector = createSelector(stateSelector, state => state.data.taxes);
