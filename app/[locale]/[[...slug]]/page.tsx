import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { serviceSlugs, type ServiceSlug } from "@/data/services";
import { getServiceSeo, homeSeo, sectionSeo } from "@/lib/local-seo";
import { AboutPage, BookingPage, ContactPage, FAQPage, GalleryPage, HomePage, LegalPage, PricesPage, ServiceDetailPage, ServicesPage } from "@/components/PageViews";

const pageNames=["services","prices","gallery","about","booking","contact","faq","privacy","cookies","terms"] as const;
type Params={locale:string;slug?:string[]};

export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
  const {locale,slug=[]}=await params;
  if(!isLocale(locale))return{};
  const dict=getDictionary(locale);
  const path=slug.join("/");

  let seo = homeSeo[locale];
  if (slug.length === 1 && sectionSeo[path]?.[locale]) seo = sectionSeo[path][locale];
  else if (path === "gallery") seo = { title: dict.gallery.title, description: dict.gallery.body };
  else if (path === "about") seo = { title: dict.about.title, description: dict.about.p2 };
  else if (path === "faq") seo = { title: dict.faq.title, description: dict.meta.description };
  else if (["privacy","cookies","terms"].includes(path)) seo = { title: dict.legal[path as "privacy"|"cookies"|"terms"], description: dict.meta.description };
  else if (slug[0] === "services" && serviceSlugs.includes(slug[1] as ServiceSlug)) seo = getServiceSeo(locale, slug[1] as ServiceSlug);

  const suffix=path?`/${path}`:"";
  const languages=Object.fromEntries(locales.map(code=>[code,`/${code}${suffix}`]));
  return {
    title: seo.title,
    description: seo.description,
    alternates:{canonical:`/${locale}${suffix}`,languages:{...languages,"x-default":`/en${suffix}`}},
    openGraph:{title:seo.title,description:seo.description,url:`/${locale}${suffix}`,siteName:"Blue Wave Cleaning",locale,images:[{url:"/og.png",width:1536,height:1024,alt:"Blue Wave Cleaning — Professional Cleaning Services in Cyprus"}]},
    twitter:{card:"summary_large_image",title:seo.title,description:seo.description,images:["/og.png"]}
  };
}


export default async function LocalizedPage({params}:{params:Promise<Params>}){const {locale,slug=[]}=await params;if(!isLocale(locale))notFound();const dict=getDictionary(locale);if(slug.length===0)return <HomePage locale={locale} dict={dict}/>;const page=slug[0];if(slug.length===1&&pageNames.includes(page as typeof pageNames[number])){if(page==="services")return <ServicesPage locale={locale} dict={dict}/>;if(page==="prices")return <PricesPage locale={locale} dict={dict}/>;if(page==="gallery")return <GalleryPage locale={locale} dict={dict}/>;if(page==="about")return <AboutPage locale={locale} dict={dict}/>;if(page==="booking")return <BookingPage locale={locale} dict={dict}/>;if(page==="contact")return <ContactPage locale={locale} dict={dict}/>;if(page==="faq")return <FAQPage locale={locale} dict={dict}/>;if(page==="privacy"||page==="cookies"||page==="terms")return <LegalPage kind={page} dict={dict}/>;}if(slug.length===2&&page==="services"&&serviceSlugs.includes(slug[1] as ServiceSlug))return <ServiceDetailPage locale={locale} dict={dict} slug={slug[1] as ServiceSlug}/>;notFound()}
