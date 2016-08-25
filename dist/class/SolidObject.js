'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @overview
 *
 * A base class with properties management.
 * {@link module:class/SolidObject~SolidObject|SolidObject} has built-in
 * methods for safely assign properties to an object. By subclassing
 * {@link module:class/SolidObject~SolidObject|SolidObject} is possible
 * to override props update notification methods like `propsShouldUpdate`,
 * `propsWillUpdate` and `propsDidUpdate`.
 *
 * @module class/SolidObject
 * @author    Roberto Mauro <erremauro@icloud.com>
 * @license   MIT License. See LICENSE file in the root directory.
 * @version   0.1.0
 * @since     0.3.1
 *
 * 
 */

/**
 * @class
 * @classdesc
 * An object with better props assignment.
 * Note that the `props` property should always be updated using  the `setProps`
 * method. Direct changes to the `props` object will not trigger props
 *
 * @example
 *
 * const DefaultProps = {
 *   name: 'John Doe',
 *   birthday: new Date(1900,01,01),
 *   gender: "unknown"
 * }
 *
 * class Person extends SolidObject {
 *   constructor( props ) {
 *     super( props, DefaultProps )
 *   }
 *
 *   propsShouldUpdate( props ) {
 *     if ( props.birthday !== this.props.birthday ) {
 *       console.log(`${this.props.name}, once born you can\'t reborn.`)
 *       return false
 *     }
 *     return true
 *   }
 *
 *   propsDidUpdate() {
 *     console.log(`Hi, ${this.props.name}. You seems... different.`)
 *   }
 * }
 *
 * const Michael = new Person({
 *   name: 'Michael',
 *   birthday: new Date(1973, 02, 02)
 * })
 *
 * // will print "Hi Michael! You seems... different."
 * Michael.setProps({geneder:'Male'})
 *
 * // will print "Michael, once born you can't reborn."
 * // props are not updated. `propsDidUpdate` is not called.
 * Michael.setProps({ birthday: new Date(1981,02,02)})
 *
 * @description
 *
 * Initialize a SolidObject with optional properties and default properties.
 *
 * @param  {?Object} [props] The object properties
 * @param  {?Object} [defaultProps] Object default properties
 * @version   0.1.0
 * @since     0.3.1
 */
var SolidObject = function () {
  function SolidObject(props, defaultProps) {
    _classCallCheck(this, SolidObject);

    this.defaultProps = function () {
      return defaultProps;
    };
    this.props = defaultProps || {};
    this.setProps(props);
  }

  /**
   * @method setProps
   * @name module:class/SolidObject~SolidObject#setProps
   *
   * @description
   *
   * Set the object properties. During property assignment the method will check
   * if we can update the properties, will parse the properties internally and
   * then notifies the update completion.
   *
   * @param {?Object} props Object properties
   * @returns {any} Updated Props
   *
   * @since 0.3.1
   * @version 0.1.2
   */


  _createClass(SolidObject, [{
    key: 'setProps',
    value: function setProps(props) {
      if (!props) {
        this.propsDidUpdate();
        return this.props;
      }

      if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
        throw new TypeError(this.constructor.name + ' expected props to be an object but found a ' + (typeof props === 'undefined' ? 'undefined' : _typeof(props)) + ' instead. Please provide a valid ' + this.constructor.name + ' property object.');
      }

      if (this.propsShouldUpdate()) {
        props = this.propsWillUpdate(props);
        this.props = Object.assign(this.props, props);
        this.propsDidUpdate();
      }

      return this.props;
    }

    /**
     * @method propsShouldUpdate
     * @name module:class/SolidObject~SolidObject#propsShouldUpdate
     *
     * @description
     *
     * Called before properties are updated.
     * Override this method to allow or disallow properties update.
     *
     * @returns {boolean} Defines if props should update
     *
     * @since 0.1.0
     * @version 0.1.0
     */

  }, {
    key: 'propsShouldUpdate',
    value: function propsShouldUpdate() {
      return true;
    }

    /**
     * @method propsWillUpdate
     * @name module:class/SolidObject~SolidObject#propsWillUpdate
     *
     * @description
     *
     * Called before the properties are assigned.
     * Override this method to manipulate the properties.
     *
     * @param {any} props Object properties
     * @returns {Object} Props that will update the object
     *
     * @since 0.1.0
     * @version 0.1.0
     */

  }, {
    key: 'propsWillUpdate',
    value: function propsWillUpdate(props) {
      return props;
    }

    /**
     * @method propsDidUpdate
     * @name module:class/SolidObject~SolidObject#propsDidUpdate
     *
     * @description
     *
     * Called after properties are updated.
     * Override this method to do any additional work that need to be performed
     * right after properties update.
     *
     * @returns {undefined}
     *
     * @since 0.1.0
     * @version 0.1.0
     */

  }, {
    key: 'propsDidUpdate',
    value: function propsDidUpdate() {
      // called after props update completes
    }
  }]);

  return SolidObject;
}();

module.exports = SolidObject;