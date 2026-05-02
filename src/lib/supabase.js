// src/lib/supabase.js
// Initialize the Supabase client once and export it for the whole app to use.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'Supabase environment variables missing. Check that .env contains VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, and restart the dev server.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper: fetch all products, ordered by id
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id');
  if (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
  return data;
}

// Helper: update a single product
export async function updateProductInDb(productId, changes) {
  const { data, error } = await supabase
    .from('products')
    .update({ ...changes, updated_at: new Date().toISOString() })
    .eq('id', productId)
    .select()
    .single();
  if (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
  return data;
}

// Helper: subscribe to real-time changes on the products table.
// Returns a cleanup function to unsubscribe.
export function subscribeToProductChanges(onChange) {
  const channel = supabase
    .channel('products-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      (payload) => {
        onChange(payload);
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}