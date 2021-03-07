import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import Shelf from './Shelf'

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }))

const Shelves = ({ images, selectedImage, onSelect }) => {
  return (
    <>
      <Shelf
        images={images}
        onSelect={onSelect}
        selectedImage={selectedImage}
      />
      <Shelf
        images={images}
        onSelect={onSelect}
        selectedImage={selectedImage}
      />
      <Shelf
        images={images}
        onSelect={onSelect}
        selectedImage={selectedImage}
      />
    </>
  )
}

export default Shelves
