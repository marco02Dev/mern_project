import { Dispatch } from "@reduxjs/toolkit";
import { FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";

export type AllowedServices = 'login' | 'sign-up' | 'send-email' | 'logout';

export type FormService = (
    event: FormEvent<HTMLFormElement>, 
    dispatch?: Dispatch,
    navigate?: NavigateFunction
) => Promise<void>



export type Service = (
    event?: FormEvent<HTMLFormElement> | null, 
    dispatch?: Dispatch,
    navigate?: NavigateFunction
) => Promise<void>
