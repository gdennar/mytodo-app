import React, { useRef, useEffect} from 'react'

function useMounted() {

    const mounted = useRef(false)

    useEffect(() => {
      mounted.current = true
    
      return () => {
        mounted.current = false
      }
    }, [])
    
  return (
    <div>useMounted</div>
  )
}

export default useMounted