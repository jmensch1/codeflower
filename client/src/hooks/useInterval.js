// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useRef, useEffect } from 'react'

/*
  Usage:

  useInterval(() => {
    // do something every 1000 milliseconds
  }, 1000)
*/
export default function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

/*
  This is a convenience wrapper that lets you use useInterval conditionally.
  Usage:

  const [isPlaying, setIsPlaying] = useState(false)
  const play = useCallback(() => setIsPlaying(true), [])
  const stop = useCallback(() => setIsPlaying(false), [])
  const next = useCallback(() => {
    // do something every 1000 milliseconds
  }, [dependencies])

  ...

  return (
    <>
      {isPlaying && <Interval next={next} delay={1000} />}
    </>
  )
*/
export const Interval = ({ next, delay }) => {
  useInterval(next, delay)
  return null
}
