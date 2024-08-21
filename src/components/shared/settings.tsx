import useLocalStore from "@src/stores/local.store"

import { Separator } from "../ui/separator"
import { Account } from "./account"
import { ModeToggle } from "./mode-toggle"
import { ViewToggle } from "./view-toggle"

export function Settings() {
  const { settings } = useLocalStore(({ toggle: { settings } }) => ({
    settings,
  }))
  return settings ? (
    <div className="flex-none flex items-center gap-x-6">
      <ViewToggle />
      <ModeToggle />
      <Separator
        orientation="vertical"
        className="flex-1 lg:flex-none lg:ml-2 lg:-mr-2 h-4 w-full lg:w-px bg-transparent lg:bg-border/50"
      />
      <Account />
    </div>
  ) : null
}
