import axios from 'axios'

const HTTP_URL = process.env.REACT_APP_API_URL_HTTP || 'http://localhost:8000'
const WS_URL = process.env.REACT_APP_API_URL_WS || 'ws://localhost:8000'

// HTTP VERSION
// export const getRepo = async ({ owner, name, branch }) => {
//   const { data } = await axios.post(`${HTTP_URL}/cloc`, { owner, name, branch})
//   return data.data
// }

// WS VERSION
export const getRepo = async ({ owner, name, branch, onUpdate = (text) => null }) => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(WS_URL)

    socket.onopen = (e) => {
      socket.send(JSON.stringify({
        endpoint: 'cloc',
        params: {
          owner,
          name,
          branch,
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

export const getFile = async ({ repoId, name, path }) => {
  const { data } = await axios.post(`${HTTP_URL}/file`, { repoId, name, path })
  return data.data
}
