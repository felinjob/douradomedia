import { collection, config, fields } from "@keystatic/core";
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
		}),
		gear: collection({
			label: "Gear (Equipamentos)",
			slugField: "name",
			path: "src/content/gear/*",
			format: { data: "frontmatter" },
			schema: {
				name: fields.slug({ name: { label: "Nome / Modelo" } }),
				category: fields.select({
					label: "Categoria",
					options: [
						{
							label: "Câmera",
							value: "camera"
						},
						{
							label: "Caixa Estanque",
							value: "housing"
						},
						{
							label: "Lente",
							value: "lens"
						},
						{
							label: "Drone",
							value: "drone"
						},
						{
							label: "Iluminação",
							value: "lighting"
						}
					],
					defaultValue: "camera"
				}),
				specs: fields.text({
					label: "Especificações Técnicas",
					multiline: true
				}),
				depth_rating_meters: fields.number({ label: "Classificação de Profundidade (m)" }),
				in_use_since: fields.text({ label: "Em uso desde" })
			}
		})
	}
});
//#endregion
export { keystatic_config_default as t };
