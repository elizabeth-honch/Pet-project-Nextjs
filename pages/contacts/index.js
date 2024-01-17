import Layout from "@/components/layout";
import Head from "next/head";
import ContactForm from "@/components/contactForm";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta
          name="description"
          content="Contact form"
        />
      </Head>
      <Layout>
        <h1 className="h1">Contact me</h1>
        <ContactForm />
      </Layout>
    </>
  );
};
