import * as React from "react"
import { fetchSnaps, fetchSnapsKey } from "@hook"
import { useRootStore, useSessionStore } from "@store"
import { useInfiniteQuery, useQueryClient } from "react-query"

import { KEY } from "@lib/enum"

export const useInfiniteScroll = () => {
  const { params } = useSessionStore(({ params }) => ({ params }))
  const queryClient = useQueryClient()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery(
    [fetchSnapsKey, params], // params를 포함시켜 키를 유동적으로 생성
    ({ pageParam = 1 }) =>
      fetchSnaps({
        ...params,
        page: pageParam,
        seed: JSON.parse(sessionStorage.getItem(KEY.SEED) || "null") as
          | string
          | number
          | null
          | undefined,
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.hasMore) {
          return pages.length + 1 // 다음 페이지 번호 반환
        } else {
          return undefined // 더 이상 페이지가 없으면 undefined 반환
        }
      },
      onSuccess: (data) => {
        useRootStore.setState(() => ({
          snaps: data.pages.flatMap((page) => page.snaps),
        }))
        const lastPage = data.pages[data.pages.length - 1]
        if (lastPage) {
          sessionStorage.setItem(KEY.SEED, `${lastPage.seed}`)
        }
      },
      keepPreviousData: true, // 새로운 쿼리 페칭 전에 기존 데이터를 유지
    }
  )
  const observerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    // params가 변경될 때 쿼리를 무효화하고 첫 페이지부터 다시 로드
    queryClient.invalidateQueries([fetchSnapsKey], { exact: true })
  }, [params, queryClient])

  React.useEffect(() => {
    const currentObserverRef = observerRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      {
        root: document.getElementById("snaps-masonry") || null,
        rootMargin: "0px",
        threshold: 0.8,
      }
    )

    if (currentObserverRef) {
      observer.observe(currentObserverRef)
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [fetchNextPage, hasNextPage])

  return {
    observerRef,
    data,
    isFetchingNextPage,
    status,
    error,
    hasNextPage, // 필요에 따라 추가 반환값
  }
}
