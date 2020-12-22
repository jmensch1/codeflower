import React from 'react'
import SlideTransition from '@material-ui/core/Slide'
import ZoomTransition from '@material-ui/core/Zoom'
import GrowTransition from '@material-ui/core/Grow'
import CollapseTransition from '@material-ui/core/Collapse'
import FadeTransition from '@material-ui/core/Fade'

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
