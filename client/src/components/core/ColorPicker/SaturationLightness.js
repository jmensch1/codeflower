import React from 'react'
import Background from 'components/core/Background'

const SaturationLightness = ({ hue, alpha }) => (
  <Background layers={[
    `
      linear-gradient(
        to top,
          hsla(0, 0%, 0%, 1.0),
          hsla(0, 0%, 0%, 0)
      )
      ,
      linear-gradient(
        to right,
          hsla(0, 0%, 100%, 1.0),
          hsla(0, 0%, 100%, 0)
      )
    `,
    `hsla(${hue}, 100%, 50%, 1.0)`,
  ]} />
)


export default SaturationLightness
