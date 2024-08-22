import * as React from "react"
import { useLocalStore } from "@store"
import { QueryClient, QueryClientProvider } from "react-query"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom"

import { rootLoader } from "@api/loader"
import { ErrorBoundary, Layout } from "@components/shared"
import { GridView } from "@components/snaps/grid"
import { ListView } from "@components/snaps/list"
import SnapsPage from "@components/snaps/page"
import { TooltipProvider } from "@components/ui"

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
