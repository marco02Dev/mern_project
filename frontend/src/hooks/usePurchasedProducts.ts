// hooks/usePurchasedProducts.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { User } from "../types/user.types";
import { fetchPurchasedProducts } from "../store/slices/purchased-products.slice";

export const usePurchasedProducts = (shouldFetch: boolean = true) => {
  const dispatch = useDispatch<AppDispatch>();

  const login = useSelector((state: RootState) => state.login);
  const { isLoggedIn } = login;
  const _id: string = (login?.user as User)?._id ?? "";

  const productsPurchased = useSelector(
    (state: RootState) => state.purchasedProducts.products
  );

  useEffect(() => {
    if (isLoggedIn && _id && shouldFetch) {
      dispatch(fetchPurchasedProducts(_id));
    }
  }, [isLoggedIn, _id, shouldFetch, dispatch]);
  console.log(productsPurchased)
  return { productsPurchased, isLoggedIn, _id };
};
