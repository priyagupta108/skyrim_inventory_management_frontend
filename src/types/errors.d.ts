export interface ApiError extends Error {
  code: 401 | 404 | 422 | 500
}
