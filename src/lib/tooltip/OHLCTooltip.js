"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

var _d3TimeFormat = require("d3-time-format");

var _displayValuesFor = require("./displayValuesFor");

var _displayValuesFor2 = _interopRequireDefault(_displayValuesFor);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OHLCTooltip = function (_Component) {
	_inherits(OHLCTooltip, _Component);

	function OHLCTooltip(props) {
		_classCallCheck(this, OHLCTooltip);

		var _this = _possibleConstructorReturn(this, (OHLCTooltip.__proto__ || Object.getPrototypeOf(OHLCTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}


	function helper(props, moreProps) {
		var mouseXY = moreProps.mouseXY,
			currentItem = moreProps.currentItem,
			show = moreProps.show,
			height = moreProps.height - 17,
			width = moreProps.width;
		var customX = false,
			stroke = props.stroke,
			opacity = props.opacity,
			strokeDasharray = props.strokeDasharray;


		if (!show || (0, _utils.isNotDefined)(currentItem)) return null;

		var line1 = {
			x1: 0,
			x2: width,
			y1: mouseXY[1],
			y2: mouseXY[1],
			stroke: stroke, strokeDasharray: strokeDasharray, opacity: opacity
		};

		var xScale = moreProps.xScale,
			xAccessor = moreProps.xAccessor,
			currentItem = moreProps.currentItem,
			mouseXY = moreProps.mouseXY;
		var x = Math.round(xScale(xAccessor(currentItem)));;
		//console.log(x)

		var line2 = {
			x1: x,
			x2: x,
			y1: 0,
			y2: height,
			stroke: stroke, strokeDasharray: strokeDasharray, opacity: opacity
		};
		return [line1, line2];
	}

	_createClass(OHLCTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var displayValuesFor = this.props.displayValuesFor;

			var viewHelper = helper(this.props, moreProps)
			var _props = this.props,
			    xDisplayFormat = _props.xDisplayFormat,
			    accessor = _props.accessor,
			    volumeFormat = _props.volumeFormat,
			    ohlcFormat = _props.ohlcFormat,
			    percentFormat = _props.percentFormat,
				dataEntry = _props.dataEntry,
			    displayTexts = _props.displayTexts;
			var _moreProps$chartConfi = moreProps.chartConfig,
			    width = _moreProps$chartConfi.width,
			    height = _moreProps$chartConfi.height;
			var displayXAccessor = moreProps.displayXAccessor;


			var currentItem = displayValuesFor(this.props, moreProps);

			var displayDate = void 0,
			    open = void 0,
			    high = void 0,
			    low = void 0,
			    close = void 0,
				volume = void 0,
				change = void 0,
				tokenAVolume = void 0,
				tokenBVolume = void 0,
			    percent = void 0;
			displayDate = open = high = low = close = volume = percent = change = tokenAVolume = tokenBVolume = displayTexts.na;

			if(dataEntry !== undefined){
				displayDate = xDisplayFormat(dataEntry.date_millis)
				open = ohlcFormat(dataEntry.open)
				high = ohlcFormat(dataEntry.high)
				low = ohlcFormat(dataEntry.low)
				close = ohlcFormat(dataEntry.close)
				percent = percentFormat((dataEntry.close - dataEntry.open) / dataEntry.open);
				tokenAVolume = ohlcFormat(dataEntry.volume);
				tokenBVolume = ohlcFormat(dataEntry.volume * dataEntry.close);
			}

			if ((0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(accessor(currentItem))) {
				var item = accessor(currentItem);
				volume = (0, _utils.isDefined)(item.volume) ? volumeFormat(item.volume) : displayTexts.na;

				displayDate = xDisplayFormat(displayXAccessor(item));
				open = ohlcFormat(item.open);
				high = ohlcFormat(item.high);
				low = ohlcFormat(item.low);
				close = ohlcFormat(item.close);
				tokenAVolume = ohlcFormat(item.volume);
				tokenBVolume = ohlcFormat(item.volume * item.close);
				percent = percentFormat((item.close - item.open) / item.open);
			}


			if(!viewHelper){
				displayDate = xDisplayFormat(dataEntry.date_millis)
				open = ohlcFormat(dataEntry.open)
				high = ohlcFormat(dataEntry.high)
				low = ohlcFormat(dataEntry.low)
				close = ohlcFormat(dataEntry.close)
				percent = percentFormat((dataEntry.close - dataEntry.open) / dataEntry.open);
				tokenAVolume = ohlcFormat(dataEntry.volume);
				tokenBVolume = ohlcFormat(dataEntry.volume * dataEntry.close);
			}


			var originProp = this.props.origin;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			var itemsToDisplay = {
				displayDate: displayDate,
				open: open,
				high: high,
				low: low,
				close: close,
				percent: percent,
				volume: volume,
				tokenAVolume: tokenAVolume,
				tokenBVolume: tokenBVolume,
				x: x,
				y: y
			};
			return this.props.children(this.props, moreProps, itemsToDisplay);
		}
	}, {
		key: "render",
		value: function render() {

			return _react2.default.createElement(_GenericChartComponent2.default, {
				clip: false,
				svgDraw: this.renderSVG,
				drawOn: ["mousemove"]
			});
		}
	}]);

	return OHLCTooltip;
}(_react.Component);

OHLCTooltip.propTypes = {
	className: _propTypes2.default.string,
	accessor: _propTypes2.default.func,
	xDisplayFormat: _propTypes2.default.func,
	children: _propTypes2.default.func,
	volumeFormat: _propTypes2.default.func,
	percentFormat: _propTypes2.default.func,
	ohlcFormat: _propTypes2.default.func,
	origin: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.func]),
	fontFamily: _propTypes2.default.string,
	fontSize: _propTypes2.default.number,
	onClick: _propTypes2.default.func,
	displayValuesFor: _propTypes2.default.func,
	textFill: _propTypes2.default.string,
	labelFill: _propTypes2.default.string,
	displayTexts: _propTypes2.default.object
};

