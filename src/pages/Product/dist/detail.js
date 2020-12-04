"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var ProductDetail = /** @class */ (function (_super) {
    __extends(ProductDetail, _super);
    function ProductDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductDetail.prototype.render = function () {
        var title = (react_1["default"].createElement("span", null,
            react_1["default"].createElement(icons_1.ArrowRightOutlined, { style: { marginRight: '5px' } }),
            react_1["default"].createElement("span", null, "\u5546\u54C1\u8BE6\u60C5")));
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(antd_1.Card, { title: title, className: "product-detail" },
                react_1["default"].createElement(antd_1.List, { className: "list" },
                    react_1["default"].createElement(antd_1.List.Item, { className: "item" },
                        react_1["default"].createElement("span", { className: "left" }, "\u5546\u54C1\u540D\u79F0:"),
                        react_1["default"].createElement("span", { className: "right" }, "\u5C0F\u7C738 6+64")),
                    react_1["default"].createElement(antd_1.List.Item, { className: "item" },
                        react_1["default"].createElement("span", { className: "left" }, "\u5546\u54C1\u63CF\u8FF0:"),
                        react_1["default"].createElement("span", null, "\u5C0F\u7C738 6+64")),
                    react_1["default"].createElement(antd_1.List.Item, { className: "item" },
                        react_1["default"].createElement("span", { className: "left" }, "\u5546\u54C1\u4EF7\u683C:"),
                        react_1["default"].createElement("span", null, "2450")),
                    react_1["default"].createElement(antd_1.List.Item, { className: "item" },
                        react_1["default"].createElement("span", { className: "left" }, "\u6240\u5C5E\u5206\u7C7B:"),
                        react_1["default"].createElement("span", null,
                            "\u7535\u8111--",
                            '>',
                            "\u7B14\u8BB0\u672C")),
                    react_1["default"].createElement(antd_1.List.Item, { className: "item" },
                        react_1["default"].createElement("span", { className: "left" }, "\u5546\u54C1\u56FE\u7247:"),
                        react_1["default"].createElement("span", null,
                            react_1["default"].createElement("img", { className: "product-img", src: "http://localhost:5000/files/1.jpg", alt: "img" })),
                        react_1["default"].createElement("span", null,
                            react_1["default"].createElement("img", { className: "product-img", src: "http://localhost:5000/files/1.jpg", alt: "img" }))),
                    react_1["default"].createElement(antd_1.List.Item, { className: "item" },
                        react_1["default"].createElement("span", { className: "left" }, "\u5546\u54C1\u8BE6\u60C5:"),
                        react_1["default"].createElement("span", { dangerouslySetInnerHTML: true }))))));
    };
    return ProductDetail;
}(react_1.Component));
exports["default"] = ProductDetail;
