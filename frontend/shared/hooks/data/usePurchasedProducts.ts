import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@shared/store";
import { fetchPurchasedProducts } from "@shared/store/slices/purchased-products.slice";
import { UseAuth, useAuth } from "../auth/useAuth";

export const usePurchasedProducts = (shouldFetch: boolean = true) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, userData }: UseAuth = useAuth();

  const productsPurchased = useSelector(
    (state: RootState) => state.purchasedProducts.products
  );

  useEffect(() => {
    if (isLoggedIn && userData._id && shouldFetch) {
      dispatch(fetchPurchasedProducts(userData._id));
    }
  }, [isLoggedIn, userData._id, shouldFetch, dispatch]);

  return { productsPurchased, isLoggedIn, _id: userData._id };
};
