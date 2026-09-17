import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as setOnSetGetEnv, t as getEnv$1 } from "./runtime_x1Na2qzi.mjs";
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import { collection, config, fields } from "@keystatic/core";
//#region \0astro:env/server
/** @returns {string} */
var getEnv = (key) => {
	return getEnv$1(key);
};
var getSecret = (key) => {
	return getEnv(key);
};
setOnSetGetEnv(() => {});
//#endregion
//#region node_modules/@keystatic/astro/dist/keystatic-astro-api.js
function makeHandler(_config) {
	return async function keystaticAPIRoute(context) {
		var _config$clientId, _config$clientSecret, _config$secret;
		const { body, headers, status } = await makeGenericAPIRouteHandler({
			..._config,
			clientId: (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : getSecret("KEYSTATIC_GITHUB_CLIENT_ID"),
			clientSecret: (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : getSecret("KEYSTATIC_GITHUB_CLIENT_SECRET"),
			secret: (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : getSecret("KEYSTATIC_SECRET")
		}, { slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG" })(context.request);
		return new Response(body, {
			status,
			headers
		});
	};
}
//#endregion
//#region keystatic.config.ts
var keystatic_config_default = config({
	storage: { kind: "local" },
	collections: {
		spearfishing: collection({
			label: "Spearfishing",
			slugField: "title",
			path: "src/content/spearfishing/*",
			format: { data: "frontmatter" },
			schema: {
				title: fields.slug({ name: { label: "Título" } }),
				client: fields.text({ label: "Cliente" }),
				date: fields.date({ label: "Data" }),
				depth_meters: fields.number({
					label: "Profundidade (metros)",
					defaultValue: 0
				}),
				target_species: fields.text({ label: "Espécie Alvo" }),
				location: fields.text({ label: "Localização" }),
				cover_image: fields.text({ label: "URL Imagem de Capa (Placeholder)" }),
				media_type: fields.select({
					label: "Tipo de Mídia",
					options: [
						{
							label: "YouTube",
							value: "youtube"
						},
						{
							label: "Vimeo",
							value: "vimeo"
						},
						{
							label: "Reel",
							value: "reel"
						},
						{
							label: "Local",
							value: "local"
						}
					],
					defaultValue: "youtube"
				}),
				media_id: fields.text({ label: "ID da Mídia (Video ID / Reel ID)" }),
				featured: fields.checkbox({
					label: "Destaque",
					defaultValue: false
				}),
				description: fields.text({
					label: "Descrição",
					multiline: true
				}),
				bts: fields.object({
					challenge: fields.text({ label: "Desafio" }),
					equipment: fields.text({ label: "Equipamento" }),
					lighting: fields.text({ label: "Iluminação" }),
					result: fields.text({ label: "Resultado" })
				})
			}
		}),
		gastronomy: collection({
			label: "Gastronomy",
			slugField: "title",
			path: "src/content/gastronomy/*",
			format: { data: "frontmatter" },
			schema: {
				title: fields.slug({ name: { label: "Título" } }),
				restaurant_or_chef: fields.text({ label: "Restaurante/Chef" }),
				culinary_style: fields.text({ label: "Estilo Culinário" }),
				color_profile: fields.text({ label: "Perfil de Cor" }),
				cover_image: fields.text({ label: "URL Imagem de Capa (Placeholder)" }),
				media_type: fields.select({
					label: "Tipo de Mídia",
					options: [
						{
							label: "YouTube",
							value: "youtube"
						},
						{
							label: "Vimeo",
							value: "vimeo"
						},
						{
							label: "Reel",
							value: "reel"
						}
					],
					defaultValue: "youtube"
				}),
				media_id: fields.text({ label: "ID da Mídia" }),
				featured: fields.checkbox({
					label: "Destaque",
					defaultValue: false
				})
			}
		}),
		fashion: collection({
			label: "Fashion & Editorial",
			slugField: "title",
			path: "src/content/fashion/*",
			format: { data: "frontmatter" },
			schema: {
				title: fields.slug({ name: { label: "Título" } }),
				brand: fields.text({ label: "Marca" }),
				collection_season: fields.text({ label: "Coleção / Temporada" }),
				fabrics_highlight: fields.array(fields.text({ label: "Tecido" }), {
					label: "Tecidos em Destaque",
					itemLabel: (props) => props.value || "Tecido"
				}),
				visual_concept: fields.text({ label: "Conceito Visual" }),
				cover_image: fields.text({ label: "URL Imagem de Capa (Placeholder)" }),
				media_type: fields.select({
					label: "Tipo de Mídia",
					options: [
						{
							label: "YouTube",
							value: "youtube"
						},
						{
							label: "Vimeo",
							value: "vimeo"
						},
						{
							label: "Reel",
							value: "reel"
						}
					],
					defaultValue: "youtube"
				}),
				media_id: fields.text({ label: "ID da Mídia" }),
				featured: fields.checkbox({
					label: "Destaque",
					defaultValue: false
				}),
				bts: fields.object({
					challenge: fields.text({ label: "Desafio" }),
					equipment: fields.text({ label: "Equipamento" }),
					lighting: fields.text({ label: "Iluminação" }),
					result: fields.text({ label: "Resultado" })
				})
			}
		})
	}
});
//#endregion
//#region node_modules/@keystatic/astro/internal/keystatic-api.js
var keystatic_api_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	all: () => all,
	prerender: () => false
});
var all = makeHandler({ config: keystatic_config_default });
var ALL = all;
//#endregion
//#region \0virtual:astro:page:node_modules/@keystatic/astro/internal/keystatic-api@_@js
var page = () => keystatic_api_exports;
//#endregion
export { page };
