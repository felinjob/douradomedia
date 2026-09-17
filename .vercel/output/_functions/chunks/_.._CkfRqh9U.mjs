import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { c as renderComponent, m as renderTemplate } from "./server_Dm9vjhzq.mjs";
import { t as createComponent } from "./compiler_f7x0-SKD.mjs";
import { t as keystatic_config_default } from "./keystatic.config_CbQyWSWR.mjs";
import "react";
import { Keystatic } from "@keystatic/core/ui";
import { jsx } from "react/jsx-runtime";
//#region node_modules/@keystatic/astro/dist/keystatic-astro-ui.js
var appSlug = {
	envName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG",
	value: void 0
};
function makePage(config) {
	return function Keystatic$1() {
		return /* @__PURE__ */ jsx(Keystatic, {
			config,
			appSlug
		});
	};
}
//#endregion
//#region src/pages/keystatic/[...params].astro
var ____params__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Component = createComponent(($$result, $$props, $$slots) => {
	const Keystatic = makePage(keystatic_config_default);
	return renderTemplate`${renderComponent($$result, "Keystatic", Keystatic, {})}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/pages/keystatic/[...params].astro", void 0);
var $$file = "C:/Users/felin/Documents/dourado-portfolio/src/pages/keystatic/[...params].astro";
var $$url = "/keystatic/[...params]";
//#endregion
//#region \0virtual:astro:page:src/pages/keystatic/[...params]@_@astro
var page = () => ____params__exports;
//#endregion
export { page };
