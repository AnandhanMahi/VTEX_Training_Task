import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method,
} from '@vtex/api'
import { Clients } from './clients'
import { analytics } from './handlers/analytics'
import { getStudent } from './handlers/get-student'
import { createStudent } from './handlers/create-student'
import { updateStudent } from './handlers/update-student'
import { deleteStudent } from './handlers/delete-student'
import { getCaptcha } from './handlers/get-captcha'

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  routes: {
    analytics: method({
      GET: [analytics],
    }),
    student: method({
      GET: [getStudent],
      POST: [createStudent],
      PATCH: [updateStudent],
      DELETE: [deleteStudent]
    }),
    captcha: method({
      GET: [getCaptcha]
    })
  },
})
