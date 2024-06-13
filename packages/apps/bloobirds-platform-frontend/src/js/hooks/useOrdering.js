import { WebApi } from '../misc/api/web';

export const useOrdering = () => {
  /*
    List must have the following structure
    {
        "entities": [
            {
                "id": "bla",
                "ordering": 0,
            },
            ...
        ]
    }
     */
  const handleUpdateOrdering = ({ list, entityName, callback }) => {
    WebApi.genericCreate({
      path: `service/ordering/${entityName}`,
      body: {
        entities: list,
      },
    })
      .then(res => {
        callback({
          response: res,
          error: false,
        });
      })
      .catch(err => {
        callback({
          response: err,
          error: true,
        });
      });
  };

  // list must contain an ID and an ordering field
  const parseOrderingRequest = ({ list, takeIndex }) =>
    list.map((el, i) => ({ id: el.id, ordering: takeIndex ? i + 1 : list.ordering }));

  return {
    handleUpdateOrdering,
    parseOrderingRequest,
  };
};
