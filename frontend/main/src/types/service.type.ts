import { Dispatch } from "@reduxjs/toolkit";
import { FormEvent, Dispatch as DispatchReactState, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export type AllowedServices = 'login' | 'sign-up' | 'send-email' | 'logout' | 'create-course' | "update-course";

export type FormService = (
    event: FormEvent<HTMLFormElement>, 
    dispatch?: Dispatch,
    navigate?: NavigateFunction,
    setErrorMessage?: DispatchReactState<SetStateAction<string | undefined>>
) => Promise<void>

export type SendEmailService = (
    event: FormEvent<HTMLFormElement>, 
    setErrorMessage: DispatchReactState<SetStateAction<string | undefined>>,
    setMessageSent: DispatchReactState<SetStateAction< boolean | undefined>>
) => Promise<void>

export type Service = (args: {
    dispatch?: Dispatch;
    navigate?: NavigateFunction;
  }) => Promise<void>;