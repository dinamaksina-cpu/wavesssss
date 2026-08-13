import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { serviceSlugs } from "@/data/services";

export default function sitemap():MetadataRoute.Sitemap{
  const base="https://bluewavecleaning.org";
  const pages=["","services","prices","gallery","about","booking","contact","faq","privacy","cookies","terms",...serviceSlugs.map(s=>`services/${s}`)];
  return locales.flatMap(locale=>pages.map(page=>{
    const suffix=page?`/${page}`:"";
    return {
      url:`${base}/${locale}${suffix}`,
      changeFrequency:page===""?"weekly":"monthly" as const,
      priority:page===""?1:page==="booking"?0.9:page==="services"||page==="prices"?0.8:0.7,
      alternates:{languages:Object.fromEntries([...locales.map(code=>[code,`${base}/${code}${suffix}`]),["x-default",`${base}/en${suffix}`]])}
    };
  }));
}
