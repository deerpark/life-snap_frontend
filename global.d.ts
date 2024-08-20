import "@total-typescript/ts-reset"

declare global {
  function gtag(
    eventName: string,
    eventAction: string,
    options: {
      event_category: string
      event_label: string
      event_value?: number
      non_interaction?: boolean
    }
  ): void
  function gtag(
    configName: "config",
    eventAction: string,
    options: {
      page_path?: string
      user_id?: string
      debug_mode?: true
    }
  ): void
  function gtag(
    configName: "set",
    userProperties: "user_properties",
    options: {
      team_name?: string
    }
  ): void
}

interface CustomColumnMeta {
  enableFaceted?: boolean
}

declare module "@tanstack/react-table" {
  interface ColumnMeta extends CustomColumnMeta {}
}

export {}
