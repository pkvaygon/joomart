"use client";
import React from 'react'
import {NextUIProvider} from "@nextui-org/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useRouter } from 'next/navigation';
import store, { persistor } from '@/storage/store';
export default function Providers({children}) {
const router = useRouter()
  return (
    <NextUIProvider navigate={router.push}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  </NextUIProvider>
  )
}
