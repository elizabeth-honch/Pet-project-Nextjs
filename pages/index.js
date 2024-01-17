import Layout from "@/components/layout";
import { buildFeedbackPath, extractFeedback } from "./api/gallery";
import Gallery from "@/components/gallery";

export default function HomePage({ imgs }) {
  return (
    <Layout>
      <h1 className="h1">Cosmetics</h1>
      <Gallery imgs={imgs} />
    </Layout>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      imgs: data,
    },
  };
};
