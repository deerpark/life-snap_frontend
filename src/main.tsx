import * as React from "react"
import * as ReactDOM from "react-dom/client"

import App from "./app"

import "./styles/globals.css"

import { Toaster } from "@components/ui/sonner"
import { TailwindIndicator } from "@components/shared/tailwind-indicator"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
    <TailwindIndicator />
  </React.StrictMode>
)
