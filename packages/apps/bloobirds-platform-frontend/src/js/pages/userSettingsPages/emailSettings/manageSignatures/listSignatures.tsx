import React from 'react';

import { SignatureProps, useSignatures } from '@bloobirds-it/hooks';

import styles from './manageSignatures.module.css';
import { SignatureItem } from './signatureItem';

const ListSignatures = ({
  signatureSelected,
  setSignatureSelected,
}: {
  signatureSelected: SignatureProps | undefined;
  setSignatureSelected: (signature: SignatureProps) => void;
}) => {
  const { data: signatures, deleteSignature, setAsDefault } = useSignatures();

  return (
    <div className={styles.listSignatures}>
      {signatures?.map((signature: SignatureProps) => (
        <SignatureItem
          key={signature.id}
          signature={signature}
          isSelected={signatureSelected?.id === signature.id}
          onClick={setSignatureSelected}
          onDelete={deleteSignature}
          onSetAsDefault={setAsDefault}
        />
      ))}
    </div>
  );
};

export default ListSignatures;
