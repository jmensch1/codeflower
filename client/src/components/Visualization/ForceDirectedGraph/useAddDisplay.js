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

export default function useAddDisplay({ nodeG, node, linkG }) {
  const selectedLanguage = useSelectedLanguage()
  const languageColors = useLanguageColors()
  const dispatch = useDispatch()
  const display = useDisplay()

  useEffect(() => {
    dispatch(setDisplay(INITIAL_DISPLAY))
  }, [dispatch])

  // update display
  useEffect(() => {
    if (!node || !display) return

    nodeG.style('transform', `rotate(${display.rotation}deg)`)
    linkG.style('transform', `rotate(${display.rotation}deg)`)

    const { coeff, exponent } = display.files.radius
    node.attr('r', (d) => {
      return d.children ? 3.5 : coeff * Math.pow(d.data.size, exponent) || 1
    })

    node.filter('.file').style('fill-opacity', display.files.opacity)

    if (selectedLanguage) {
      node.filter('.file').style('display', (d) => d.data.language === selectedLanguage ? 'block' : 'none')
      node.filter('.folder').style('display', 'none')
    } else {
      node.filter('.file').style('display', 'block').style('fill', (d) => languageColors[d.data.language])
      node.filter('.folder').style('display', 'block')
    }

  }, [node, nodeG, linkG, display, selectedLanguage, languageColors])
}
