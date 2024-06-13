import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import { documents } from './documents';
import { commonWords } from './commonWords';
const matchedDocumentsAtom = atom({
  key: 'matchedDocumentsAtom',
  default: [],
});

const allDocumentsAtom = atom({
  key: 'allDocumentsAtom',
  default: [],
});

const matchDocuments = (input: string) => {
  if (!input) {
    return [];
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return [];
  }
  const words = trimmed.split(' ');

  const noCommonWords = words.filter(w => !commonWords.includes(w));

  let matched = [];
  const docs = [...documents];
  noCommonWords.forEach(word => {
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      // @ts-ignore
      if (doc?.textAnalysis?.summary?.includes(word)) {
        matched = [...matched, ...docs.splice(i, 1)];
      }
    }
  });
  return matched;
};

const filterDocuments = (input: string) => {
  if (!input) {
    return [];
  }
  const trimmed = input.trim();
  if (!trimmed) {
    return [];
  }
  const words = trimmed.split('\\P{L}+');
  const noCommonWords = words.filter(w => !commonWords.includes(w));
  let matched = [];
  const docs = documents;
  noCommonWords.forEach(word => {
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      // @ts-ignore
      if (doc?.title?.includes(word)) {
        matched = [...matched, ...docs.splice(i, 1)];
      }
    }
  });
  return matched;
};

export const useDocumentMatchingContext = () => {
  const [inputForMatching, setInputForMatching] = useState<string>('');
  const [matchedDocuments, setMatchedDocuments] = useRecoilState(matchedDocumentsAtom);
  const [allDocuments, setAllDocuments] = useRecoilState(allDocumentsAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAllLoading, setIsAllLoading] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // update 'term' value after 1 second from the last update of 'debouncedTerm'
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue), 1000);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    // api.post('/nlp/analytics/match', { inputs: inputForMatching }).then(res => {
    //   setMatchedDocuments(res.data);
    //   setIsLoading(false);
    // });
    if (inputForMatching) {
      const docs = matchDocuments(inputForMatching);
      setMatchedDocuments([...docs]);
    }
  }, [inputForMatching]);

  useEffect(() => {
    if (!isAllLoading) {
      setIsAllLoading(true);
      // api
      //   .get(`/nlp/document`, {
      //     params: {
      //       title: debouncedSearch,
      //     },
      //   })
      //   .then(res => {
      //     setAllDocuments(res.data);
      //     setIsAllLoading(false);
      //   });
      setTimeout(() => {
        setAllDocuments(filterDocuments(debouncedSearch));
        setIsAllLoading(false);
      }, 500);
    }
  }, [debouncedSearch]);

  return {
    isLoading,
    isAllLoading,
    allDocuments,
    matchedDocuments,
    inputForMatching,
    setInputForMatching,
    setSearchValue,
  };
};
