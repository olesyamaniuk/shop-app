// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { Product } from '../types';

// const API_URL = 'http://localhost:3001/products';

// export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
//   const res = await axios.get<Product[]>(API_URL);
//   return res.data;
// });

// export const fetchProductById = createAsyncThunk('products/fetchById', async (id: number) => {
//   const res = await axios.get<Product>(`${API_URL}/${id}`);
//   return res.data;
// });

// export const addProduct = createAsyncThunk('products/add', async (data: Partial<Product>) => {
//   const res = await axios.post<Product>(API_URL, data);
//   return res.data;
// });

// export const updateProduct = createAsyncThunk('products/update', async (data: Product) => {
//   const res = await axios.put<Product>(`${API_URL}/${data.id}`, data);
//   return res.data;
// });

// export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
//   await axios.delete(`${API_URL}/${id}`);
//   return id;
// });

// type ProductsState = {
//   products: Product[];
//   selectedProduct: Product | null;
//   loading: boolean;
//   sort: 'alphabetical' | 'count';
// };

// const initialState: ProductsState = {
//   products: [],
//   selectedProduct: null,
//   loading: false,
//   sort: 'alphabetical',
// };

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setSort: (state, action: PayloadAction<'alphabetical' | 'count'>) => {
//       state.sort = action.payload;
//       state.products = [...state.products].sort((a, b) => {
//         if (state.sort === 'alphabetical') {
//           return a.name.localeCompare(b.name);
//         }
//         return a.count - b.count;
//       });
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = true;
//         state.selectedProduct = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedProduct = action.payload;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.products.push(action.payload);
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const idx = state.products.findIndex((p) => p.id === action.payload.id);
//         if (idx !== -1) state.products[idx] = action.payload;
//         if (state.selectedProduct?.id === action.payload.id) {
//           state.selectedProduct = action.payload;
//         }
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.products = state.products.filter((p) => p.id !== action.payload);
//       });
//   },
// });

// export const { setSort } = productsSlice.actions;
// export default productsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types'

const STORAGE_KEY = 'products'

const fetchProductsFromStorage = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveProductsToStorage = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

type ProductsState = {
  products: Product[]
  selectedProduct: Product | null
  sort: 'alphabetical' | 'count'
}

const initialState: ProductsState = {
  products: fetchProductsFromStorage(),
  selectedProduct: null,
  sort: 'alphabetical'
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<'alphabetical' | 'count'>) => {
      state.sort = action.payload
      state.products = [...state.products].sort((a, b) => {
        if (state.sort === 'alphabetical') return a.name.localeCompare(b.name)
        return a.count - b.count
      })
      saveProductsToStorage(state.products)
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
      saveProductsToStorage(state.products)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.products.findIndex(p => p.id === action.payload.id)
      if (idx !== -1) state.products[idx] = action.payload
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload
      }
      saveProductsToStorage(state.products)
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload)
      saveProductsToStorage(state.products)
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload
    }
  }
})

export const { addProduct, updateProduct, deleteProduct, setSort, setSelectedProduct } = productsSlice.actions
export default productsSlice.reducer
