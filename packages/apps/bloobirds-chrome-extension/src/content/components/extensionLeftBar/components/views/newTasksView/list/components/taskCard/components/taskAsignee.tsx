import { useUserSearch } from "@bloobirds-it/hooks";
import { CircularBadge } from "@bloobirds-it/flamingo-ui";
import styles from "../../../taskTabsList.module.css";

export function TaskAsignee({ value }: { value: string }) {
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === value);
  const assignedColor = assigneeUser?.color;
  const assignedShortName = assigneeUser?.shortname;
  return (
    <CircularBadge
      style={{ fontSize: '9px' }}
      backgroundColor={assignedColor || 'lightPeanut'}
      size="small"
      className={styles.assign_badge}
    >
      {assignedShortName || 'U'}
    </CircularBadge>
  );
}
