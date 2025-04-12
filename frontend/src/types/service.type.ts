import { Dispatch } from "@reduxjs/toolkit";
import { FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";

export type AllowedServices = 'login' | 'sign-up' | 'send-email' | 'logout';
export type Service = (
    event: FormEvent<HTMLFormElement>, 
    dispatch?: Dispatch,
    navigate?: NavigateFunction
) => Promise<void>
