import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { serviceSlugs, type ServiceSlug } from "@/data/services";
import { getServiceDetailCopy } from "@/lib/service-detail-i18n";
import { brandedTitle, seoHome } from "@/lib/seo";
import { AboutPage, BookingPage, ContactPage, FAQPage, GalleryPage, HomePage, LegalPage, PricesPage, ServiceDetailPage, ServicesPage } from "@/components/PageViews";

const pageNames=["services","prices","gallery","about","booking","contact","faq","privacy","cookies","terms"] as const;
type Params={locale:string;slug?:string[]};

export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{
  const {locale,slug=[]}=await params;
  if(!isLocale(locale))return{};
  const dict=getDictionary(locale);
  const path=slug.join("/");
  let title=seoHome[locale].title;
  let description=seoHome[locale].description;

  if(path==="services"){title=brandedTitle(dict.services.title);description=dict.services.body}
  else if(path==="prices"){title=brandedTitle(dict.pricing.title);description=dict.pricing.body}
  else if(path==="gallery"){title=brandedTitle(dict.gallery.title);description=dict.gallery.body}
  else if(path==="about"){title=brandedTitle(dict.about.title);description=dict.about.p2}
  else if(path==="booking"){title=brandedTitle(dict.booking.title);description=dict.forms.quote.intro}
  else if(path==="contact"){title=brandedTitle(dict.contact.title);description=dict.contact.body}
  else if(path==="faq"){title=brandedTitle(dict.faq.title);description=dict.meta.description}
  else if(["privacy","cookies","terms"].includes(path)){title=brandedTitle(dict.legal[path as "privacy"|"cookies"|"terms"]);description=dict.meta.description}
  else if(slug[0]==="services"&&serviceSlugs.includes(slug[1] as ServiceSlug)){
    const serviceCopy=getServiceDetailCopy(locale,slug[1] as ServiceSlug);
    title=brandedTitle(serviceCopy.title);
    description=serviceCopy.intro;
  }

  const suffix=path?`/${path}`:"";
  const languages=Object.fromEntries(locales.map(code=>[code,`/${code}${suffix}`]));
  const canonical=`/${locale}${suffix}`;

  return {
    title:{absolute:title},
    description,
    alternates:{canonical,languages:{...languages,"x-default":`/en${suffix}`}},
    robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
    openGraph:{type:"website",title,description,url:canonical,siteName:"Blue Wave Cleaning",locale:seoHome[locale].ogLocale,images:[{url:"/og.png",width:1536,height:1024,alt:"Blue Wave Cleaning — Professional Cleaning Services in Cyprus"}]},
    twitter:{card:"summary_large_image",title,description,images:["/og.png"]},
  };
}

export default async function LocalizedPage({params}:{params:Promise<Params>}){const {locale,slug=[]}=await params;if(!isLocale(locale))notFound();const dict=getDictionary(locale);if(slug.length===0)return <HomePage locale={locale} dict={dict}/>;const page=slug[0];if(slug.length===1&&pageNames.includes(page as typeof pageNames[number])){if(page==="services")return <ServicesPage locale={locale} dict={dict}/>;if(page==="prices")return <PricesPage locale={locale} dict={dict}/>;if(page==="gallery")return <GalleryPage locale={locale} dict={dict}/>;if(page==="about")return <AboutPage locale={locale} dict={dict}/>;if(page==="booking")return <BookingPage locale={locale} dict={dict}/>;if(page==="contact")return <ContactPage locale={locale} dict={dict}/>;if(page==="faq")return <FAQPage locale={locale} dict={dict}/>;if(page==="privacy"||page==="cookies"||page==="terms")return <LegalPage kind={page} dict={dict}/>;}if(slug.length===2&&page==="services"&&serviceSlugs.includes(slug[1] as ServiceSlug))return <ServiceDetailPage locale={locale} dict={dict} slug={slug[1] as ServiceSlug}/>;notFound()}
