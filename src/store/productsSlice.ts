import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

const STORAGE_KEY = 'products';

const fetchProductsFromStorage = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveProductsToStorage = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  sort: 'alphabetical' | 'count';
};

const initialState: ProductsState = {
  products: fetchProductsFromStorage(),
  selectedProduct: null,
  sort: 'alphabetical',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<'alphabetical' | 'count'>) => {
      state.sort = action.payload;
      state.products = [...state.products].sort((a, b) => {
        if (state.sort === 'alphabetical') return a.name.localeCompare(b.name);
        return a.count - b.count;
      });
      saveProductsToStorage(state.products);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      saveProductsToStorage(state.products);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.products[idx] = action.payload;
      if (state.selectedProduct?.id === action.payload.id) state.selectedProduct = action.payload;
      saveProductsToStorage(state.products);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      saveProductsToStorage(state.products);
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setSort, setSelectedProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
