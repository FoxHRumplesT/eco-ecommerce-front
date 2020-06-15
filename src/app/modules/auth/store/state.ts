export const productFeatureName = 'product';

export interface UIState {
  isLoadingLogin: boolean;
}

export interface DataState {
}
export interface State {
  ui: UIState;
  data: DataState;
}
