import { format } from "date-fns"
import { ko } from "date-fns/locale"

import { DATE_FORMAT } from "@lib/constants"

export function dateFormat(date: Date, formatStr?: string) {
  return format(date, formatStr || DATE_FORMAT.DATE_MINI, {
    locale: ko,
  })
}
