import * as React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom"

import { rootLoader } from "@api/loader"
import useLocalStore from "@stores/local.store"
import { TooltipProvider } from "@components/ui/tooltip"
import Layout from "@components/shared/layout"
import SnapsPage from "@components/snaps"

import ErrorBoundary from "./components/shared/error"
import { GridView } from "./components/snaps/grid"
import { ListView } from "./components/snaps/list"

const queryClient = new QueryClient()

const App: React.FC = () => {
  const { theme, viewType } = useLocalStore()

  const router = React.useMemo(() => {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route
          id="root"
          path="/"
          element={<Layout />}
          loader={rootLoader}
          errorElement={<ErrorBoundary />}>
          <Route index element={<Navigate to="/snaps" />} />
          <Route
            id="snaps"
            path="snaps"
            element={<SnapsPage />}
            errorElement={<ErrorBoundary />}>
            <Route index element={<Navigate to={viewType} />} />
            <Route
              id="grid"
              path="grid"
              element={<GridView />}
              errorElement={<ErrorBoundary />}
            />
            <Route
              id="list"
              path="list"
              element={<ListView />}
              errorElement={<ErrorBoundary />}
            />
          </Route>
        </Route>
      )
    )
  }, [viewType])

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
