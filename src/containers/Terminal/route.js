if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import { injectAsyncReducer } from 'store';


export default function createRoutes(store) {
  return {
    path: 'terminal',
    getComponent(location, cb) {
      require.ensure([], (require) => {
        injectAsyncReducer(store, 'terminal', require('./reducer').default);

        cb(null, require('./Terminal').default);
      });
    },
  };
}
