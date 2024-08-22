import * as React from "react"
import * as ReactDOM from "react-dom/client"

import App from "./app"

import "./styles/globals.css"

import { TailwindIndicator } from "@components/shared"
import { Toaster } from "@components/ui"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
    <TailwindIndicator />
  </React.StrictMode>
)
