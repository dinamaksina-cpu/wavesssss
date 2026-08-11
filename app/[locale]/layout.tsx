import { notFound } from "next/navigation";
import { company } from "@/data/company";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { IntroLoader } from "@/components/IntroLoader";

export function generateStaticParams(){return locales.map(locale=>({locale}))}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;if(!isLocale(locale))notFound();const dict=getDictionary(locale);
  const jsonLd={"@context":"https://schema.org","@type":"LocalBusiness","@id":company.website,"name":company.name,"description":dict.meta.description,"url":company.website,"telephone":company.phoneDisplay,"email":company.email,"areaServed":[...company.areas,company.country],"address":{"@type":"PostalAddress","addressCountry":"CY"}};
  return <div lang={locale}><IntroLoader/><Header locale={locale} dict={dict}/><main>{children}</main><Footer locale={locale} dict={dict}/><FloatingContact locale={locale} dict={dict}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/></div>
}
