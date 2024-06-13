import {
  FloatingLinkNewTabInput,
  FloatingLinkEditButton,
  FloatingLinkTextInput,
  FloatingLinkUrlInput,
  UseVirtualFloatingOptions,
} from '@udecode/plate';
import { createComponentAs, createElementAs, HTMLPropsAs } from '@udecode/plate-core';

import { OpenLinkButton } from './OpenLinkButton';
import { UnlinkButton } from './UnlinkButton';
import { useFloatingLinkEdit } from './useFloatingLinkEdit';
import { useFloatingLinkInsert } from './useFloatingLinkInsert';

export type FloatingLinkProps = HTMLPropsAs<'div'> & {
  floatingOptions?: UseVirtualFloatingOptions;
};

export const FloatingLinkEditRoot = createComponentAs<FloatingLinkProps>(props => {
  const htmlProps = useFloatingLinkEdit(props);

  if (htmlProps.style?.display === 'none') {
    return null;
  }

  return createElementAs('div', htmlProps);
});

export const FloatingLinkInsertRoot = createComponentAs<FloatingLinkProps>(props => {
  const htmlProps = useFloatingLinkInsert(props);

  if (htmlProps.style?.display === 'none') {
    return null;
  }

  return createElementAs('div', htmlProps);
});

export const FloatingLink = {
  EditRoot: FloatingLinkEditRoot,
  InsertRoot: FloatingLinkInsertRoot,
  UrlInput: FloatingLinkUrlInput,
  TextInput: FloatingLinkTextInput,
  NewTabInput: FloatingLinkNewTabInput,
  EditButton: FloatingLinkEditButton,
  UnlinkButton,
  OpenLinkButton,
};
