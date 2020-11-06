import axios from 'axios'

const BASE_URL = process.env.API_URL || 'http://localhost:8080'

export const getRepo = async ({ owner, name, branch }) => {
  const { data } = await axios.post(`${BASE_URL}/cloc`, { owner, name, branch})
  return data.data
}

export const getFile = async ({ repoId, name, path }) => {
  const { data } = await axios.post(`${BASE_URL}/file`, { repoId, name, path })
  return data.data
}
