import useAddForces from './useAddForces'
import useAddStyles from './useAddStyles'
import useAddMouse from './useAddMouse'
import useAddZoom from './useAddZoom'
import useAddRotation from './useAddRotation'

const VisHooks = ({ visElements, inDragMode }) => {
  const {
    nodes,
    links,
    svg,
    zoomG,
    rotationG,
    node,
    link,
    simulation,
  } = visElements

  useAddForces({ nodes, links, simulation })
  useAddStyles({ svg, node, link })
  useAddMouse({ node, simulation, inDragMode })
  useAddZoom({ svg, zoomG })
  useAddRotation({ rotationG })

  return null
}

export default VisHooks
