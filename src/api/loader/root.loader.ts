import { /* ActionFunctionArgs, */ defer } from "react-router-dom"

import API from "@api/axios-instance"

const user = API.userInfo

// 메인 로더
export async function rootLoader(/* { params }: ActionFunctionArgs */): Promise<unknown> {
  try {
    // throw new Response('Not Found', { status: 404 })

    return defer({
      data: {
        user,
      },
    })
  } catch (_) {
    return defer({
      data: {
        user,
      },
    })
  }
}
