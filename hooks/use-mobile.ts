import * as React from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * A custom hook to detect if the user is on a mobile device.
 *
 * This hook listens for changes in the screen width and returns `true` if the width is
 * less than the mobile breakpoint (768px). It's useful for rendering different components
 * or layouts based on the screen size.
 *
 * @returns {boolean} `true` if the user is on a mobile device, otherwise `false`.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
