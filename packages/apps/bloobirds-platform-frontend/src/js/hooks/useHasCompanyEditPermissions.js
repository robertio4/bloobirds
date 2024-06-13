import { useBobjectPermissions, useUserPermissions } from '../components/userPermissions/hooks';
import { useContactBobjects } from '../pages/contactPages/contactPageContext';

const useHasCompanyEditPermissions = () => {
  const { company } = useContactBobjects();
  const { checkPermissions } = useBobjectPermissions();
  const userPermissions = useUserPermissions();

  return userPermissions.editAll || (company && checkPermissions(company));
};

export default useHasCompanyEditPermissions;
