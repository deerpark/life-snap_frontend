import * as React from "react"
import { Moon, Sun } from "lucide-react"

import useLocalStore from "@stores/local.store"
import { Separator } from "@components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Tip } from "@components/ui/tooltip"

export const ModeToggle: React.FC = () => {
  const { theme, setTheme } = useLocalStore()

  return (
    <Tip
      content={
        <div className="flex items-center gap-x-2">
          <span>라이트 모드</span>
          <Separator className="w-px h-2 opacity-50" />
          <span>다크 모드</span>
        </div>
      }>
      <Tabs
        defaultValue={theme}
        onValueChange={setTheme as (value: string) => void}>
        <TabsList className="h-auto">
          <TabsTrigger value="light" className="relative">
            <Sun size={20} strokeWidth={2.5} />
          </TabsTrigger>
          <TabsTrigger value="dark" className="relative">
            <Moon size={20} strokeWidth={2.5} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Tip>
  )
}
