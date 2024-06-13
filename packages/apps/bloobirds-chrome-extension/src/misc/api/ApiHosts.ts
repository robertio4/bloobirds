export const ApiHosts = (env => {
  if (env === 'production') {
    return {
      jwtService: {
        host: () => 'https://jwt-api.bloobirds.com',
      },
      restService: {
        host: () => 'https://rest-api.bloobirds.com',
      },
      webService: {
        host: () => 'https://web-api.bloobirds.com',
      },
      scheduleTaskService: {
        host: () => 'https://scheduler-create-task.bloobirds.com',
      },
      bobjectService: {
        host: () => 'https://bobject-api.bloobirds.com',
      },
      callService: {
        host: () => 'https://call-api.bloobirds.com',
      },
      websocket: {
        host: () => 'wss://frontend-ws.bloobirds.com/',
      },
    };
  }
  return {
    jwtService: {
      host: () => 'https://jwt-api.dev-bloobirds.com',
    },
    restService: {
      host: () => 'https://rest-api.dev-bloobirds.com',
    },
    webService: {
      host: () => 'https://web-api.dev-bloobirds.com',
    },
    scheduleTaskService: {
      host: () => 'https://scheduler-create-task.dev-bloobirds.com',
    },
    bobjectService: {
      host: () => 'https://bobject-api.dev-bloobirds.com',
    },
    callService: {
      host: () => 'https://call-api.dev-bloobirds.com',
    },
    websocket: {
      host: () => 'wss://htqb4xdhkf.execute-api.eu-central-1.amazonaws.com/dev/',
    },
  };
})(process.env.NODE_ENV);
