import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useSize from 'hooks/useSize'
import Shelf from './Shelf'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Shelves = ({ images, selectedImage, onSelect }) => {
  const classes = useStyles()
  const container = useRef(null)
  const dimensions = useSize(container)
  const [shelves, setShelves] = useState([])

  useEffect(() => {
    if (!dimensions) return

    const { width } = dimensions
    const numPerShelf = Math.floor((width - 100) / 25) // TODO: better calc
    const numShelves = Math.ceil(images.length / numPerShelf)

    const shelves = []
    Array.from({ length: numShelves }).forEach((el, idx) => {
      const shelf = images.slice(idx * numPerShelf, (idx + 1) * numPerShelf)
      shelves.push(shelf)
    })

    setShelves(shelves)
  }, [dimensions, images])

  return (
    <div className={classes.root} ref={container}>
      {shelves.map((shelf, idx) => (
        <Shelf
          key={idx.toString()}
          images={shelf}
          onSelect={onSelect}
          selectedImage={selectedImage}
        />
      ))}
    </div>
  )
}

export default Shelves
