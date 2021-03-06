/**
 * @flow
 */

const SolidRender = require( '../class/SolidRender' )
const SysErrors = require( '../lib/SysErrors' )

/**
 * SolidError API for working with options, styles and external definitions.
 * @module shared/SolidApi
 * @author Roberto Mauro <erremauro@icloud.com>
 * @version 0.1.0
 * @since 0.3.0
 */
const SolidApi = {
  setOptions,
  getOptions,
  setStyles,
}

/**
 * @memberOf module:shared/SolidApi
 * @type {SolidErrorOptions}
 */
let options: SolidErrorOptions = {
  renderer: new SolidRender(),
  lang: 'en',
  includes: [],
}

function updateSysErrorsOptions() {
  SysErrors.setOptions({
    lang: options.lang,
    includes: options.includes
  })
}

/**
 * Update library options.
 * @memberOf module:lib/solidapi
 * @param {SolidErrorOptions} props Library options
 * @version 0.1.0
 * @since 0.1.0
 * @returns {SolidErrorOptions} Updated options
 */
function setOptions ( props: SolidErrorOptions ): SolidErrorOptions {
  options = Object.assign( options, props )
  updateSysErrorsOptions()
  return options
}

/**
 * Get the current library options
 * @memberOf module:lib/solidapi
 * @returns {SolidErrorOptions} The options object
 * @version 0.1.0
 * @since 0.1.0
 */
function getOptions (): SolidErrorOptions {
  return options
}

/**
 * Set the default library renderer styles. Note that updating styles when
 * a custom renderer is currently active, it will have no effect.
 * @memberOf module:lib/solidapi
 * @param {module:soliderror~SolidRenderStyles} props Solid Renderer styles
 * @returns {undefined}
 * @version 0.1.0
 * @since 0.1.0
 */
function setStyles ( props: SolidRenderStyles ) {
  if ( !options.renderer ) return
  if ( options.renderer.constructor.name === 'SolidRender' ) {
    options.renderer.setProps( props )
  }
}

module.exports = SolidApi
