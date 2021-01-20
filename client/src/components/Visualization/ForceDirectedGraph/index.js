import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  useSelectedFolder,
  useLanguageIds,
  useFolderIds,
} from 'store/selectors'
import useAddStyles from './useAddStyles'
import useAddForces from './useAddForces'
import useAddMouse from './useAddMouse'
import Portal from 'components/core/Portal'
import Controls from './Controls'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // ...theme.visualization.default,
    // ...theme.visualization.force,
    // ...theme.dynamic,
    '& svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      '& .file': {
        cursor: 'pointer',
      },
      '& circle:not(.file)': {
        cursor: 'move',
      },
    },
  },
}))

const Enhancers = ({ visElements, getNodePath }) => {
  const {
    svg,
    nodes,
    nodeG,
    node,
    links,
    linkG,
    link,
    simulation
  } = visElements

  useAddStyles({ node, nodeG, link, linkG })
  useAddForces({ simulation, nodes, links })
  useAddMouse({ svg, node, link, simulation, getNodePath })

  return null
}

const ForceDirectedGraph = ({ getFullPath }) => {
  const classes = useStyles()
  const tree = useSelectedFolder()
  const languageIds = useLanguageIds()
  const folderIds = useFolderIds()
  const [visElements, setVisElements] = useState(null)
  const [alpha, setAlpha] = useState(0)
  const [restartKey, setRestartKey] = useState(0)

  const getNodePath = useCallback(
    (node) => {
      const partialPath = node
        .ancestors()
        .map((d) => d.data.name)
        .reverse()
        .slice(1)
        .join('/')
      return getFullPath(partialPath)
    },
    [getFullPath]
  )

  useEffect(() => {
    if (!tree) return

    //// DATA ////

    const root = d3.hierarchy(tree)
    const links = root.links()
    const nodes = root.descendants()

    // this ensures that larger nodes are on top of smaller ones,
    // and you don't get the weird look where the smaller ones are on
    // top but the links are invisible
    nodes.sort((a, b) => (a.data.size || 0) - (b.data.size || 0))

    //// DOM ////

    const container = document.getElementById('fdg-container')
    const width = container.offsetWidth
    const height = container.offsetHeight

    const svg = d3
      .select(container)
      .append('svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    const linkG = svg.append('g')

    const link = linkG
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('class', (d) =>
        clsx('link', `folder-${folderIds[getNodePath(d.source)]}`)
      )

    const nodeG = svg.append('g')

    const node = nodeG
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('class', (d) =>
        d.children
          ? clsx('folder', `folder-${folderIds[getNodePath(d)]}`)
          : clsx(
              'file',
              `lang-${languageIds[d.data.language]}`,
              d.parent && `folder-${folderIds[getNodePath(d.parent)]}`,
              ...d.data.authorIds.map((authorId) => `author-${authorId}`)
            )
      )

    //// SIMULATION ////

    const simulation = d3.forceSimulation().stop()

    simulation.on('tick.main', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      setAlpha(simulation.alpha())
    })

    //// FINISH ////

    setVisElements({ svg, nodes, nodeG, node, links, linkG, link, simulation })
    return () => {
      container.innerHTML = ''
    }
  }, [tree, languageIds, folderIds, getNodePath, restartKey])

  const restart = useCallback(() => {
    setRestartKey((key) => 1 - key)
  }, [])

  return (
    <>
      <div id="fdg-container" className={classes.root} />
      {visElements && (
        <Enhancers
          visElements={visElements}
          getNodePath={getNodePath}
        />
      )}
      <Portal domElementId="vis-controls">
        <Controls
          alpha={alpha}
          onRestart={restart}
        />
      </Portal>
    </>
  )
}

export default ForceDirectedGraph
