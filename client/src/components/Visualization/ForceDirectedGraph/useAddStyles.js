import { useEffect } from 'react'
import {
  useSelectedLanguage,
  useLanguageIds,
  useLanguageColors,
  useHighlightedAuthorId,
  useFolderIds,
  useHighlightedFolderPath,
  useVisStyles,
} from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import { partition, multiClassSelector as select } from 'services/utils'

const INITIAL_VIS_STYLES = {
  rotation: 0,
  files: {
    color: {
      hue: [170, 360],
      saturation: 100,
      lightness: 100,
    },
    radius: {
      coeff: 1.0,
      exponent: 0.4,
    },
    opacity: 1.0,
  },
}

export default function useAddStyles({ nodeG, node, linkG, link }) {
  const selectedLanguage = useSelectedLanguage()
  const languageColors = useLanguageColors()
  const languageIds = useLanguageIds()
  const highlightedAuthorId = useHighlightedAuthorId()
  const folderIds = useFolderIds()
  const highlightedFolderPath = useHighlightedFolderPath()
  const dispatch = useDispatch()
  const visStyles = useVisStyles()

  useEffect(() => {
    dispatch(setVisStyles(INITIAL_VIS_STYLES))
  }, [dispatch])

  // language colors
  useEffect(() => {
    if (!node) return

    node
      .filter('.file')
      .style('fill', (d) => languageColors[d.data.language])
  }, [node, languageColors])

  // rotation
  useEffect(() => {
    if (!nodeG || !linkG) return

    nodeG.style('transform', `rotate(${visStyles.rotation}deg)`)
    linkG.style('transform', `rotate(${visStyles.rotation}deg)`)
  }, [nodeG, linkG, visStyles?.rotation])

  // file radius
  useEffect(() => {
    if (!node) return

    const { coeff, exponent } = visStyles.files.radius
    node.attr('r', (d) => {
      return d.children ? 3.5 : coeff * Math.pow(d.data.size, exponent) || 1
    })
  }, [node, visStyles?.files.radius])

  // file opacity
  useEffect(() => {
    if (!node) return

    node.filter('.file').style('fill-opacity', visStyles.files.opacity)
  }, [node, visStyles?.files.opacity])

  // selected language
  useEffect(() => {
    if (!node || !link) return

    if (selectedLanguage) {
      const clx = `lang-${languageIds[selectedLanguage]}`
      node.filter(`.file.${clx}`).style('display', 'block')
      node.filter(`.file:not(.${clx})`).style('display', 'none')
      node.filter('.folder').style('display', 'none')
      link.style('stroke-opacity', 0.2)
    } else {
      node.filter('.file').style('display', 'block')
      node.filter('.folder').style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, selectedLanguage, languageIds])

  // highlighted author
  useEffect(() => {
    if (!node || !link) return

    if (highlightedAuthorId !== null) {
      const clx = `author-${highlightedAuthorId}`
      node.filter(`.file.${clx}`).style('display', 'block')
      node.filter(`.file:not(.${clx})`).style('display', 'none')
      node.filter('.folder').style('display', 'none')
      link.style('stroke-opacity', 0.2)
    } else {
      node.filter('.file').style('display', 'block')
      node.filter('.folder').style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, highlightedAuthorId])

  // highlighted folder
  useEffect(() => {
    if (!node || !link) return

    if (highlightedFolderPath) {
      const folderPaths = Object.keys(folderIds)

      const [highlightedIds, suppressedIds] = partition(
        folderPaths,
        (path) => path.startsWith(highlightedFolderPath),
        (path) => folderIds[path]
      )

      if (highlightedIds.length) {
        node.filter(select('.file.folder-', highlightedIds)).style('display', 'block')
        node.filter(select('.folder.folder-', highlightedIds)).style('display', 'block')
        link.filter(select('.link.folder-', highlightedIds)).style('stroke-opacity', 1.0)
      }

      if (suppressedIds.length) {
        node.filter(select('.file.folder-', suppressedIds)).style('display', 'none')
        node.filter(select('.folder.folder-', suppressedIds)).style('display', 'none')
        link.filter(select('.link.folder-', suppressedIds)).style('stroke-opacity', 0.2)
      }
    } else {
      node.filter('.file').style('display', 'block')
      node.filter('.folder').style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, highlightedFolderPath, folderIds])
}
