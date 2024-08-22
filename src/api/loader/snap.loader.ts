import { SnapFilterOptionsSuccessData, SnapsSuccessData } from "@interface"
import { API, API_ENDPOINTS } from "@remote"
import {
  /* ActionFunctionArgs, */ ActionFunctionArgs,
  defer,
} from "react-router-dom"

export const snapModule = {
  // 스냅 목록 가져오기
  getSnaps: () =>
    API.get<SnapsSuccessData>(`${API_ENDPOINTS.SNAPS}`).then((res) => {
      return res.data
    }),
  // 필터 옵션 가져오기
  getFilterOptions: () =>
    API.get<SnapFilterOptionsSuccessData>(`${API_ENDPOINTS.FILTER}`).then(
      (res) => {
        return res.data
      }
    ),
}

// 메인 로더
export async function snapLoader({
  params,
}: ActionFunctionArgs): Promise<unknown> {
  try {
    // throw new Response('Not Found', { status: 404 })

    console.log("snapLoader", params)

    return defer({
      data: await snapModule.getSnaps(),
    })
  } catch (_) {
    return defer({
      data: [],
    })
  }
}
