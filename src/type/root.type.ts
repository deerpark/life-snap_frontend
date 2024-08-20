import { JwtPayload } from "@type/index"

export type Theme = "light" | "dark"

export type ViewType = "/snaps/grid" | "/snaps/list"

export interface FacetedOption {
  label: string
  value: string | number
  icon?: React.ComponentType<{ className?: string }>
}

export interface RootSuccessData {
  data: {
    user: JwtPayload | null
  }
}
