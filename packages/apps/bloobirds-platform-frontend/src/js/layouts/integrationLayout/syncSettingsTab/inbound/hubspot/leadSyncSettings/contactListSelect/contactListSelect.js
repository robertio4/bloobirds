import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { Dropdown, Input, Item, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useVirtual } from 'react-virtual';
import styles from './contactListSelect.module.css';

const ContactListSelect = ({ config, visible, contactLists, handleVisible, handleSelect }) => {
  const parentRef = useRef();
  const [list, setList] = useState(contactLists);
  const handleChange = (value, prop) =>
    contactLists.length > 0 &&
    contactLists?.filter(lt =>
      lt[prop]?.toString().toLowerCase().includes(value?.toString().toLowerCase()),
    );
  const [inputValue, setInputValue] = useState(
    config.contactList ? contactLists?.find(l => l.listId === config.contactList)?.name : '',
  );

  const handleClickOutside = event => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      handleVisible(false);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const onChange = (value, prop) => {
    handleVisible(true);
    setList(handleChange(value, prop));
    setInputValue(value);
  };

  const rowVirtualizer = useVirtual({
    size: list?.length,
    parentRef,
    estimateSize: useCallback(() => 35, []),
    overscan: 10,
  });

  const onHandleClick = value => {
    handleSelect(value.listId);
    setInputValue(value.name);
    handleVisible(false);
  };
  return (
    <>
      <Dropdown
        target={document.getElementById('portal')}
        anchor={
          <div className={styles._input} onClick={() => handleVisible(!visible)} id="portal">
            <Input
              width="100%"
              onChange={value => onChange(value, 'name')}
              icon="chevronDown"
              value={inputValue}
            />
          </div>
        }
        arrow={false}
        visible={visible}
        position="bottom"
        width="238px"
      >
        <div ref={parentRef} className={styles._container}>
          <div
            style={{
              height: `${rowVirtualizer.totalSize}px`,
            }}
            className={styles._relative}
          >
            {rowVirtualizer.virtualItems.map(virtualRow => (
              <div
                key={virtualRow.index}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={styles._item}
              >
                <Item value={list[virtualRow.index]} onClick={onHandleClick}>
                  <Tooltip title={list[virtualRow.index].name} position="right">
                    <Text ellipsis={25} size="s">
                      {list[virtualRow.index].name}
                    </Text>
                  </Tooltip>
                </Item>
              </div>
            ))}
          </div>
        </div>
      </Dropdown>
    </>
  );
};

export default ContactListSelect;
