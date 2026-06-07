import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { SiteConfig, UserConfig } from "vitepress";

export interface SunoakiThemeConfigOptions {
	sitemapHostname?: string;
	sitemapPageTitle?: string;
	sitemapTitle?: string;
	sitemapDescription?: string;
	sitemapKicker?: string;
	sitemapXslPath?: string;
}

interface ResolvedSunoakiThemeConfigOptions {
	sitemapHostname?: string;
	sitemapPageTitle: string;
	sitemapTitle: string;
	sitemapDescription: string;
	sitemapKicker: string;
	sitemapXslPath: string;
}

const defaultOptions: Omit<ResolvedSunoakiThemeConfigOptions, "sitemapHostname"> = {
	sitemapPageTitle: "Sitemap",
	sitemapTitle: "Sitemap",
	sitemapDescription: "Public index of routes generated for crawlers and readers.",
	sitemapKicker: "VitePress Theme Sunoaki",
	sitemapXslPath: "/sitemap.xsl",
};

function escapeXml(value: string) {
	return value.replace(/[<>&'"]/g, (character) => {
		switch (character) {
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "'":
				return "&apos;";
			case '"':
				return "&quot;";
			default:
				return character;
		}
	});
}

function createSitemapXsl(options: ResolvedSunoakiThemeConfigOptions) {
	const title = escapeXml(options.sitemapTitle);
	const pageTitle = escapeXml(options.sitemapPageTitle);
	const description = escapeXml(options.sitemapDescription);
	const kicker = escapeXml(options.sitemapKicker);

	return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<xsl:output method="html" indent="yes" encoding="UTF-8"/>
	<xsl:template match="/">
		<html lang="en">
			<head>
				<title>${title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<style>
					:root {
						--sitemap-bg: #f8faf9;
						--sitemap-surface: #ffffff;
						--sitemap-surface-muted: #f1f6f5;
						--sitemap-text: #172026;
						--sitemap-muted: #5f6f73;
						--sitemap-border: #dbe6e4;
						--sitemap-brand: #2f6f73;
						--sitemap-brand-soft: rgba(47, 111, 115, 0.1);
						--sitemap-shadow: 0 24px 80px rgba(23, 32, 38, 0.08);
					}
					@media (prefers-color-scheme: dark) {
						:root {
							--sitemap-bg: #0f1517;
							--sitemap-surface: #151d20;
							--sitemap-surface-muted: #1b2629;
							--sitemap-text: #edf5f3;
							--sitemap-muted: #a5b6b8;
							--sitemap-border: #2a393c;
							--sitemap-brand: #7fcfd0;
							--sitemap-brand-soft: rgba(127, 207, 208, 0.12);
							--sitemap-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
						}
					}
					* { box-sizing: border-box; }
					body {
						min-height: 100vh;
						margin: 0;
						padding: 56px 24px;
						background: radial-gradient(circle at top left, var(--sitemap-brand-soft), transparent 30rem), linear-gradient(180deg, var(--sitemap-surface), var(--sitemap-bg));
						color: var(--sitemap-text);
						font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
						line-height: 1.6;
					}
					.page { max-width: 1120px; margin: 0 auto; }
					.hero { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: end; margin-bottom: 32px; }
					.kicker { display: inline-flex; align-items: center; gap: 10px; margin: 0 0 18px; color: var(--sitemap-brand); font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
					.kicker::before { display: inline-block; width: 8px; height: 8px; background: var(--sitemap-brand); content: ""; }
					h1 { max-width: 720px; margin: 0; font-size: clamp(40px, 7vw, 80px); font-weight: 760; letter-spacing: -0.04em; line-height: 0.98; }
					.summary { max-width: 680px; margin: 22px 0 0; color: var(--sitemap-muted); font-size: 18px; }
					.stat { min-width: 180px; padding: 22px; background: var(--sitemap-surface); border: 1px solid var(--sitemap-border); border-radius: 18px; box-shadow: var(--sitemap-shadow); }
					.stat-label { display: block; color: var(--sitemap-muted); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
					.stat-value { display: block; margin-top: 4px; color: var(--sitemap-text); font-size: 34px; font-weight: 750; letter-spacing: -0.03em; }
					.panel { overflow: hidden; background: var(--sitemap-surface); border: 1px solid var(--sitemap-border); border-radius: 22px; box-shadow: var(--sitemap-shadow); }
					table { width: 100%; border-collapse: collapse; }
					th { padding: 16px 22px; background: var(--sitemap-surface-muted); color: var(--sitemap-muted); font-size: 12px; font-weight: 750; letter-spacing: 0.06em; text-align: left; text-transform: uppercase; }
					td { padding: 18px 22px; border-top: 1px solid var(--sitemap-border); vertical-align: top; }
					a { color: var(--sitemap-brand); font-weight: 650; text-decoration: none; word-break: break-word; }
					a:hover { text-decoration: underline; text-underline-offset: 3px; }
					.alternates { display: flex; flex-wrap: wrap; gap: 8px; }
					.badge { display: inline-flex; align-items: center; padding: 5px 10px; background: var(--sitemap-brand-soft); border: 1px solid var(--sitemap-border); border-radius: 999px; font-size: 13px; }
					.empty, .footer-note { color: var(--sitemap-muted); font-size: 13px; }
					.footer-note { margin: 18px 0 0; }
					@media (max-width: 760px) {
						body { padding: 32px 16px; }
						.hero { grid-template-columns: 1fr; }
						.stat { min-width: 0; }
						table, thead, tbody, tr, th, td { display: block; }
						thead { display: none; }
						tr { padding: 18px; border-top: 1px solid var(--sitemap-border); }
						tr:first-child { border-top: 0; }
						td { padding: 0; border: 0; }
						td + td { margin-top: 12px; }
					}
				</style>
			</head>
			<body>
				<main class="page">
					<section class="hero">
						<div>
							<p class="kicker">${kicker}</p>
							<h1>${pageTitle}</h1>
							<p class="summary">${description}</p>
						</div>
						<div class="stat">
							<span class="stat-label">Published URLs</span>
							<span class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
						</div>
					</section>
					<section class="panel">
						<table>
							<thead><tr><th>Canonical URL</th><th>Alternates</th></tr></thead>
							<tbody>
								<xsl:for-each select="sitemap:urlset/sitemap:url">
									<tr>
										<td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
										<td>
											<xsl:choose>
												<xsl:when test="xhtml:link[@rel='alternate']">
													<div class="alternates">
														<xsl:for-each select="xhtml:link[@rel='alternate']">
															<a class="badge" href="{@href}"><xsl:value-of select="@hreflang"/></a>
														</xsl:for-each>
													</div>
												</xsl:when>
												<xsl:otherwise><span class="empty">No alternates</span></xsl:otherwise>
											</xsl:choose>
										</td>
									</tr>
								</xsl:for-each>
							</tbody>
						</table>
					</section>
					<p class="footer-note">This page is generated from <code>sitemap.xml</code> and styled with <code>sitemap.xsl</code>.</p>
				</main>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>`;
}

async function writeSitemapXsl(siteConfig: SiteConfig, options: ResolvedSunoakiThemeConfigOptions) {
	const xslPath = options.sitemapXslPath.replace(/^\//, "");
	const targetPath = join(siteConfig.outDir, xslPath);

	await mkdir(dirname(targetPath), { recursive: true });
	await writeFile(targetPath, createSitemapXsl(options));
}

export function defineSunoakiThemeConfig(options: SunoakiThemeConfigOptions = {}): UserConfig {
	const resolvedOptions: ResolvedSunoakiThemeConfigOptions = { ...defaultOptions, ...options };
	const config: UserConfig = {
		async buildEnd(siteConfig) {
			await writeSitemapXsl(siteConfig, resolvedOptions);
		},
	};

	const sitemapHostname = resolvedOptions.sitemapHostname;

	if (sitemapHostname) {
		config.sitemap = {
			hostname: sitemapHostname,
			xslUrl: resolvedOptions.sitemapXslPath,
		};
	}

	return config;
}

export default defineSunoakiThemeConfig();
