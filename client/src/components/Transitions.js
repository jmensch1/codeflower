import React from 'react'
import {
  Slide as SlideTransition,
  Zoom as ZoomTransition,
  Grow as GrowTransition,
  Collapse as CollapseTransition,
  Fade as FadeTransition,
} from '@material-ui/core'

export const Slide = React.forwardRef(function (props, ref) {
  return <SlideTransition ref={ref} {...props} />
})

export const Zoom = React.forwardRef(function (props, ref) {
  return <ZoomTransition ref={ref} {...props} />
})

export const Grow = React.forwardRef(function (props, ref) {
  return <GrowTransition ref={ref} {...props} />
})

export const Collapse = React.forwardRef(function (props, ref) {
  return <CollapseTransition ref={ref} {...props} />
})

export const Fade = React.forwardRef(function (props, ref) {
  return <FadeTransition ref={ref} {...props} />
})
