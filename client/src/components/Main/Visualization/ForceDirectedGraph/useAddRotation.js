import { useEffect } from 'react'
import { useVisPosition } from 'store/selectors'

export default function useAddRotation({ rotationG }) {
  const { rotation } = useVisPosition()

  useEffect(() => {
    rotationG.attr('transform', `rotate(${rotation})`)
  }, [rotationG, rotation])
}
