import { vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

/*
 *
 * API Mock Setup
 *
 */

const fetchMocker = createFetchMock(vi)

fetchMocker.enableMocks()
