import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function useGsapContext(scope: React.RefObject<Element | null>) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {}, scope);
    return () => ctx.current?.revert();
  }, [scope]);

  return ctx;
}
