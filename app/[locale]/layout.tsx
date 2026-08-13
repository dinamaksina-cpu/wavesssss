import { notFound } from "next/navigation";
import { company } from "@/data/company";
import { socials } from "@/data/socials";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { IntroLoader } from "@/components/IntroLoader";

export function generateStaticParams(){return locales.map(locale=>({locale}))}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;if(!isLocale(locale))notFound();const dict=getDictionary(locale);
  const jsonLd={
    "@context":"https://schema.org",
    "@type":["LocalBusiness","ProfessionalService"],
    "@id":company.website,
    "name":company.name,
    "alternateName":"Blue Wave Cleaning Cyprus",
    "description":dict.meta.description,
    "url":company.website,
    "telephone":company.phoneDisplay,
    "email":company.email,
    "image":"https://bluewavecleaning.org/og.png",
    "logo":"https://bluewavecleaning.org/blue-wave-logo.png",
    "sameAs":[socials.instagram,socials.facebook,socials.telegram],
    "areaServed":[
      {"@type":"City","name":"Paphos"},
      {"@type":"City","name":"Limassol"},
      {"@type":"Country","name":"Cyprus"}
    ],
    "address":{"@type":"PostalAddress","addressCountry":"CY"},
    "hasOfferCatalog":{
      "@type":"OfferCatalog",
      "name":"Cleaning services in Cyprus",
      "itemListElement":[
        "Home Cleaning","Deep Cleaning","Office Cleaning","Airbnb Cleaning","Move In / Move Out Cleaning","Post-Renovation Cleaning","Carpet Cleaning","Upholstery Cleaning","Window Cleaning"
      ].map(name=>({"@type":"Offer","itemOffered":{"@type":"Service","name":name,"areaServed":["Paphos","Limassol","Cyprus"]}}))
    }
  };
  return <div lang={locale}><IntroLoader/><Header locale={locale} dict={dict}/><main>{children}</main><Footer locale={locale} dict={dict}/><FloatingContact locale={locale} dict={dict}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></div>
}
