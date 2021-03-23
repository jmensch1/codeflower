import axios from 'axios'
import { api } from 'constants.js'

// FOR DEVELOPMENT ONLY
import testRepo from './data/cloc.json'
const USE_TEST_REPO = true

const { HTTP_URL, WS_URL } = api

export const getRepo = async ({
  owner,
  name,
  branch,
  username,
  password,
  onUpdate = (text) => null,
}) => {
  if (USE_TEST_REPO) {
    const { data } = testRepo
    onUpdate(`using test repo: ${data.owner}/${data.name}`)
    return Promise.resolve(testRepo.data)
  }

  return new Promise((resolve, reject) => {
    const socket = new WebSocket(WS_URL)

    socket.onopen = (e) => {
      socket.send(
        JSON.stringify({
          endpoint: 'cloc',
          params: {
            owner,
            name,
            branch,
            username,
            password,
          },
        })
      )
    }

    socket.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data)
      switch (type) {
        case 'success':
          return resolve(data)
        case 'error':
          return reject(data)
        case 'update':
          return onUpdate(data.text)
        default:
          return null
      }
    }

    socket.onerror = (err) => {
      console.log('WS connection error:', err)
      reject(err)
    }
  })
}

export const getFile = async ({ repoId, path }) => {
  path = path.replace(/^root\//, '')
  const { data } = await axios.post(`${HTTP_URL}/file`, { repoId, path })
  return data.data
}
