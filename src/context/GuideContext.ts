import { createContext } from 'react';
import type { GuideController, GuideOptions } from '../types';

export interface GuideContextValue {
  controller: GuideController;
  options: GuideOptions;
}

export const GuideContext = createContext<GuideContextValue | null>(null);
