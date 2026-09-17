import { D as createAstro, c as renderComponent, h as maybeRenderHead, m as renderTemplate } from "./server_Dm9vjhzq.mjs";
import { t as createComponent } from "./compiler_f7x0-SKD.mjs";
import { i as renderScript } from "./HudBadge_CLLuj0zq.mjs";
//#region src/components/tactical/TacticalButton.astro
createAstro("https://brunodourado.vercel.app");
var $$TacticalButton = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TacticalButton;
	const { text, href, type = "button", class: className = "" } = Astro.props;
	return renderTemplate`${renderComponent($$result, "Element", href ? "a" : "button", {
		...href ? { href } : { type },
		"class": `tactical-btn group relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-6 py-2 font-display uppercase tracking-widest text-sm font-bold transition-all duration-300 border border-text-primary/20 bg-bg-primary text-text-primary hover:bg-accent hover:text-black hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary ${className}`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<span class="relative z-10">${text}</span>` })}${renderScript($$result, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/TacticalButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/felin/Documents/dourado-portfolio/src/components/tactical/TacticalButton.astro", void 0);
//#endregion
export { $$TacticalButton as t };
