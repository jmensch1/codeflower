import { useEffect } from 'react'
import * as d3 from 'd3'
import { useForces } from 'store/selectors'
import { setForces } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const INITIAL_FORCES = {
  alphaDecay: 0.0228,
  center: {
    enabled: true,
    strength: 1,
  },
  charge: {
    enabled: true,
    strength: -200,
    distanceMin: 1,
    distanceMax: 2000,
  },
  collide: {
    enabled: false,
    strength: 0.7,
    iterations: 1,
    radius: 5,
  },
  forceX: {
    enabled: true,
    strength: 0.4,
  },
  forceY: {
    enabled: true,
    strength: 0.4,
  },
  link: {
    enabled: true,
    distance: 10,
    iterations: 4,
    strength: 1,
    distanceInner: 10,
    distanceOuter: 10,
  },
  files: {
    radius: {
      exponent: 0.4,
    },
  },
}

export default function useAddForces({ simulation, nodes, links }) {
  const dispatch = useDispatch()
  const forces = useForces()

  useEffect(() => {
    dispatch(setForces(INITIAL_FORCES))
  }, [dispatch])

  // init forces
  useEffect(() => {
    if (!simulation || !nodes || !links) return

    simulation
      .nodes(nodes)
      .force('link', d3.forceLink().links(links))
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide())
      .force('center', d3.forceCenter())
      .force('forceX', d3.forceX())
      .force('forceY', d3.forceY())
  }, [simulation, nodes, links])

  // update forces
  useEffect(() => {
    if (!simulation || !forces) return

    simulation
      .force('center')
      .strength(forces.center.strength * forces.center.enabled)
    simulation
      .force('charge')
      .strength(forces.charge.strength * forces.charge.enabled)
      .distanceMin(forces.charge.distanceMin)
      .distanceMax(forces.charge.distanceMax)
    simulation
      .force('collide')
      .strength(forces.collide.strength * forces.collide.enabled)
      .radius(forces.collide.radius)
      .iterations(forces.collide.iterations)
    simulation
      .force('forceX')
      .strength(forces.forceX.strength * forces.forceX.enabled)
    simulation
      .force('forceY')
      .strength(forces.forceY.strength * forces.forceY.enabled)
    simulation
      .force('link')
      .distance((d) =>
        d.target.children
          ? forces.link.distanceInner
          : forces.link.distanceOuter
      )
      .strength(forces.link.strength)
      .iterations(forces.link.iterations)

    simulation.alphaDecay(forces.alphaDecay)

    simulation.alpha(1).restart()
  }, [simulation, forces])
}
