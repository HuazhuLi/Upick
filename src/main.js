/**
 *
 *
 *
 *
 *
 */

import './plugins/zhugeio'
(async function () {
  /**
   * Async-loading of this App, will be
   * bundled to a chunk named 0.js, 500kb
   */
  await import('./App.js')
})()
