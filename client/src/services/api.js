import axios from 'axios'
import testRepo from './data/test-repo-2.json'

// FOR DEVELOPMENT ONLY
const USE_TEST_REPO = true

const HTTP_URL = process.env.REACT_APP_API_URL_HTTP || 'http://localhost:8000'
const WS_URL = process.env.REACT_APP_API_URL_WS || 'ws://localhost:8000'

export const getRepo = async ({
  owner,
  name,
  branch,
  username,
  password,
  onUpdate = (text) => null,
}) => {
  if (USE_TEST_REPO) {
    onUpdate(`getting: ${owner}/${name}`)
    onUpdate('using test repo')
    return Promise.resolve(testRepo)
  }

  return new Promise((resolve, reject) => {
    const socket = new WebSocket(WS_URL)

    socket.onopen = (e) => {
      socket.send(JSON.stringify({
        endpoint: 'cloc',
        params: {
          owner,
          name,
          branch,
          username,
          password,
        }
      }))
    }

    socket.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data)
      switch(type) {
        case 'success': return resolve(data)
        case 'error':   return reject(data)
        case 'update':  return onUpdate(data.text)
        default:        return null
      }
    }

    socket.onerror = (err) => {
      console.log('WS connection error:', err)
      reject(err)
    }
  })
}

export const getFile = async ({ repoId, path }) => {
  const { data } = await axios.post(`${HTTP_URL}/file`, { repoId, path })
  return data.data
}
