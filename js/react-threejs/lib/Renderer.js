'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _stats = require('stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Renderer = function (_Base) {
  _inherits(Renderer, _Base);

  _createClass(Renderer, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _context;

      return {
        setCamera: this.setCamera.bind(this),
        setScene: this.setScene.bind(this),
        getSize: (_context = this.obj).getSize.bind(_context),
        domElement: this.obj.domElement,
        audioListener: this.audioListener
      };
    }
  }, {
    key: 'setCamera',
    value: function setCamera(camera) {
      this.camera = camera;
    }
  }, {
    key: 'setScene',
    value: function setScene(scene) {
      this.scene = scene;
    }
  }]);

  function Renderer(props) {
    var _Object$getPrototypeO;

    _classCallCheck(this, Renderer);

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Renderer)).call.apply(_Object$getPrototypeO, [this, props].concat(rest)));

    _this.animate = _this.animate.bind(_this);
    _this.audioListener = new _three2.default.AudioListener();
    _this.stats = new _stats2.default();

    _this.obj = props.obj || new _three2.default.WebGLRenderer({
      antialias: true
    });
    _this.obj.name = _this.obj.name || _this.constructor.name;
    _this.obj.setSize(props.size.width, props.size.height);
    _this.obj.setClearColor(0x000000);
    return _this;
  }

  _createClass(Renderer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.container.appendChild(this.obj.domElement); // fixme
      this.refs.container.appendChild(this.stats.dom);
      this.animate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
    // temperately not considering Renderer being unmounted
    // it is singleton & dominating


    // rendering scene with camera

  }, {
    key: 'animate',
    value: function animate() {
      requestAnimationFrame(this.animate);
      this.obj.render(this.scene, this.camera);
      this.stats.update();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { ref: 'container' }),
        _react2.default.createElement(
          'div',
          { hidden: true },
          this.props.children
        )
      );
    }
  }]);

  return Renderer;
}(_Base3.default);

Renderer.childContextTypes = {
  setCamera: _react.PropTypes.func.isRequired,
  setScene: _react.PropTypes.func.isRequired,
  getSize: _react.PropTypes.func.isRequired,
  domElement: _react.PropTypes.object.isRequired,
  audioListener: _react.PropTypes.object.isRequired
};
Renderer.propTypes = _extends({}, _Base3.default.propTypes, {
  size: _react.PropTypes.object.isRequired,
  obj: _react.PropTypes.object
});
exports.default = Renderer;