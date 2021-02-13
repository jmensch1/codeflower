import { useEffect } from 'react'
import {
  useSelectedLanguage,
  useLanguageColors,
  useHighlightedAuthorId,
  useHighlightedFolderPath,
  useVisStyles,
  useVisPosition,
} from 'store/selectors'
import { colorString } from 'services/utils'
import { isWithinFolder } from 'services/repo'

const SUPPRESSED_LINK_OPACITY = 0.2

export default function useAddStyles({ nodeG, node, linkG, link }) {
  const selectedLanguage = useSelectedLanguage()
  const languageColors = useLanguageColors()
  const highlightedAuthorId = useHighlightedAuthorId()
  const highlightedFolderPath = useHighlightedFolderPath()
  const visStyles = useVisStyles()
  const visPosition = useVisPosition()

  //// FILES ////

  useEffect(() => {
    node
      .filter('.file')
      .style('visibility', visStyles.files.visible ? 'visible' : 'hidden')
  }, [node, visStyles.files.visible])

  // fill
  useEffect(() => {
    node.filter('.file').style('fill', (d) => languageColors[d.data.language])
  }, [node, languageColors])

  // stroke
  useEffect(() => {
    node.filter('.file').style('stroke', colorString(visStyles.files.stroke))
  }, [node, visStyles.files.stroke])

  // stroke-width
  useEffect(() => {
    node.filter('.file').style('stroke-width', visStyles.files.strokeWidth)
  }, [node, visStyles.files.strokeWidth])

  // radius
  useEffect(() => {
    const { coeff, exponent } = visStyles.files.radius
    node.attr('r', (d) => {
      return d.children
        ? visStyles.folders.radius
        : coeff * Math.pow(d.data.size, exponent)
    })
  }, [node, visStyles.files.radius, visStyles.folders.radius])

  //// FOLDERS ////

  useEffect(() => {
    node
      .filter('.folder')
      .style('visibility', visStyles.folders.visible ? 'visible' : 'hidden')
  }, [node, visStyles.folders.visible])

  // fill
  useEffect(() => {
    node.filter('.folder').style('fill', colorString(visStyles.folders.fill))
  }, [node, visStyles.folders.fill])

  // stroke
  useEffect(() => {
    node
      .filter('.folder')
      .style('stroke', colorString(visStyles.folders.stroke))
  }, [node, visStyles.folders.stroke])

  // stroke-width
  useEffect(() => {
    node.filter('.folder').style('stroke-width', visStyles.folders.strokeWidth)
  }, [node, visStyles.folders.strokeWidth])

  //// LINKS ////

  useEffect(() => {
    link.style('visibility', visStyles.links.visible ? 'visible' : 'hidden')
  }, [link, visStyles.links.visible])

  // stroke
  useEffect(() => {
    link.style('stroke', colorString(visStyles.links.stroke))
  }, [link, visStyles.links.stroke])

  // stroke-width
  useEffect(() => {
    link.style('stroke-width', visStyles.links.strokeWidth)
  }, [link, visStyles.links.strokeWidth])

  //// SELECTION / HIGHLIGHTING ////

  // selected language
  useEffect(() => {
    if (selectedLanguage) {
      node
        .filter('.file')
        .style('display', (d) =>
          d.data.language === selectedLanguage
            ? 'block'
            : 'none'
        )
      node.filter('.folder').style('display', 'none')
      link.style('stroke-opacity', SUPPRESSED_LINK_OPACITY)
    } else {
      node.filter('.file').style('display', 'block')
      node.filter('.folder').style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, selectedLanguage])

  // highlighted author
  useEffect(() => {
    if (highlightedAuthorId !== null) {
      node
        .filter('.file')
        .style('display', (d) =>
          d.data.authorIds.includes(highlightedAuthorId)
            ? 'block'
            : 'none'
        )
      node.filter('.folder').style('display', 'none')
      link.style('stroke-opacity', SUPPRESSED_LINK_OPACITY)
    } else {
      node.filter('.file').style('display', 'block')
      node.filter('.folder').style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, highlightedAuthorId])

  // highlighted folder
  useEffect(() => {
    if (highlightedFolderPath) {
      node.style('display', (d) =>
        isWithinFolder(d.data.path, highlightedFolderPath)
          ? 'block'
          : 'none'
      )

      link.style('stroke-opacity', (d) =>
        isWithinFolder(d.source.data.path, highlightedFolderPath)
          ? 1.0
          : SUPPRESSED_LINK_OPACITY
      )
    } else {
      node.filter('.file').style('display', 'block')
      node.filter('.folder').style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, highlightedFolderPath])

  //// ROTATION ////

  useEffect(() => {
    nodeG.style('transform', `rotate(${visPosition.rotation}deg)`)
    linkG.style('transform', `rotate(${visPosition.rotation}deg)`)
  }, [nodeG, linkG, visPosition.rotation])
}
