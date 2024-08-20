import { Snap } from "@src/type"

export const TITLE = "LIFE SNAP"

export const YEAR = new Date().getFullYear()

export const DATE_FORMAT = {
  /** yyyy. M. d */
  DATE_WITH_YEAR: "yyyy. M. d",
  /** M. d */
  DATE: "M. d",
  /** yyMMdd */
  DATE_TINY: "yyMMdd",
  /** yyyyMMdd */
  DATE_MINI: "yyyyMMdd",
  /** yyyy-MM-dd HH:mm */
  STANDARD: "yyyy-MM-dd HH:mm",
  /** HH:mm */
  TIME: "HH:mm",
} as const

export const GRADE_COLOR = {
  CARD: {
    일반: "shadow-grade-1/10",
    WELCOME: "shadow-grade-1/10",
    골드: "shadow-grade-2/10",
    GOLD: "shadow-grade-2/10",
    DIAMOND: "shadow-grade-3/10",
    VIP: "shadow-grade-4/10",
    VVIP: "shadow-grade-5/10",
    DEFAULT: "shadow-grade-3/10",
  },
  BADGE: {
    일반: "bg-grade-1/10 text-grade-1",
    WELCOME: "bg-grade-1/10 text-grade-1",
    골드: "bg-grade-2/10 text-grade-2",
    GOLD: "bg-grade-2/10 text-grade-2",
    DIAMOND: "bg-grade-3/10 text-grade-3",
    VIP: "bg-grade-4/10 text-grade-4",
    VVIP: "bg-grade-5/10 text-grade-5",
    DEFAULT: "bg-grade-3/10 text-grade-3",
  },
  OUTLINE: {
    일반: "border-grade-1/20",
    WELCOME: "border-grade-1/20",
    골드: "border-grade-2/20",
    GOLD: "border-grade-2/20",
    DIAMOND: "border-grade-3/20",
    VIP: "border-grade-4/20",
    VVIP: "border-grade-5/20",
    DEFAULT: "border-grade-3/20",
  },
} as const

export const DAY_NAME = ["일", "월", "화", "수", "목", "금", "토"]

export const PROPERTY_LABEL: Record<keyof Snap, string> = {
  snap_id: "아이디",
  reg_dtm: "등록일", // "2024-08-01T07:58:41.000Z"
  reg_id: "등록자",
  category_code: "카테고리 코드",
  customer_id: "고객 아이디", // "5708679"
  tpo: "TPO",
  image_date: "생성일",
  age: "나이",
  birth_year: "나이",
  grade: "등급", // "VVIP"
  job: "직업", // "전업주부"
  city: "거주지", // "경기"
  file_name: "파일명", // "240719_5708679_3.jpg"
  options: "옵션", // "상의,하의,신발,가방"
  option_values: "옵션 값", // "미쏘,아라모드,크록스,핸드메이드"
}

export const TODAY = new Date()

export const PAGE_SIZE = [10, 20, 30, 40, 50, 100, 200, 500]
