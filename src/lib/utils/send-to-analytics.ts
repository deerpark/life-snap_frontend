import { KEY } from "@lib/enum"

/**
 * GA 이벤트 송신 함수
 * @param eventAction 이벤트 액션 ex) 'click' | 'scroll'
 * @param eventCategory 이벤트 카테고리 ex) 프로그램 비교
 * @param eventLabel 이벤트 라벨 ex) 프로그램 검색
 */
export const sendToAnalytics = (
  /** 이벤트 액션 ex) 'click' | 'scroll' */
  eventAction: string,
  /** 이벤트 카테고리 ex) 프로그램 비교 */
  eventCategory: string,
  /** 이벤트 라벨 ex) 프로그램 검색 */
  eventLabel: string,
  /** 이벤트 값 */
  eventValue?: number,
  /** 이탈률에 영향을 미치는지 여부 */
  nonInteraction?: boolean
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      event_value: eventValue,
      non_interaction: nonInteraction,
    })
  }
}

export const sendToAnalyticsPageView = (path: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", KEY.GTM_ID, {
      page_path: path,
    })
  }
}

export const setOnceAnalyticsUserId = (user_id: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", KEY.GA_ID, {
      user_id,
    })
    window.gtag("set", "user_properties", {
      team_name: user_id,
    })
  }
}
