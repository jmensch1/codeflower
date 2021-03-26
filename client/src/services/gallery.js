import axios from 'axios'
import { gallery } from 'constants.js'

////////////// CONFIG /////////////

const { CLOUD_NAME, UPLOAD_PRESET, TAG, THUMB_WIDTH, THUMB_HEIGHT } = gallery
const FETCH_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image`
const FETCH_DATA_URL = `https://res.cloudinary.com/${CLOUD_NAME}/raw`
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
const UPLOAD_DATA_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`
const UPLOAD_HEADERS = { 'Content-Type': 'application/json' }
const DELETE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/delete_by_token`

///////////// HELPERS /////////////

function packContext(context) {
  return Object.keys(context)
    .map((key) => {
      const value = encodeURIComponent(context[key])
      return `${key}=${value}`
    })
    .join('|')
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

  return axios
    .get(url)
    .then(({ data: { resources: images } }) => {
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
// NOTE: the order of the transforms is important because
// the upload preset does an eager transform to create the thumbnail,
// and the resulting url is in the order below
export function thumbUrl(image) {
  const { version, public_id } = image
  const transforms = `c_fill,h_${THUMB_HEIGHT},w_${THUMB_WIDTH}`
  return `${FETCH_URL}/upload/${transforms}/v${version}/${public_id}.png`
}

export async function uploadImage(
  dataUri,
  imageId,
  context = {},
  onProgress = () => null
) {
  const opts = {
    public_id: imageId,
    file: dataUri,
    folder: TAG,
    tags: TAG,
    upload_preset: UPLOAD_PRESET,
    context: packContext(context),
  }

  const { data: image } = await axios.post(UPLOAD_URL, JSON.stringify(opts), {
    headers: UPLOAD_HEADERS,
    onUploadProgress: (e) => {
      const percentCompleted = Math.round((100 * e.loaded) / e.total)
      onProgress(percentCompleted)
    },
  })

  return {
    ...image,
    context: unpackContext(image.context),
  }
}

export async function uploadImageData(
  data,
  imageId,
  context = {},
  onProgress = () => null
) {
  const file = 'data:text/plain;base64,' + btoa(JSON.stringify(data))

  const opts = {
    public_id: `${imageId}.json`,
    file,
    folder: TAG,
    tags: TAG,
    upload_preset: UPLOAD_PRESET,
    context: packContext(context),
  }

  const { data: image } = await axios.post(UPLOAD_DATA_URL, JSON.stringify(opts), {
    headers: UPLOAD_HEADERS,
    onUploadProgress: (e) => {
      const percentCompleted = Math.round((100 * e.loaded) / e.total)
      onProgress(percentCompleted)
    },
  })

  return {
    ...image,
    context: unpackContext(image.context),
  }
}

export async function getSvgString(image) {
  const { data } = await axios.get(imageUrl(image))
  return data
}

export async function getImageData(image) {
  const { version, public_id } = image
  const url = `${FETCH_DATA_URL}/upload/v${version}/${public_id}.json`
  const { data } = await axios.get(url)
  return data
}

export function deleteImage(token) {
  return axios.post(DELETE_URL, JSON.stringify({ token }), {
    headers: UPLOAD_HEADERS,
  })
}
