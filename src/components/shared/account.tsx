import * as React from "react"
import {
  AtSign,
  ChevronDown,
  FileDigit,
  Smile,
  Unplug,
  Users,
} from "lucide-react"

import API from "@src/api/axios-instance"
import { cn } from "@src/lib/utils"
import { Button } from "@components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"

const user = API.userInfo

export function Account() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-x-2" asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex-none text-muted-foreground text-base",
            isOpen ? "bg-accent" : ""
          )}>
          <Smile size={20} strokeWidth={2.5} />
          <span className="hidden sm:block">{user?.user_nm}</span>
          <ChevronDown size={14} strokeWidth={3} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-muted-foreground">
          사용자 정보
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-4">
          <FileDigit size={16} />
          <span>아이디</span>
          <DropdownMenuShortcut>{user?.user_id}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-4">
          <AtSign size={16} />
          <span>이메일</span>
          <DropdownMenuShortcut>{user?.user_email}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-4">
          <Users size={16} />
          <span>팀</span>
          <DropdownMenuShortcut>{user?.team_nm}</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-4">
          <Unplug size={16} />
          <span className="font-bold">로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
