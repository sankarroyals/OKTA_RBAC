import {configureStore} from '@reduxjs/toolkit';
import authorizationReducer from '../redux/Auth';
import roleBasedAccessContolReducer from '../redux/RoleBasedAccess';

import configureCallSlice from './features/configurations';

const store = configureStore({
  reducer: {
    roleBasedAccess: roleBasedAccessContolReducer,
    authorizationState: authorizationReducer,
    
    configurations: configureCallSlice,
  },
});

export default store;
