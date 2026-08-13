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
  const {locale}=await params;
  if(!isLocale(locale))notFound();
  const dict=getDictionary(locale);
  const businessId="https://bluewavecleaning.org/#business";
  const websiteId="https://bluewavecleaning.org/#website";
  const jsonLd={
    "@context":"https://schema.org",
    "@graph":[
      {
        "@type":["LocalBusiness","ProfessionalService"],
        "@id":businessId,
        name:company.name,
        legalName:company.legalName,
        description:dict.meta.description,
        url:company.website,
        logo:"https://bluewavecleaning.org/blue-wave-logo.png",
        image:"https://bluewavecleaning.org/og.png",
        telephone:company.phoneDisplay,
        email:company.email,
        priceRange:"€€",
        areaServed:[
          {"@type":"City",name:"Paphos"},
          {"@type":"City",name:"Limassol"},
          {"@type":"Country",name:"Cyprus"}
        ],
        sameAs:[socials.instagram,socials.facebook,socials.telegram],
        contactPoint:{"@type":"ContactPoint",telephone:company.phoneDisplay,email:company.email,contactType:"customer service",areaServed:"CY",availableLanguage:["English","Greek","Russian","Ukrainian"]}
      },
      {
        "@type":"WebSite",
        "@id":websiteId,
        url:"https://bluewavecleaning.org/",
        name:company.name,
        publisher:{"@id":businessId},
        inLanguage:["en","el","ru","uk"]
      }
    ]
  };
  return <div lang={locale}><IntroLoader/><Header locale={locale} dict={dict}/><main>{children}</main><Footer locale={locale} dict={dict}/><FloatingContact locale={locale} dict={dict}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/></div>
}
