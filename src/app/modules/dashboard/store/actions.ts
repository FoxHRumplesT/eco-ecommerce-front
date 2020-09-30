import { createAction, props } from '@ngrx/store';

import { Product, Basket, Client, Bill, UpdateStock } from '../dashboard.entities';
import { NgxNotificationStatusMsg } from 'ngx-notification-msg';

export const notificationAction = createAction('[Dashboard] notification',
  props<{ msg: string, status: NgxNotificationStatusMsg }>()
);

export const fetchProductsAction = createAction('[Dashboard] fetch products', props<{ page: number, keyword: string }>());
export const fetchProductsSuccessAction = createAction('[Dashboard] fetch products success', props<{ response: any }>());
export const fetchProductsInStockAction = createAction('[Dashboard] fetch products in stock', props<{ page: number, keyword: string }>());
export const fetchProductsInStockSuccessAction = createAction('[Dashboard] fetch products in stock success', props<{ response: any }>());
export const fetchTaxesAction = createAction('[Dashboard] fetch dashboard');
export const fetchTaxesSuccessAction = createAction('[Dashboard] fetch taxes success', props<{ response: any }>());
export const addProductToBasketAction = createAction('[Dashboard] add product to basket', props<{ product: Product }>());
export const updateProductFromBasketAction = createAction('[Dashboard] update product from basket', props<{ product: Product }>());
export const removeProductToBasketAction = createAction('[Dashboard] remove product to basket', props<{ product: Product }>());
export const resetBasketAction = createAction('[Dashboard] reset basket');

export const calculateTaxesInBasketAction = createAction('[Dashboard] calculate taxes in basket', props<{ basket: Basket }>());
export const calculateTaxesInBasketSuccessAction = createAction('[Dashboard] calculate taxes success', props<{ response: any }>());
export const createProductAction = createAction('[Dashboard] create product',
  props<{ product: Product, formDataToUploadImage: FormData }>()
);
export const createProductSuccessAction = createAction('[Dashboard] create product success', props<{ response: any }>());
export const createProductErrorAction = createAction('[Dashboard] create product error');
export const updateProductAction = createAction('[Dashboard] update product',
  props<{ product: Product, formDataToUploadImage: FormData }>()
);
export const updateProductSuccessAction = createAction('[Dashboard] update product success', props<{ response: any }>());
export const updateProductErrorAction = createAction('[Dashboard] update product error');
export const deleteProductAction = createAction('[Dashboard] delete product', props<{ product: Product }>());
export const deleteProductSuccessAction = createAction('[Dashboard] delete product success', props<{ response: any }>());
export const deleteProductErrorAction = createAction('[Dashboard] delete product error');
export const loadImageAction = createAction('[Dashboard] load image', props<{ image: FormData }>());
export const fetchIDNumberAction = createAction('[Dashboard] fetch ID number', props<{ idNumber: number }>());
export const fetchIDNumberSuccessAction = createAction('[Dashboard] fetch ID number success', props<{ response: any }>());

export const fetchBillsAction = createAction('[Dashboard] fetch bills', props<{ page: number }>());
export const fetchBillsSuccessAction = createAction('[Dashboard] fetch bills success', props<{ response: any }>());
export const fetchBillsErrorAction = createAction('[Dashboard] fetch bills error');
export const createBillAction = createAction('[Dashboard] create bill', props<{ bill: Bill }>());
export const createBillSuccessAction = createAction('[Dashboard] create bill success', props<{ response: any }>());
export const createBillErrorAction = createAction('[Dashboard] create bill error');
export const fetchBillsByIdAction = createAction('[Dashboard] fetch bills by id', props<{ id: number}>());
export const fetchBillsByIdSuccessAction = createAction('[Dashboard] fetch bill by id success', props<{ response: any }>());
export const fetchBillsByIdErrorAction = createAction('[Dashboard] fetch bill by id error', props<{ response: any }>());
export const updateBillAction = createAction('[Dashboard] update bill', props<{ bill: Bill }>());
export const updateBillSuccessAction = createAction('[Dashboard] update bill success', props<{ response: any }>());
export const updateBillErrorAction = createAction('[Dashboard] update bill error');
export const deleteBillAction = createAction('[Dashboard] delete bill', props<{ bill: Bill }>());
export const deleteBillSuccessAction = createAction('[Dashboard] delete bill success', props<{ response: any }>());
export const deleteBillErrorAction = createAction('[Dashboard] delete bill error');
export const updateStockProductAction = createAction('[Dashboard] Update stock product', props<{ payload: UpdateStock }>());
export const fetchReportTypesAction = createAction('[Dashboard] Fetch report types');
export const fetchReportTypesSuccessAction = createAction('[Dashboard] Fetch report types success', props<{ response: any }>());
export const fetchReportTypesErrorAction = createAction('[Dashboard] Fetch report types error');
export const generateDatesReportAction = createAction('[Dashboard] Generate dates report', props<{ start: string, end: string }>());
export const generateDatesReportSuccessAction = createAction('[Dashboard] Generate dates report success', props<{ response: any }>());
export const generateDatesReportErrorAction = createAction('[Dashboard] Generate dates report error');
export const generateTextReportAction = createAction('[Dashboard] Generate text report', props<{ text: string }>());
export const generateTextReportSuccessAction = createAction('[Dashboard] Generate text report success', props<{ response: any}>());
export const generateTextReportErrorAction = createAction('[Dashboard] Generate text report error');
