import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";
export default async function RootPage(){const stored=(await cookies()).get("blue-wave-locale")?.value;redirect(`/${stored&&isLocale(stored)?stored:"en"}`)}
