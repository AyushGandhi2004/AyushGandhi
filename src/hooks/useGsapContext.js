import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function useGsapContext(scope) {
  const ctx = useRef(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {}, scope);
    return () => ctx.current?.revert();
  }, [scope]);

  return ctx;
}
