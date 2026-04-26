import { useContext } from 'react';
import { LenisContext } from '../App';

export function useLenis() {
  return useContext(LenisContext);
}
