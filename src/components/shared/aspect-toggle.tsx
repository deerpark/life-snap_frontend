import * as React from "react"

import useLocalStore from "@stores/local.store"
import { Label, Switch, Tip } from "@components/ui"

export const AspectToggle: React.FC = () => {
  const { isFixedAspect, setFixedAspect } = useLocalStore(
    ({ isFixedAspect, setFixedAspect }) => ({ isFixedAspect, setFixedAspect })
  )

  return (
    <Tip content="격자 비율">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Switch
          id="is-fixed-aspect"
          checked={isFixedAspect}
          onCheckedChange={setFixedAspect}
        />
        <Label htmlFor="is-fixed-aspect">격자 비율 고정</Label>
      </div>
    </Tip>
  )
}
