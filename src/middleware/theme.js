import { cookies } from '../utils/misc';

export default function ({ app, store } = {}) {
  const theme = cookies.getCookie( app, 'js:theme' ) || 'default';

  store.dispatch( 'ui/setTheme', theme );
}
