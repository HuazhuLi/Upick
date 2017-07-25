/**
 *
 *
 *
 *
 *
 */

import './plugins/zhugeio'

const consoleLogStyle = `
line-height: 50px;
height: 50px;
display: inline-block;
background: #fe921f;
color: #FFFFFF;
padding: 20px 20px 16px 20px;
`

console.log(`%c    Upick!   `, consoleLogStyle + 'font-size:32px;')
console.log(`%cPowered By Bingyan Studio`, consoleLogStyle + 'font-size:16px;padding-right:23px;');

(async function () {
  /**
   * Async-loading of this App, will be
   * bundled to a chunk named 0.js, 500kb
   */
  await import('./App.js')
})()
