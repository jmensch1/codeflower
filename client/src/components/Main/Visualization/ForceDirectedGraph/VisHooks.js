import useAddForces from './useAddForces'
import useAddStyles from './useAddStyles'
import useAddMouse from './useAddMouse'
import useAddZoom from './useAddZoom'
import useAddRotation from './useAddRotation'

const VisHooks = ({ visData, visElements, inDragMode }) => {
  const {
    svg,
    node,
    link,
    simulation,
    zoomG,
    rotationG,
  } = visElements

  useAddForces({ visData, simulation })
  useAddStyles({ svg, node, link })
  useAddMouse({ node, simulation, inDragMode })
  useAddZoom({ svg, zoomG })
  useAddRotation({ rotationG })

  return null
}

export default VisHooks
