import {
  SimilarDealsFields,
  SimilarDealsFieldsLabels
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
export const getIconFromType = (type) => {
  switch (type) {
    default:
      return "link";
  }
};
export const getIconColorFromType = (type) => {
  switch (type) {
    case "pdf":
      return "extraMeeting";
    default:
      return "bloobirds";
  }
};
export const getEmojiIcon = (type) => {
  switch (type) {
    default:
      return "\u{1F517}  ";
  }
};
const getKeywordsFromEntities = (entities) => {
  if (entities) {
    const entitiesValues = Object.values(entities);
    let entitiesTokens = [];
    entitiesValues.forEach((values) => {
      entitiesTokens = [
        ...entitiesTokens,
        ...values.map((e) => {
          return {
            text: e.id.normalizedText,
            type: e.id.entityGroup
          };
        })
      ];
    });
    return entitiesTokens;
  }
  return [];
};
export const parseDocuments = (matchedDocuments) => {
  const transformedMatchedDocuments = matchedDocuments.map((doc) => {
    const type = doc?.mimeType?.split("/")[doc?.mimeType?.split("/")?.length - 1];
    return {
      id: doc.id,
      icon: getIconFromType(type),
      iconColor: getIconColorFromType(type),
      title: doc.title,
      summary: doc?.textAnalysis?.summary,
      link: doc.url,
      fileLink: doc.url,
      date: new Date(doc.updatedAt),
      keywords: getKeywordsFromEntities(doc?.textAnalysis?.entities),
      thumbnail: doc.thumbnail
    };
  });
  return transformedMatchedDocuments;
};
export const prepareBodyToBeSerialized = (attachedLinks, body) => {
  if (attachedLinks?.length > 0) {
    return [
      ...body,
      ...attachedLinks.map((file) => {
        return {
          type: "p",
          children: [
            { text: getEmojiIcon(file.type) },
            {
              type: "a",
              url: file.link,
              children: [{ text: file.title, bold: true, underline: true }]
            },
            { text: "" }
          ]
        };
      })
    ];
  } else {
    return body;
  }
};
export const getChemistryColor = (chemistry) => {
  if (chemistry >= 75) {
    return "extraCall";
  } else if (chemistry < 50) {
    return "softBanana";
  } else {
    return "banana";
  }
};
export const getCompanyFieldsByType = (type) => type === "Account" ? [
  SimilarDealsFields.CONTACT,
  SimilarDealsFields.ACCOUNT_EXECUTIVE,
  SimilarDealsFields.CLOSE_DATE,
  SimilarDealsFields.AMOUNT
] : [
  SimilarDealsFields.CONTACT,
  SimilarDealsFields.ACCOUNT_EXECUTIVE,
  SimilarDealsFields.CLIENT_DATE
];
export const getIconName = (label) => {
  switch (label) {
    case SimilarDealsFieldsLabels.contact:
    case SimilarDealsFieldsLabels.accountExecutive:
      return "person";
    case SimilarDealsFieldsLabels.clientDate:
    case SimilarDealsFieldsLabels.closeDate:
      return "fileOpportunity";
    default:
      return "check";
  }
};
