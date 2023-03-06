import { featureFlags } from '../flags/feature-flags';

//@ts-ignore
export const useFeatureFlag = (flagName) => {
  //@ts-ignore
  return featureFlags[flagName];
};
