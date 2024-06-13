import React from 'react';
import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import styles from './linkedInCardPreview.module.css';

function FieldPreview({ name, required, type }) {
  return (
    <div role="listitem" className={styles.field}>
      <Text ellipsis={32} color={required ? 'softPeanut' : 'peanut'} size="s">
        {`${name}${required ? '*' : ''}`}
      </Text>
      <div className={styles.content}>
        <div className={styles.input}>
          {type === 'REFERENCE' && <Icon name="search" color="bloobirds" size={16} />}
          {type === 'PICKLIST' && <Icon name="chevronDown" color="verySoftPeanut" size={16} />}
          {type === 'DATE' && <Icon name="calendar" color="softPeanut" size={16} />}
        </div>
        {required ? (
          <Icon name="lock" color="softPeanut" size={16} />
        ) : (
          <div style={{ width: 16 }} />
        )}
      </div>
    </div>
  );
}

function LinkedInCardPreview({ selectedFields }) {
  return (
    <div className={styles.card}>
      <header>
        <div className={styles.line} style={{ color: 'var(--bloobirds)' }} />
        <div
          className={styles.badge}
          style={{
            color: 'var(--bloobirds)',
            backgroundColor: 'var(--verySoftBloobirds)',
          }}
        >
          <Icon name="person" color="bloobirds" size={32} />
        </div>
      </header>
      <div role="list" className={styles.list}>
        <FieldPreview name="First name" required type="TEXT" />
        {selectedFields.map(field => (
          <FieldPreview key={field.id} name={field.name} type={field.type} />
        ))}
      </div>
    </div>
  );
}

export default LinkedInCardPreview;
