"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const get_template_1 = require("./get-template");
const { requestIdleCallback, VamtigerBrowserMethod } = self;
const { getJsonLdArray } = VamtigerBrowserMethod;
const { nothing } = types_1.StringConstant;
function default_1(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (requestIdleCallback) {
                requestIdleCallback(() => getTableArticle(params).then(resolve));
            }
            else {
                getTableArticle(params).then(resolve);
            }
        });
    });
}
exports.default = default_1;
function getTableArticle(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { jsonLd } = params;
        const jsonLdArray = (yield getJsonLdArray({ jsonLd })) || [];
        const { name: headingText, description: subheadingText } = jsonLd;
        const tableArticle = get_template_1.default({
            selector: types_1.Selector.tableArticle
        });
        const heading = tableArticle && tableArticle.querySelector(types_1.Selector.heading);
        const subheading = tableArticle && tableArticle.querySelector(types_1.Selector.subheading);
        const table = tableArticle && tableArticle.querySelector(types_1.Selector.table);
        const tableHtml = table && jsonLdArray
            .map(([header, copy]) => [
            `<div data-row>`,
            `<div data-cell data-row-heading>`,
            `<h3 data-cell-content data-uppercase>${header}</h3>`,
            `</div>`,
            `<div data-cell data-row-copy>`,
            `<p data-cell-content>${copy}</p>`,
            `</div>`,
            `</div>`
        ].join(nothing))
            .join(nothing);
        if (heading && headingText) {
            heading.innerHTML = headingText;
        }
        if (subheading && subheadingText) {
            subheading.innerHTML = subheadingText;
        }
        if (table && tableHtml) {
            table.innerHTML = tableHtml;
        }
        return tableArticle;
    });
}
//# sourceMappingURL=get-table-article.js.map