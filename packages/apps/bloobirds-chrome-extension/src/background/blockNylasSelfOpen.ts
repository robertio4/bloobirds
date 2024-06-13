const newRules = [] as chrome.declarativeNetRequest.Rule[];
const blockUrls = ['*://nyl.as/open/*', '*://*.nyl.as/open/*', '*://t.nylas.com/open/*'];
blockUrls.forEach((domain, index) => {
  const rule: chrome.declarativeNetRequest.Rule = {
    id: index + 1,
    priority: 1,
    action: { type: 'block' as chrome.declarativeNetRequest.RuleActionType },
    condition: { urlFilter: domain },
  };

  newRules.push(rule);
});

chrome.declarativeNetRequest.getDynamicRules(previousRules => {
  const previousRuleIds = previousRules?.map(rule => rule.id);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: previousRuleIds,
    addRules: newRules,
  });
});
