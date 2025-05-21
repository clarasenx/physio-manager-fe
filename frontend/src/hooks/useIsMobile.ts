import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < breakpoint);
    checkSize();

    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [breakpoint]);

  return isMobile;
}