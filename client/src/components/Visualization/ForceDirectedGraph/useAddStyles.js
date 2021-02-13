import { useEffect, useMemo } from 'react'
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

  const { file, folder } = useMemo(() => ({
    file: node.filter('.file'),
    folder: node.filter('.folder'),
  }), [node])

  //// FILES ////

  // visibility
  useEffect(() => {
    file.style('visibility', visStyles.files.visible ? 'visible' : 'hidden')
  }, [file, visStyles.files.visible])

  // fill
  useEffect(() => {
    file.style('fill', (d) => languageColors[d.data.language])
  }, [file, languageColors])

  // radius
  useEffect(() => {
    const { coeff, exponent } = visStyles.files.radius
    file.attr('r', (d) => coeff * Math.pow(d.data.size, exponent))
  }, [file, visStyles.files.radius])

  // stroke
  useEffect(() => {
    file.style('stroke', colorString(visStyles.files.stroke))
  }, [file, visStyles.files.stroke])

  // stroke-width
  useEffect(() => {
    file.style('stroke-width', visStyles.files.strokeWidth)
  }, [file, visStyles.files.strokeWidth])

  //// FOLDERS ////

  // visibility
  useEffect(() => {
    folder.style('visibility', visStyles.folders.visible ? 'visible' : 'hidden')
  }, [folder, visStyles.folders.visible])

  // fill
  useEffect(() => {
    folder.style('fill', colorString(visStyles.folders.fill))
  }, [folder, visStyles.folders.fill])

  // radius
  useEffect(() => {
    folder.attr('r', visStyles.folders.radius)
  }, [folder, visStyles.folders.radius])

  // stroke
  useEffect(() => {
    folder.style('stroke', colorString(visStyles.folders.stroke))
  }, [folder, visStyles.folders.stroke])

  // stroke-width
  useEffect(() => {
    folder.style('stroke-width', visStyles.folders.strokeWidth)
  }, [folder, visStyles.folders.strokeWidth])

  //// LINKS ////

  // visibility
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
      file.style('display', (d) =>
        d.data.language === selectedLanguage
          ? 'block'
          : 'none'
      )
      folder.style('display', 'none')
      link.style('stroke-opacity', SUPPRESSED_LINK_OPACITY)
    } else {
      file.style('display', 'block')
      folder.style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [file, folder, link, selectedLanguage])

  // highlighted author
  useEffect(() => {
    if (highlightedAuthorId !== null) {
      file.style('display', (d) =>
        d.data.authorIds.includes(highlightedAuthorId)
          ? 'block'
          : 'none'
      )
      folder.style('display', 'none')
      link.style('stroke-opacity', SUPPRESSED_LINK_OPACITY)
    } else {
      file.style('display', 'block')
      folder.style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [file, folder, link, highlightedAuthorId])

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
      node.style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, highlightedFolderPath])

  //// ROTATION ////

  useEffect(() => {
    nodeG.style('transform', `rotate(${visPosition.rotation}deg)`)
    linkG.style('transform', `rotate(${visPosition.rotation}deg)`)
  }, [nodeG, linkG, visPosition.rotation])
}
