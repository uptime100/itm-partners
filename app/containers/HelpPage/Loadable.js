/**
 *
 * Asynchronously loads the component for Marketing
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
