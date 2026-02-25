import { configureStore } from '@reduxjs/toolkit'
import { gamApi } from './states/gamApi'
import { googleAccessApi } from './states/googleAccessApi'
import { gamMonitoringApi } from './states/gamMonitoringApi'

export const store = configureStore({
    reducer: {
        [gamApi.reducerPath]: gamApi.reducer,
        [googleAccessApi.reducerPath]: googleAccessApi.reducer,
        [gamMonitoringApi.reducerPath]: gamMonitoringApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [gamApi.util.getRunningQueriesThunk.fulfilled],
            },
        }).concat(gamApi.middleware)
            .concat(googleAccessApi.middleware)
            .concat(gamMonitoringApi.middleware)
})
