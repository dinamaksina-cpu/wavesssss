import type { MetadataRoute } from "next";

export default function manifest():MetadataRoute.Manifest{
  return {
    name:"Blue Wave Cleaning",
    short_name:"Blue Wave Cleaning",
    description:"Professional cleaning services in Paphos, Limassol and surrounding areas, Cyprus.",
    start_url:"/en",
    display:"standalone",
    background_color:"#ffffff",
    theme_color:"#123c66",
    icons:[{src:"/blue-wave-logo.png",sizes:"1292x1424",type:"image/png"}]
  };
}
