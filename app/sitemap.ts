import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { serviceSlugs } from "@/data/services";

export default function sitemap():MetadataRoute.Sitemap{const base="https://bluewavecleaning.org";const pages=["","services","prices","gallery","about","booking","contact","faq","privacy","cookies","terms",...serviceSlugs.map(s=>`services/${s}`)];return locales.flatMap(locale=>pages.map(page=>({url:`${base}/${locale}${page?`/${page}`:""}`,lastModified:new Date(),changeFrequency:page===""?"weekly":"monthly",priority:page===""?1:page==="booking"?0.9:0.7})))}
