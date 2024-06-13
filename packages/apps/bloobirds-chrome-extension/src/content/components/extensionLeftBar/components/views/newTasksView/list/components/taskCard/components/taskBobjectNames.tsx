import styles from "../../../taskTabsList.module.css";
import { Icon, IconType, Text } from "@bloobirds-it/flamingo-ui";
import { TaskFeedTask } from "../../../../types";
import { useIsB2CAccount } from "@bloobirds-it/hooks";
import { useExtensionContext } from "../../../../../../../../context";

function BobjectName({ name, icon, width, onClick }: { name: string; icon: IconType, width: `${number}%`, onClick: (e)=>void}) {
  return (
    <div className={styles.bobjectName} style={{maxWidth: width}} onClick={onClick}>
      <Icon name={icon} color="lightBloobirds" size={14} />
      <Text className={styles.bobjectNameText} color="bloobirds" size="xs" weight="bold">
        {name}
      </Text>
    </div>
  );
}

export function BobjectNames({ task }: { task: TaskFeedTask }) {
  const {setContactViewBobjectId} = useExtensionContext();
  const isB2CAccount = useIsB2CAccount();
  if(isB2CAccount){
    task.company = null;
  }
  const hasLeadAndMore = task.lead && (task.company || task.opportunity);
  const hasCompanyAndMore = task.company && task.opportunity;
  const numberOfBobjects = [task.lead, task.company, task.opportunity].filter(Boolean).length;
  const width = `${100 / numberOfBobjects}%` as `${number}%`;
  return (
    <div className={styles.bobjectNames}>
      {task.lead && <BobjectName name={task.lead.name} icon="person" width={width} onClick={(e)=> {
        e.stopPropagation()
        setContactViewBobjectId(task.lead.id);
      }} />}
      {hasLeadAndMore && <div className={styles.bobjectNamesSeparator} />}
      {task.company && !isB2CAccount && <BobjectName name={task.company.name} icon="company" width={width} onClick={(e)=> {
        e.stopPropagation()
        setContactViewBobjectId(task.company.id);
      }}/>}
      {hasCompanyAndMore && <div className={styles.bobjectNamesSeparator} />}
      {task.opportunity && <BobjectName name={task.opportunity.name} icon="fileOpportunity" width={width} onClick={(e)=>{
        e.stopPropagation()
        setContactViewBobjectId(task.opportunity.id)}
      }/>}
    </div>
  );
}
