import * as React from "react"
import { Kanban, ListMinus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import useLocalStore from "@src/stores/local.store"
import { ViewType } from "@src/type"
import { Separator } from "@components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Tip } from "@components/ui/tooltip"

export const ViewToggle: React.FC = () => {
  const { pathname } = useLocation()
  const navigation = useNavigate()
  const handleValueChange = React.useCallback(
    (value: string) => {
      useLocalStore.setState(() => ({ viewType: value as ViewType }))
      navigation(value)
    },
    [navigation]
  )

  return (
    <Tip
      content={
        <div className="flex items-center gap-x-2">
          <span>그리드 뷰</span>
          <Separator className="w-px h-2 opacity-50" />
          <span>테이블 뷰</span>
        </div>
      }>
      <Tabs value={pathname} onValueChange={handleValueChange}>
        <TabsList className="h-auto">
          <TabsTrigger value="/snaps/grid">
            <Kanban size={20} />
          </TabsTrigger>
          <TabsTrigger value="/snaps/list">
            <ListMinus size={20} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Tip>
  )
}
