import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useVisForces } from 'store/selectors'
import { setVisForces } from 'store/actions/vis'
import { useDispatch } from 'react-redux'

const INITIAL_VIS_FORCES = {
  alphaDecay: 0.0228,
  charge: {
    enabled: true,
    strength: -200,
    distanceMin: 1,
    distanceMax: 2000,
  },
  forceXY: {
    enabled: true,
    strength: 0.6,
  },
  link: {
    enabled: true,
    strength: 1,
    distance: {
      files: 10,
      folders: 10,
    },
    iterations: 7,
  },
  center: {
    enabled: true,
    strength: 1,
  },
  collide: {
    enabled: false,
    strength: 0.7,
    iterations: 1,
    radius: 5,
  },
}

export default function useAddForces({ visData, simulation }) {
  const dispatch = useDispatch()
  const visForces = useVisForces()
  const skipRestart = useRef({
    simulation: false,
    visForces: false,
  })

  useEffect(() => {
    // don't restart the simulation if the vis comes from saved data.
    // both the simulation and visForces are updated (separately)
    // so we need to skip a cycle for each
    if (visData.saved) {
      skipRestart.current.simulation = true
      skipRestart.current.visForces = true
    }
  }, [visData])

  useEffect(() => {
    dispatch(setVisForces(INITIAL_VIS_FORCES))
  }, [dispatch])

  // init forces
  useEffect(() => {
    simulation
      .nodes(visData.nodes)
      .force('link', d3.forceLink().links(visData.links))
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide())
      .force('center', d3.forceCenter())
      .force('forceX', d3.forceX())
      .force('forceY', d3.forceY())
  }, [visData, simulation])

  // update forces
  useEffect(() => {
    if (!visForces) return

    simulation
      .force('center')
      .strength(visForces.center.strength * visForces.center.enabled)

    simulation
      .force('charge')
      .strength(visForces.charge.strength * visForces.charge.enabled)
      .distanceMin(visForces.charge.distanceMin)
      .distanceMax(visForces.charge.distanceMax)

    simulation
      .force('collide')
      .strength(visForces.collide.strength * visForces.collide.enabled)
      .radius(visForces.collide.radius)
      .iterations(visForces.collide.iterations)

    simulation
      .force('forceX')
      .strength(visForces.forceXY.strength * visForces.forceXY.enabled)

    simulation
      .force('forceY')
      .strength(visForces.forceXY.strength * visForces.forceXY.enabled)
      
    simulation
      .force('link')
      .strength(visForces.link.strength * visForces.link.enabled)
      .distance((d) =>
        d.target.children
          ? visForces.link.distance.folders
          : visForces.link.distance.files
      )
      .iterations(visForces.link.iterations)

    simulation.alphaDecay(visForces.alphaDecay)

    if (skipRestart.current.simulation || skipRestart.current.visForces) return
    simulation.alpha(1).restart()
  }, [simulation, visForces])

  // skip only one cycle for each
  useEffect(() => (skipRestart.current.simulation = false), [simulation])
  useEffect(() => (skipRestart.current.visForces = false), [visForces])
}
