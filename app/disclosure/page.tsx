import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Affiliate Disclosure - Wild Nature Journey",
  description: "Information about our affiliate relationships and how we earn commissions.",
}

export default function DisclosurePage() {
  return (
    <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-bold text-foreground mb-4">Affiliate Disclosure</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 30, 2024</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Amazon Associates Program</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Wild Nature Journey is a participant in the Amazon Services LLC Associates Program, an affiliate
              advertising program designed to provide a means for sites to earn advertising fees by advertising and
              linking to Amazon.com.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How It Works</h2>
            <p className="text-foreground leading-relaxed mb-4">
              When you click on an Amazon link on our website and make a purchase, we may earn a small commission at no
              additional cost to you. This commission helps us:
            </p>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li className="mb-2">Purchase and test new camping gear</li>
              <li className="mb-2">Maintain and improve our website</li>
              <li className="mb-2">Create comprehensive, detailed reviews</li>
              <li className="mb-2">Continue providing free content to our readers</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Promise</h2>
            <p className="text-foreground leading-relaxed mb-6">
              <strong>We maintain complete editorial independence.</strong> Affiliate commissions never influence our
              reviews, ratings, or recommendations. We only recommend products we've personally tested and believe will
              benefit our readers. If we don't like a product, we'll tell you—regardless of potential earnings.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Transparency</h2>
            <p className="text-foreground leading-relaxed mb-6">
              All product links that could result in a commission are clearly marked with "Check Price on Amazon" or
              similar language. We believe in complete transparency about our affiliate relationships.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Your Support</h2>
            <p className="text-foreground leading-relaxed mb-6">
              By using our affiliate links, you're supporting the work we do without any extra cost to yourself. We
              genuinely appreciate your support and trust. It allows us to continue creating honest, detailed gear
              reviews for the outdoor community.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Questions?</h2>
            <p className="text-foreground leading-relaxed mb-6">
              If you have any questions about our affiliate relationships or how we earn revenue, please don't hesitate
              to contact us at affiliate@wildnaturejourney.com
            </p>
          </div>
        </div>
      </main>
  )
}
