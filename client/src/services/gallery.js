import axios from 'axios'

const CLOUD_NAME = 'dt2rs6yf1'
const UPLOAD_PRESET = 'tahdwqyy'
const TAG = 'myphotoalbum'

export function uploadImage(dataUri, repo) {
  const formData = new FormData()
  formData.append('file', dataUri)
  formData.append('public_id', repo.name + Date.now())
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('tags', TAG)

  const repoInfo = encodeURIComponent(`${repo.name}/${repo.owner}`)
  formData.append('context', `repo=${repoInfo}`)

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`

  return axios
    .post(url, formData)
    .then((result) => {
      console.log('res:', result)
    })
    .catch((err) => {
      console.log('err:', err)
    })
}

export function listImages() {
  const baseUrl = 'https://res.cloudinary.com'

  const version = Math.ceil(new Date().getTime() / 1000)
  const url = `${baseUrl}/${CLOUD_NAME}/image/list/v${version}/${TAG}.json`

  return axios.get(url)
    .then(({ data: { resources: images }}) => {
      return images.map((image) => ({
        ...image,
        url: `${baseUrl}/${CLOUD_NAME}/image/upload/v${image.version}/${image.public_id}.${image.format}`
      }))
    })
    .catch((err) => console.log('ERROR LISTING IMAGES:', err))
}
