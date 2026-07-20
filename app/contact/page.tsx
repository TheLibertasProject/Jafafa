import type { Metadata } from "next";
import { Contact } from "@/components/sections/service/Contact";

export const metadata: Metadata = {
  title: "Contact · Jafafa · Olfactive Botanicals",
  description:
    "Write to the maison. Korkeavuorenkatu 22, Helsinki. We reply within three working days.",
};

export default function ContactPage() {
  return <Contact />;
}
