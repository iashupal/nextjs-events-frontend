import Link from "next/link";
import Layout from "@/components/Layout";
export default function AboutPage() {
  return (
    <Layout title="About DJ Events">
      <div>
        <h1>About Page</h1>
        <p>This is an app to find latest DJ & other musical events.</p>
        <p>Versio 1.0.0</p>
        <Link href="/">Home</Link>
      </div>
    </Layout>
  );
}
