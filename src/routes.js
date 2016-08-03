// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

// import Foo from 'containers/Foo';
import Terminal from 'containers/Terminal';

export function createRoutes() {
  return {
    path: '/',
    // component: Foo,
    components: Terminal,
  };
}
