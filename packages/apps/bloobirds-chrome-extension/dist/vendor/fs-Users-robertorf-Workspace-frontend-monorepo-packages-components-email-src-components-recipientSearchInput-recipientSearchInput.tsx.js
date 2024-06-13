import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.tsx.js");import RefreshRuntime from "/vendor/react-refresh.js";
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/recipientSearchInput.tsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _jsxFileName = "/Users/robertorf/Workspace/frontend-monorepo/packages/components/email/src/components/recipientSearchInput/recipientSearchInput.tsx", _s = $RefreshSig$();
import __vite__cjsImport2_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport2_react["useEffect"]; const useRef = __vite__cjsImport2_react["useRef"]; const useState = __vite__cjsImport2_react["useState"];
import __vite__cjsImport3_reactInputAutosize from "/vendor/.vite-deps-react-input-autosize.js__v--a9f38eda.js"; const AutosizeInput = __vite__cjsImport3_reactInputAutosize.__esModule ? __vite__cjsImport3_reactInputAutosize.default : __vite__cjsImport3_reactInputAutosize;
import { Spinner, useVisible } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { isEmail } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import classNames from "/vendor/.vite-deps-clsx.js__v--07c00239.js";
import { DropdownHeader } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-components-dropdownHeader.tsx.js";
import { EmailBadge } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-components-emailBadge.tsx.js";
import NoContacts from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-components-noContacts.tsx.js";
import { SelectableItem } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-components-selectableItem.tsx.js";
import { useParseEmailsIntoContact, useRecipientSeachInput } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-hooks-useRecipient.ts.js";
import styles from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.module.css.js";
import { jsxDEV as _jsxDEV } from "/vendor/id-__x00__react-jsx-dev-runtime.js";
export const emptyContact = {
  bobject: void 0,
  email: "",
  icon: "questionCircle",
  isInDB: false,
  referenceId: "",
  name: "Unknown"
};
export var SearchType = /* @__PURE__ */ ((SearchType2) => {
  SearchType2[SearchType2["relatedBobjects"] = 0] = "relatedBobjects";
  SearchType2[SearchType2["globalSearch"] = 1] = "globalSearch";
  SearchType2[SearchType2["companySearch"] = 2] = "companySearch";
  return SearchType2;
})(SearchType || {});
export function RecipientSearchInput(props) {
  _s();
  const {
    id,
    emails,
    onChange,
    contextProps
  } = props;
  const {
    accountId,
    activeBobject,
    company,
    dataModel,
    filters,
    setFilters,
    setLeadCreatedCallback,
    setRelatedBobjectsInfo
  } = contextProps;
  const inputRef = useRef();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const {
    relatedContacts,
    availableCompanyContacts,
    availableContacts,
    availableGlobalContacts,
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType,
    isValidating
  } = useRecipientSeachInput({
    company,
    dataModel,
    selectedContacts
  });
  const [focused, setFocused] = useState(false);
  const {
    ref,
    visible: dropdownFocused,
    setVisible
  } = useVisible(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hasLoadContacts, setHasLoadContacts] = useState(false);
  const historyRef = useRef([selectedContacts]);
  function setDropdownFocused(focus) {
    setVisible((v) => v === focus ? v : focus);
  }
  const firstValidEmail = selectedContacts?.findIndex((c) => isEmail(c.email) && c.isInDB);
  const isFirstLoad = selectedContacts.length === 0 && searchTerm === "" && !hasLoadContacts;
  const {
    contacts,
    isLoadingContacts
  } = useParseEmailsIntoContact(accountId, isFirstLoad, emails, dataModel);
  useEffect(() => {
    if (!isLoadingContacts && contacts && contacts.length > 0) {
      setSelectedContacts(contacts);
      onChange(contacts);
      updateRelatedBobjectsInfo(contacts, contacts[0]);
    }
    if (!isLoadingContacts) {
      setHasLoadContacts(true);
    }
  }, [isLoadingContacts]);
  const hasNoEmailsLeftOnContext = relatedContacts.filter((c) => !selectedContacts.some((selectedC) => selectedC.email === c.email)).length === 0;
  useEffect(() => {
    if (company && !hasNoEmailsLeftOnContext) {
      setSearchType(0 /* relatedBobjects */);
    } else {
      setSearchType(1 /* globalSearch */);
    }
  }, [!!company, hasNoEmailsLeftOnContext]);
  useEffect(() => {
    setLeadCreatedCallback?.(() => (leadEmail) => {
      setSelectedContacts((selected) => selected?.map((contact) => contact.email?.toLowerCase() === leadEmail ? {
        ...contact,
        isInDB: true
      } : contact));
    });
  }, []);
  useEffect(() => {
    if ((!dropdownFocused || availableContacts?.length === 0) && !focused && searchTerm) {
      const contact = availableGlobalContacts?.find((agc) => agc.email === searchTerm);
      if (contact) {
        selectContact(contact);
      } else {
        createContact(searchTerm);
      }
      setSearchTerm("");
    }
  }, [dropdownFocused, focused]);
  const updateRelatedBobjectsInfo = (updatedContacts, contact) => {
    if (contact.bobject) {
      const isActiveBobject = contact.bobject.id.value === activeBobject?.id.value;
      const enrichedBobject = {
        ...contact.bobject,
        ...isActiveBobject ? {
          rawBobject: activeBobject?.rawBobject ?? activeBobject?.raw?.contents
        } : {}
      };
      const dataToUpdate = {
        activeBobject: enrichedBobject
      };
      if (contact?.bobject?.bobjectType === BobjectTypes.Company) {
        dataToUpdate.company = contact.bobject;
      } else {
        setFilters({
          ...filters,
          lead: updatedContacts.reduce((acc, {
            bobject
          }) => {
            if (bobject?.bobjectType === BobjectTypes.Lead)
              return [...acc, bobject?.id.value];
            else
              return acc;
          }, [])
        });
        const setNewCompany = filters.lead.length === 0 && contact.bobject?.bobjectType === BobjectTypes.Lead && contact.bobject?.company;
        if (setNewCompany) {
          dataToUpdate.company = contact.bobject.company;
        }
      }
      setRelatedBobjectsInfo(dataToUpdate);
    }
  };
  const selectContact = (contact) => {
    const updatedContacts = [...selectedContacts, contact];
    setSelectedContacts(updatedContacts);
    setSearchTerm("");
    onChange(updatedContacts);
    if (isEmail(contact.email) && searchType !== 2 /* companySearch */) {
      updateRelatedBobjectsInfo(updatedContacts, contact);
    }
    setSelectedIndex(-1);
    if (searchType === 1 /* globalSearch */ && !focused) {
      setDropdownFocused(false);
    }
    if (searchType === 0 /* relatedBobjects */) {
      const leftContacts = relatedContacts.filter((c) => !updatedContacts?.find((selectedC) => selectedC.email?.toLowerCase() === c.email?.toLowerCase()));
      if (leftContacts.length === 0) {
        setSearchType(1 /* globalSearch */);
      }
    }
    if (searchType === 2 /* companySearch */) {
      const leftContacts = availableContacts.filter((c) => !updatedContacts?.find((selectedC) => selectedC.email?.toLowerCase() === c.email?.toLowerCase()));
      if (leftContacts.length === 0) {
        setSearchType(1 /* globalSearch */);
      }
    }
  };
  const unselectContact = (contact, index) => {
    const updatedContacts = [...selectedContacts];
    if (contact) {
      updatedContacts.splice(index, 1);
    } else {
      updatedContacts.pop();
    }
    const updatedContactsEmails = updatedContacts.map((contact2) => contact2?.bobject?.id?.value);
    setFilters({
      ...filters,
      lead: updatedContactsEmails.reduce((acc, email) => {
        if (email && email.includes(BobjectTypes.Lead))
          return [...acc, email];
        else
          return acc;
      }, [])
    });
    const contactIndex = selectedContacts?.findIndex((c) => c.email === contact?.email);
    if (contactIndex === firstValidEmail && selectedContacts.length > 1) {
      const lastContact = updatedContacts?.find((c) => isEmail(c.email) && c.isInDB);
      if (lastContact && lastContact.bobject) {
        setRelatedBobjectsInfo({
          ...!activeBobject ? {
            activeBobject: lastContact.bobject
          } : {},
          ...activeBobject && activeBobject === contact.bobject ? {
            activeBobject: lastContact.bobject
          } : {},
          company: lastContact.bobject.bobjectType === BobjectTypes.Lead ? lastContact.bobject.company : lastContact.bobject
        });
      }
    }
    setSelectedContacts(updatedContacts);
    onChange(updatedContacts);
  };
  const createContact = (email) => {
    if (email.trim() !== "") {
      const contact = {
        ...emptyContact,
        email,
        isInDB: availableContacts?.some((c) => c.email?.toLowerCase() === email?.toLowerCase())
      };
      selectContact(contact);
    }
  };
  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "z") {
      if (historyRef.current.length > 2) {
        historyRef.current.pop();
        const previousLabels = historyRef.current.pop();
        setSelectedContacts(previousLabels);
        onChange(previousLabels);
      }
    } else if (event.key === "ArrowDown") {
      setSelectedIndex((selectedIndex + 1) % availableContacts.length);
    } else if (event.key === "ArrowUp") {
      setSelectedIndex(selectedIndex <= 0 ? availableContacts.length - 1 : (selectedIndex - 1) % availableContacts.length);
    } else if (event.key === "Backspace" && searchTerm === "" && selectedContacts?.length > 0) {
      unselectContact();
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      if (searchTerm !== "") {
        if (availableContacts[selectedIndex]) {
          selectContact(availableContacts[selectedIndex]);
        } else if (availableContacts.filter((contact) => contact.email === searchTerm?.toLowerCase())?.length > 0) {
          selectContact(availableContacts.filter((contact) => contact.email === searchTerm?.toLowerCase())[0]);
        } else {
          createContact(searchTerm);
        }
        setSearchTerm("");
      } else if (searchType !== 1 /* globalSearch */ && availableContacts && availableContacts?.[selectedIndex]) {
        selectContact(availableContacts[selectedIndex]);
      }
    }
    setDropdownFocused(true);
  };
  const handleDropdownChipClick = (type) => {
    setDropdownFocused(true);
    if (type !== searchType) {
      setSearchType(type);
    }
  };
  return /* @__PURE__ */ _jsxDEV("div", {
    className: classNames(styles.container),
    onClick: () => {
      const input = inputRef.current.getInput();
      input.focus();
    },
    children: [selectedContacts?.map((contact, index) => {
      function isOutsiderEmail() {
        if (contact.isCompanyMember)
          return false;
        else if (company)
          return company.id.value !== contact?.referenceId;
        else {
          return selectedContacts.slice(0, index).some((c) => c.isInDB);
        }
      }
      const isOutsider = isOutsiderEmail();
      return /* @__PURE__ */ _jsxDEV(EmailBadge, {
        contact,
        unselectEmail: () => unselectContact(contact, index),
        isOutsider
      }, contact.email + index, false, {
        fileName: _jsxFileName,
        lineNumber: 350,
        columnNumber: 11
      }, this);
    }), /* @__PURE__ */ _jsxDEV(AutosizeInput, {
      ref: inputRef,
      value: searchTerm,
      inputClassName: styles.input,
      type: "text",
      id: `${id}-input`,
      "aria-autocomplete": "list",
      "aria-controls": `${id}-listbox`,
      "aria-activedescendant": availableContacts?.[selectedIndex] ? `${availableContacts[selectedIndex]}-option` : null,
      autoComplete: "off",
      onKeyDown: handleKeyDown,
      onFocus: () => {
        setFocused(true);
        setDropdownFocused(true);
      },
      onBlur: () => {
        setFocused(true);
        setFocused(false);
      },
      onChange: (event) => {
        const trimmedValue = event.target.value.trim();
        setSearchTerm(isEmail(trimmedValue) ? trimmedValue : event.target.value);
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 358,
      columnNumber: 7
    }, this), focused || dropdownFocused ? /* @__PURE__ */ _jsxDEV("div", {
      role: "listbox",
      id: `${id}-listbox`,
      className: styles.dropdown,
      ref,
      children: [/* @__PURE__ */ _jsxDEV(DropdownHeader, {
        hasValuesAdded: selectedContacts.length > 0,
        searchType,
        hasCompany: !!company,
        hasNoEmailsLeftOnContext,
        handleDropdownChipClick,
        allCoworkersAdded: availableCompanyContacts && availableContacts?.length > 0 && availableContacts.every(({
          email
        }) => selectedContacts.some(({
          email: selectedEmail
        }) => selectedEmail === email))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 386,
        columnNumber: 11
      }, this), /* @__PURE__ */ _jsxDEV("div", {
        className: styles.dropdownContent,
        children: (searchTerm !== "" || searchType !== 1 /* globalSearch */) && availableContacts?.length > 0 ? isValidating ? /* @__PURE__ */ _jsxDEV("div", {
          className: styles.spinnerContainer,
          children: /* @__PURE__ */ _jsxDEV(Spinner, {
            name: "loadingCircle"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 405,
            columnNumber: 19
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 404,
          columnNumber: 17
        }, this) : availableContacts?.map((contact, index) => /* @__PURE__ */ _jsxDEV(SelectableItem, {
          contact,
          selectContact: (contact2) => {
            selectContact(contact2);
            setSearchTerm("");
            setDropdownFocused(false);
            setFocused(false);
          },
          selectedIndex,
          setSelectedIndex,
          index
        }, contact.email + index, false, {
          fileName: _jsxFileName,
          lineNumber: 409,
          columnNumber: 19
        }, this)) : /* @__PURE__ */ _jsxDEV(NoContacts, {
          hasSearchTerm: searchTerm !== "" && !isValidating
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 425,
          columnNumber: 15
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 400,
        columnNumber: 11
      }, this)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 385,
      columnNumber: 9
    }, this) : null]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 332,
    columnNumber: 5
  }, this);
}
_s(RecipientSearchInput, "JD+E6eJ6pFpKfWBIhRy/Aj1i86Q=", false, function() {
  return [useRecipientSeachInput, useVisible, useParseEmailsIntoContact];
});
_c = RecipientSearchInput;
var _c;
$RefreshReg$(_c, "RecipientSearchInput");
if (import.meta.hot) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  if (!window.__vite_plugin_react_timeout) {
    window.__vite_plugin_react_timeout = setTimeout(() => {
      window.__vite_plugin_react_timeout = 0;
      RefreshRuntime.performReactRefresh();
    }, 30);
  }
}
