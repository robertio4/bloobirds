import { useEntity } from './entities/useEntity';

export const useBobjectFieldByLogicRole = logicRole => {
  const bobjectFields = useEntity('bobjectFields');
  return bobjectFields?.findByLogicRole(logicRole);
};
