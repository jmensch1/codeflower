import { useEffect } from 'react'
import { useSelectedLanguage, useLanguageColors, useDisplay } from 'store/selectors'
import { setDisplay } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const INITIAL_DISPLAY = {
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

export default function useAddDisplay({ nodeG, node, linkG, link }) {
  const selectedLanguage = useSelectedLanguage()
  const languageColors = useLanguageColors()
  const dispatch = useDispatch()
  const display = useDisplay()

  useEffect(() => {
    dispatch(setDisplay(INITIAL_DISPLAY))
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

    nodeG.style('transform', `rotate(${display.rotation}deg)`)
    linkG.style('transform', `rotate(${display.rotation}deg)`)
  }, [nodeG, linkG, display?.rotation])

  // file radius
  useEffect(() => {
    if (!node) return

    const { coeff, exponent } = display.files.radius
    node.attr('r', (d) => {
      return d.children ? 3.5 : coeff * Math.pow(d.data.size, exponent) || 1
    })
  }, [node, display?.files.radius])

  // file opacity
  useEffect(() => {
    if (!node) return

    node.filter('.file').style('fill-opacity', display.files.opacity)
  }, [node, display?.files.opacity])

  // selected language
  useEffect(() => {
    if (!node || !link) return

    if (selectedLanguage) {
      node.filter('.file').style('display', (d) => d.data.language === selectedLanguage ? 'block' : 'none')
      node.filter('.folder').style('display', 'none')
      link.style('stroke-opacity', 0.2)
    } else {
      node.filter('.file').style('display', 'block')
      node.filter('.folder').style('display', 'block')
      link.style('stroke-opacity', 1.0)
    }
  }, [node, link, selectedLanguage])
}
