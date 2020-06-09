export const productFeatureName = 'product';

export interface UIState {
  isLoadingLogin: boolean;
}

export interface DataState {
  products: any;
}
export interface State {
  ui: UIState;
  data: DataState;
}
