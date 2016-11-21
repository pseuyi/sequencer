'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _FirstPersonControls2 = require('../threex/controls/FirstPersonControls');

var _FirstPersonControls3 = _interopRequireDefault(_FirstPersonControls2);

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FirstPersonControls = function (_Object3D) {
  _inherits(FirstPersonControls, _Object3D);

  function FirstPersonControls() {
    var _Object$getPrototypeO;

    _classCallCheck(this, FirstPersonControls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FirstPersonControls)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.animate = _this.animate.bind(_this);
    _this.frame = null;
    return _this;
  }

  // override


  _createClass(FirstPersonControls, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _get2;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = _get(Object.getPrototypeOf(FirstPersonControls.prototype), 'componentDidMount', this)).call.apply(_get2, [this].concat(args));
      var domElement = this.context.domElement;

      var controls = this.controls = new _FirstPersonControls3.default(this.obj, domElement);
      controls.movementSpeed = 20;
      controls.lookSpeed = 0.1;
      controls.noFly = true;
      controls.lookVertical = true;

      // hack: fixing controls.handleResize called before Renderer didMount
      // - while offsetWidth/offsetHeight eq 0
      // however, as a canvas, width/height just works
      controls.viewHalfX = domElement.width / 2;
      controls.viewHalfY = domElement.height / 2;

      this.timer = new _three2.default.Clock();
      this.animate();
    }

    // override

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _get3;

      cancelAnimationFrame(this.frame);
      this.controls.dispose();
      this.controls = null;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_get3 = _get(Object.getPrototypeOf(FirstPersonControls.prototype), 'componentWillUnmount', this)).call.apply(_get3, [this].concat(args));
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.frame = requestAnimationFrame(this.animate);
      this.controls.update(this.timer.getDelta());
    }
  }]);

  return FirstPersonControls;
}(_Object3D3.default);

FirstPersonControls.contextTypes = _extends({}, _Object3D3.default.contextTypes, {
  domElement: _react.PropTypes.object.isRequired
});
exports.default = FirstPersonControls;