var displayTextsDefault = {
	k: "Koincity (KCT) / KOIN,  ",
	d: "Date: ",
	o: "  Open: ",
	h: "  High: ",
	l: "  Low: ",
	c: "  Close: ",
	v: "  Vol",
	ch: "  CHANGE: ",
	b: "   ",
	na: "n/a"
};

OHLCTooltip.defaultProps = {
	accessor: function accessor(d) {
		return {
			token: d.token,
			date: d.date,
			open: d.open,
			high: d.high,
			low: d.low,
			close: d.close,
			volume: d.volume,
			change: d.change,
			view: d.view,
			tokenASymbol: d.tokenASymbol,
			tokenBSymbol: d.tokenBSymbol,
		};
	},
	xDisplayFormat: (0, _d3TimeFormat.timeFormat)("%Y-%m-%d"),
	volumeFormat: (0, _d3Format.format)(".4s"),
	percentFormat: (0, _d3Format.format)(".2%"),
	ohlcFormat: (0, _d3Format.format)(".2f"),
	displayValuesFor: _displayValuesFor2.default,
	origin: [0, 0],
	children: defaultDisplay,
	displayTexts: displayTextsDefault
};




function defaultDisplay(props, moreProps, itemsToDisplay) {

	/* eslint-disable */
	var className = props.className,
	    textFill = props.textFill,
	    labelFill = props.labelFill,
	    onClick = props.onClick,
	    fontFamily = props.fontFamily,
	    fontSize = props.fontSize,
	    displayTexts = props.displayTexts,
		token = props.token,
		tokenASymbol = props.tokenASymbol,
		tokenBSymbol = props.tokenBSymbol,
		view = props.view;
	/* eslint-enable */

	var displayDate = itemsToDisplay.displayDate,
	    open = itemsToDisplay.open,
	    high = itemsToDisplay.high,
	    low = itemsToDisplay.low,
	    close = itemsToDisplay.close,
	    volume = itemsToDisplay.volume,
		percent = itemsToDisplay.percent,
	    x = itemsToDisplay.x,
	    y = itemsToDisplay.y;

	if (view === "mobile") {
		return _react2.default.createElement(
			"g",
			{
				className: "react-stockcharts-tooltip-hover " + className,
				transform: "translate(" + x + ", " + y + ")",
				onClick: onClick
			},
			_react2.default.createElement(
				_ToolTipText2.default,
				{
					x: 0,
					y: 0,
					fontFamily: fontFamily,
					fontSize: fontSize
				},
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{
						fill: labelFill,
						key: "label",
						x: 0,
						dy: "5",
						fontSize: "9pt" },
					token
				)
			)
		);
	} else if (view === "full") {
		return _react2.default.createElement(
			"g",
			{
				className: "react-stockcharts-tooltip-hover " + className,
				transform: "translate(" + x + ", " + y + ")",
				onClick: onClick
			},
			_react2.default.createElement(
				_ToolTipText2.default,
				{
					x: 0,
					y: 0,
					fontFamily: fontFamily,
					fontSize: fontSize
				},
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{
						fill: labelFill,
						key: "label",
						x: 0,
						dy: "5",
						fontSize: "9pt" },
					token
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_O1", fontSize: "9pt" },
					displayTexts.d
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value", fill: textFill, fontSize: "9pt"},
					displayDate
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_O", fontSize: "9pt" },
					displayTexts.o
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_O", fill: textFill, fontSize: "9pt" },
					open
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_H", fontSize: "9pt" },
					displayTexts.h
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_H", fill: textFill, fontSize: "9pt" },
					high
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_L", fontSize: "9pt" },
					displayTexts.l
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_L", fill: textFill, fontSize: "9pt" },
					low
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_C", fontSize: "9pt" },
					displayTexts.c
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C", fill: textFill, fontSize: "9pt" },
					close
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_Vol", fontSize: "9pt" },
					displayTexts.v
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_Vol", fill: textFill, fontSize: "9pt" },
					volume
				)
			)
		);
	}else if (view === "candles") {
		let textColor = "rgba(0, 200, 81, 1)"
		if (percent.includes("-")) {
			textColor = "rgba(255, 68, 68, 1)"
		}


		return _react2.default.createElement(
			"g",
			{
				className: "react-stockcharts-tooltip-hover " + className,
				transform: "translate(" + x + ", " + y + ")",
				onClick: onClick
			},
			_react2.default.createElement(
				_ToolTipText2.default,
				{
					x: 0,
					y: 0,
					fontFamily: fontFamily,
					fontSize: fontSize
				},
				_react2.default.createElement(
					"tspan",
					{ key: "value", fill: labelFill, fontSize: "9pt"},
					displayDate
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_O", fontSize: "9pt" },
					displayTexts.o
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_O", fill: textColor, fontSize: "9pt" },
					open
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_H", fontSize: "9pt" },
					displayTexts.h
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_H", fill: textColor, fontSize: "9pt" },
					high
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_L", fontSize: "9pt" },
					displayTexts.l
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_L", fill: textColor, fontSize: "9pt" },
					low
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_C", fontSize: "9pt" },
					displayTexts.c
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_C", fill: textColor, fontSize: "9pt" },
					close
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_change", fontSize: "9pt" },
					displayTexts.ch
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_change", fill: textColor, fontSize: "9pt" },
					percent
				)
			)
		);
	}else if (view === "volume") {
		let textColor = "rgba(0, 200, 81, 1)"
		if (percent.includes("-")) {
			textColor = "rgba(255, 68, 68, 1)"
		}


		return _react2.default.createElement(
			"g",
			{
				className: "react-stockcharts-tooltip-hover " + className,
				transform: "translate(" + x + ", " + y + ")",
				onClick: onClick
			},
			_react2.default.createElement(
				_ToolTipText2.default,
				{
					x: 0,
					y: 0,
					fontFamily: fontFamily,
					fontSize: fontSize
				},
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_V1", fontSize: "9pt" },
					displayTexts.v + " (" + tokenASymbol + "): "
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_V1", fill: textColor, fontSize: "9pt" },
					itemsToDisplay.tokenAVolume
				),
				_react2.default.createElement(
					_ToolTipTSpanLabel2.default,
					{ fill: labelFill, key: "label_V2", fontSize: "9pt" },
					displayTexts.v + " (" + tokenBSymbol + "): "
				),
				_react2.default.createElement(
					"tspan",
					{ key: "value_V2", fill: textColor, fontSize: "9pt" },
					itemsToDisplay.tokenBVolume
				)
			)
		);
	}
}

exports.default = OHLCTooltip;
//# sourceMappingURL=OHLCTooltip.js.map