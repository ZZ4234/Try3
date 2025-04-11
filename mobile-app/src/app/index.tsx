export default function IndexPage() {
  // Use Next.js redirect instead of client-side redirect
  return null
}

export const dynamic = "force-static"

export async function generateMetadata() {
  return {
    title: "Redirecting...",
  }
}

export function generateStaticParams() {
  return []
}
