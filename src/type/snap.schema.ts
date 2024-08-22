import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const snapSchema = z.object({
  snap_id: z.number(), // number
  reg_dtm: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      "Invalid date-time format. Expected format is YYYY-MM-DDTHH:MM:SS.sssZ"
    ), // ISO 8601 포맷의 날짜 문자열
  reg_id: z.string(), // string
  category_code: z.number(), // number
  customer_id: z
    .string()
    .regex(/^\d+$/, "Customer ID must be a string of digits"), // 숫자로만 이루어진 문자열
  tpo: z.string(), // string
  image_date: z.string(), // string
  age: z.union([z.string(), z.undefined()]), // string
  birth_year: z.number(), // number
  grade: z.enum(["WELCOME", "GOLD", "VIP", "VVIP"]),
  job: z.string(), // string
  city: z.string(), // string
  file_name: z
    .string()
    .regex(
      /^\d+_\d+_\d+\.(jpg|png|jpeg)$/,
      "File name must be in the format: digits_digits_digits.extension"
    ), // 파일명 형식 검증
  options: z.string(), // string
  option_values: z.string(), // string
})

export const snapFilterOptionSchema = z.object({
  jobs: z.array(z.string()),
  grades: z.array(z.string()),
  ages: z.array(z.number()),
})

export type SnapFilterOptions = z.infer<typeof snapFilterOptionSchema>
export type Snap = z.infer<typeof snapSchema>
