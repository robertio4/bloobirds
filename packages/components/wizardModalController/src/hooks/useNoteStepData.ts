import React, { useState } from 'react';

interface NoteStepDataInterface {
  noteStepData: { value: string; fieldId: string };
  setNoteStepData: React.Dispatch<React.SetStateAction<{ value: string; fieldId: string }>>;
}

export const useNoteStepData = (): NoteStepDataInterface => {
  const [noteStepData, setNoteStepData] = useState<{
    value: string;
    fieldId: string;
  }>();
  return {
    noteStepData,
    setNoteStepData,
  };
};
