import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { User } from "../../types/user.types";
import { fetchPurchasedProducts } from "../../store/slices/purchased-products.slice";
import { LoginState } from "../../store/slices/login.slice";

export const usePurchasedProducts = (shouldFetch: boolean = true) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn, user }: LoginState = useSelector((state: RootState) => state.login);
  const _id: string = (user as User)?._id ?? "";

  const productsPurchased = useSelector((state: RootState) => state.purchasedProducts.products);

  useEffect(() => {
    if (isLoggedIn && _id && shouldFetch) {
      dispatch(fetchPurchasedProducts(_id));
    }
  }, [isLoggedIn, _id, shouldFetch, dispatch]);

  return { productsPurchased, isLoggedIn, _id };
};
