import { Dispatch } from "@reduxjs/toolkit"
import { FormEvent } from "react"

export type AllowedServices = 'login' | 'sign-up' | 'send-email' | 'logout';
export type Service = (event: FormEvent<HTMLFormElement>, dispatch?: Dispatch) => Promise<void>
