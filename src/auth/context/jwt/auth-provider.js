// import PropTypes from 'prop-types';
// import { useEffect, useReducer, useCallback, useMemo } from 'react';
// // utils
// // import axios, { endpoints } from 'src/utils/axios';
// import axios from 'axios';
// //
// import { endpoints } from 'src/utils/axios';

// import { AuthContext } from './auth-context';
// import { isValidToken, setSession } from './utils';

// // ----------------------------------------------------------------------

// // NOTE:
// // We only build demo at basic level.
// // Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// // ----------------------------------------------------------------------

// const initialState = {
//   user: null,
//   loading: true,
// };

// const reducer = (state, action) => {
//   if (action.type === 'INITIAL') {
//     return {
//       loading: false,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGIN') {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'REGISTER') {
//     return {
//       ...state,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGOUT') {
//     return {
//       ...state,
//       user: null,
//     };
//   }
//   return state;
// };

// // ----------------------------------------------------------------------

// const STORAGE_KEY = 'accessToken';

// export function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const initialize = useCallback(async () => {
//     try {
//       const accessToken = sessionStorage.getItem(STORAGE_KEY);

//       if (accessToken && isValidToken(accessToken)) {
//         setSession(accessToken);

//         const response = await axios.get(endpoints.auth.me);

//         const { user } = response.data;

//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user,
//           },
//         });
//       } else {
//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user: null,
//           },
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch({
//         type: 'INITIAL',
//         payload: {
//           user: null,
//         },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   // LOGIN
//   const login = useCallback(async (emp_id, password) => {
//     const data = {
//       emp_id,
//       password,
//     };
//    console.log('hello login');
//    console.log(data);
//    try{
  
//     const response = await axios.get(`https://localhost:7124/api/Login`).then(res =>{
//       console.log(res);
//     }).catch(error =>{
//       console.log(error)
//     });
//     const { accessToken, user } = response.data;
    
//     setSession(accessToken);

//     dispatch({
//       type: 'LOGIN',
//       payload: {
//         user,
//       },
//     });
//    }
//    catch(e){
//     console.log('error: ', e)
//    }
//   // try {
//   //   const response = await axios.get(`/api/Login`).then(res =>{
//   //     console.log(res);
//   //   });
//   //     console.log(response)
//   // } catch (error) {
//   //  console.log('err',error)
    
//   // }
    

//   }, []);

//   // REGISTER
//   const register = useCallback(async (email, password, firstName, lastName) => {
//     const data = {
//       email,
//       password,
//       firstName,
//       lastName,
//     };

//     const response = await axios.post(endpoints.auth.register, data);

//     const { accessToken, user } = response.data;

//     sessionStorage.setItem(STORAGE_KEY, accessToken);

//     dispatch({
//       type: 'REGISTER',
//       payload: {
//         user,
//       },
//     });
//   }, []);

//   // LOGOUT
//   const logout = useCallback(async () => {
//     setSession(null);
//     dispatch({
//       type: 'LOGOUT',
//     });
//   }, []);

//   // ----------------------------------------------------------------------

//   const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

//   const status = state.loading ? 'loading' : checkAuthenticated;

//   const memoizedValue = useMemo(
//     () => ({
//       user: state.user,
//       method: 'jwt',
//       loading: status === 'loading',
//       authenticated: status === 'authenticated',
//       unauthenticated: status === 'unauthenticated',
//       //
//       login,
//       register,
//       logout,
//     }),
//     [login, logout, register, state.user, status]
//   );

//   return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
// }

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };
import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      const user = sessionStorage.getItem('user')
      console.log('accessToken', accessToken, user)
      if (accessToken && user) {
        console.log('entered')
        setSession(accessToken, user);

        // const response = await axios.get(endpoints.auth.me);

        // const { user } = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (emp_id, password) => {
    const data = {
      emp_id,
      password,
    };

    const response = await axios.post(endpoints.auth.login, data);
   console.log(response);
    const { accessToken, user } = response.data;

    setSession(accessToken,user);

    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    const response = await axios.post(endpoints.auth.register, data);

    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
