import { FacetedOption } from "@interface"

import { GRADE } from "@lib/enum"

export interface SnapType {
  snap_id: number
  reg_dtm: string // "2024-08-01T07:58:41.000Z"
  reg_id: string
  category_code: number
  customer_id: string // "5708679"
  tpo: string
  image_date: string
  birth_year: number
  age?: string
  grade: GRADE // "VVIP"
  job: string // "전업주부"
  city: string // "경기"
  file_name: string // "240719_5708679_3.jpg"
  options: string // "상의,하의,신발,가방"
  option_values: string // "미쏘,아라모드,크록스,핸드메이드"
}

export type SnapFilterFacetedOptions = {
  jobs: FacetedOption[]
  grades: FacetedOption[]
  ages: FacetedOption[]
}

/* {
  "snap_id": 95,
  "reg_dtm": "2024-08-13T08:17:41.000Z",
  "reg_id": "test",
  "category_code": 1,
  "customer_id": "3615937",
  "tpo": "마트",
  "age": "56",
  "birth_year": 1961,
  "birth_year": 1961,
  "grade": "VVIP",
  "job": "기타",
  "city": "서울",
  "file_name": "240728_3615937_3.jpg",
  "options": "상의,하의,신발,가방",
  "option_values": "커터앤벅,르까프,마운티아,휠라"
} */
