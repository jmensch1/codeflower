import axios from 'axios'
import { cloudinary } from 'constants.js'

////////////// CONFIG /////////////

const { CLOUD_NAME, UPLOAD_PRESET, TAG } = cloudinary
const FETCH_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image`
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

///////////// HELPERS /////////////

function packContext(context) {
  return Object.keys(context).map((key) => {
    const value = encodeURIComponent(context[key])
    return `${key}=${value}`
  }).join('|')
}

function unpackContext(context) {
  if (!context) return {}

  const { custom: packed } = context
  return Object.keys(packed).reduce((unpacked, key) => {
    unpacked[key] = decodeURIComponent(packed[key])
    return unpacked
  }, {})
}

///////////// EXPORTS /////////////

export function listImages() {
  const version = Math.ceil(new Date().getTime() / 1000)
  const url = `${FETCH_URL}/list/v${version}/${TAG}.json`

  return axios.get(url)
    .then(({ data: { resources: images }}) => {
      return images.map((image) => ({
        ...image,
        context: unpackContext(image.context),
      }))
    })
    .catch((err) => [])
}

export function imageUrl(image) {
  const { version, public_id, format } = image
  return `${FETCH_URL}/upload/v${version}/${public_id}.${format}`
}

// https://cloudinary.com/documentation/transformation_reference
export function thumbUrl(image, { width = 300, height = 225 } = {}) {
  const { version, public_id } = image
  const transforms = `w_${width},h_${height},c_fill`
  return `${FETCH_URL}/upload/${transforms}/v${version}/${public_id}.png`
}

export function uploadImage(dataUri, imageId, context = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const data = {
    public_id: imageId,
    file: dataUri,
    folder: TAG,
    tags: TAG,
    upload_preset: UPLOAD_PRESET,
    context: packContext(context),
  }

  return axios.post(UPLOAD_URL, JSON.stringify(data), {
    headers,
    onUploadProgress: (e) => {
      // const percentCompleted = Math.round(100 * e.loaded / e.total)
      // do something
    }
  })
}
