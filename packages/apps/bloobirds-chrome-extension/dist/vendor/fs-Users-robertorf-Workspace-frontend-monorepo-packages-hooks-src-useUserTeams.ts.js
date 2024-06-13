import { UserTeamRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export var TeamSortValues = /* @__PURE__ */ ((TeamSortValues2) => {
  TeamSortValues2["FromAZ"] = "fromAZ";
  TeamSortValues2["FromZA"] = "fromZA";
  TeamSortValues2["LastUpdateRecent"] = "lastUpdateRecent";
  TeamSortValues2["LastUpdateOldest"] = "lastUpdateOldest";
  return TeamSortValues2;
})(TeamSortValues || {});
export const TeamSortGroups = {
  ["fromAZ" /* FromAZ */]: { field: "name", order: "ASC" },
  ["fromZA" /* FromZA */]: { field: "name", order: "DESC" },
  ["lastUpdateOldest" /* LastUpdateOldest */]: { field: "updateDatetime", order: "ASC" },
  ["lastUpdateRecent" /* LastUpdateRecent */]: { field: "updateDatetime", order: "DESC" }
};
const fetchTeams = ([url]) => {
  return api.get(url);
};
export const useUserTeams = (onlyMine = false, sort = "fromAZ" /* FromAZ */) => {
  const { data, isLoading: isLoadingTeams, mutate } = useSWR(
    [
      "/utils/teamUser/list?orderBy=" + TeamSortGroups[sort]?.field + "&direction=" + TeamSortGroups[sort]?.order + (onlyMine ? "&onlyMine=true" : "")
    ],
    fetchTeams
  );
  const teams = data?.data;
  const managerOfTeams = (id) => {
    return teams?.filter(
      (t) => t?.teamUsers?.find((u) => u?.userId === id && u?.userRole === UserTeamRole.Manager)
    )?.length;
  };
  const getTeamsByManagerId = (id) => {
    const teamsFromManager = teams?.filter(
      (team) => team?.teamUsers?.find(
        (user) => user?.userId === id && user?.userRole === UserTeamRole.Manager
      )
    );
    return teamsFromManager?.length > 0 ? teamsFromManager : void 0;
  };
  const isManagerById = (id) => {
    return getTeamsByManagerId(id)?.length > 0;
  };
  const teamsAggregation = teams?.length;
  const teamUsersAggregation = teams?.reduce((acc, team) => {
    return acc + (team?.teamUsers?.length || 0);
  }, 0) + teamsAggregation;
  return {
    teams,
    isLoadingTeams,
    noTeams: teams?.length === 0,
    mutate,
    getTeamsByManagerId,
    isManagerById,
    managerOfTeams,
    teamsAggregation,
    teamUsersAggregation
  };
};
