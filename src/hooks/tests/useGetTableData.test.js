import { renderHook } from "@testing-library/react";
import useGetTableData from "../useGetTableData";

global.fetch = jest.fn();

describe("useGetTableData", () => {
  const mockUrl = "https://mock-api.com/table-data";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetTableData(mockUrl)
    );

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
  });

  it("should fetch and return data", async () => {
    const mockData = [
      { "s.no": 0, "amt.pledged": 15823, "percentage.funded": 186 },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetTableData(mockUrl)
    );

    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch errors", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetTableData(mockUrl)
    );

    await waitForNextUpdate();
    expect(result.current.error).toBe("Network error");
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
  });

  it("should handle non-200 responses", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetTableData(mockUrl)
    );

    await waitForNextUpdate();
    expect(result.current.error).toBe("HTTP error! Status: 404");
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});
