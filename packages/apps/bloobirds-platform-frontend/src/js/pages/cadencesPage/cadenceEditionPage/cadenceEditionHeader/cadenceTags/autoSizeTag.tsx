import React, { useEffect, useRef, useState } from 'react';
import AutosizeInput from 'react-input-autosize';
import { useClickAway } from 'react-use';

import { Button, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { CadenceTagType } from '@bloobirds-it/types';
import classNames from 'clsx';

import { CadenceTag } from './cadenceTagsBlock';
import styles from './cadenceTagsBlock.module.css';

const AutoSizeTag = ({
  cadenceTags,
  onAddCallback,
}: {
  cadenceTags: CadenceTagType[];
  onAddCallback: (tag: string | CadenceTagType) => void;
}) => {
  const inputRef = useRef<AutosizeInput>();
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(true);
  const { ref, visible: dropdownFocused, setVisible } = useVisible(true);
  const filteredTags =
    searchTerm?.length > 0 ? cadenceTags.filter(tag => tag.name.includes(searchTerm)) : cadenceTags;
  useClickAway(ref, () => onAddCallback(searchTerm));

  function setDropdownFocused(focus: boolean) {
    setVisible(v => (v === focus ? v : focus));
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault();
      onAddCallback(searchTerm);
    }
    setDropdownFocused(true);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <div
      className={classNames(styles.autoSizeContainer)}
      onClick={() => {
        const input = inputRef.current.getInput();
        input.focus();
      }}
    >
      <AutosizeInput
        ref={inputRef as any}
        value={searchTerm}
        inputClassName={styles.input}
        type="text"
        id="tag-input"
        autoComplete="off"
        onFocus={() => {
          setFocused(true);
          setDropdownFocused(true);
        }}
        onBlur={() => {
          setFocused(true);
          setFocused(false);
        }}
        onKeyDown={handleKeyDown}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
        }}
      />
      {focused || dropdownFocused ? (
        <div
          role="listbox"
          className={styles.dropdown}
          ref={ref}
          onClick={event => {
            event.stopPropagation();
            event.stopPropagation();
          }}
        >
          {filteredTags?.length > 0 ? (
            filteredTags.map((tag: CadenceTagType, idx: number) => (
              <CadenceTag
                key={tag.id + '_' + idx}
                tag={tag}
                handleAddTag={() => {
                  onAddCallback(tag);
                }}
              />
            ))
          ) : (
            <div className={styles.noTagsFound}>
              <Text color="softPeanut" size="s" align="center">
                No tags matching "{searchTerm}"
              </Text>
              <Button
                variant="clear"
                iconLeft="plus"
                onClick={() => onAddCallback(searchTerm)}
                uppercase={false}
              >
                Click enter to add
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AutoSizeTag;
