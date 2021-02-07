import React from 'react'

const Background = ({ layers = [] }) => {
  return layers.map((layer, idx) => (
    <div
      key={idx.toString()}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -idx,
        background: layer,
      }}
    />
  ))
}

export default Background
