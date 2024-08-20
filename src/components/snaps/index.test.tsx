import { describe, expect, it, Mock, vi } from "vitest"

import "@testing-library/jest-dom"

import { render, screen, waitFor } from "@testing-library/react"

import API from "@api/axios-instance"

import Dashboard from "./"

vi.mock("@api/axios-instance", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof API
  return {
    default: {
      ...actual,
      get: vi.fn(),
      getInstance: vi.fn(() => ({
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
        request: vi.fn(),
      })),
    }, // default export를 명시적으로 반환
  }
})

describe("Dashboard Component", () => {
  it("should display the Dashboard text initially", () => {
    render(<Dashboard />)
    const textElement = screen.getByText(/Dashboard/i)
    expect(textElement).toBeInTheDocument()
  })

  it("should display the dashboard data when available", async () => {
    const mockResponse = { data: "dashboard data" }
    ;(API.get as Mock).mockResolvedValue({ data: mockResponse })

    render(<Dashboard />)

    const dashboardElement = await waitFor(() =>
      screen.getByText(/dashboard data/i)
    )
    expect(dashboardElement).toBeInTheDocument()
  })
})
