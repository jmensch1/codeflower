import { useEffect } from 'react'
import { useVisPosition } from 'store/selectors'

export default function useAddRotation({ nodeG, linkG }) {
  const { rotation } = useVisPosition()

  useEffect(() => {
    nodeG.style('transform', `rotate(${rotation}deg)`)
    linkG.style('transform', `rotate(${rotation}deg)`)
  }, [nodeG, linkG, rotation])
}
