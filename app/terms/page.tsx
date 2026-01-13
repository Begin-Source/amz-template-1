import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Wild Nature Journey",
  description: "Terms and conditions for using Wild Nature Journey.",
}

export default function TermsPage() {
  return (
    <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 30, 2024</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Agreement to Terms</h2>
            <p className="text-foreground leading-relaxed mb-6">
              By accessing Wild Nature Journey, you agree to be bound by these Terms of Service and all applicable laws
              and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Use License</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Permission is granted to temporarily access the materials on Wild Nature Journey for personal,
              non-commercial use only. This is the grant of a license, not a transfer of title, and under this license
              you may not:
            </p>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li className="mb-2">Modify or copy the materials</li>
              <li className="mb-2">Use the materials for commercial purposes</li>
              <li className="mb-2">Remove any copyright or proprietary notations</li>
              <li className="mb-2">Transfer the materials to another person</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Disclaimer</h2>
            <p className="text-foreground leading-relaxed mb-6">
              The materials on Wild Nature Journey are provided on an 'as is' basis. We make no warranties, expressed or
              implied, and hereby disclaim all other warranties including implied warranties of merchantability, fitness
              for a particular purpose, or non-infringement of intellectual property.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Product Reviews</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Our product reviews represent our honest opinions based on our testing and experience. Individual
              experiences may vary. We are not responsible for any purchases made through affiliate links, and all
              transactions are between you and Amazon.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Limitations</h2>
            <p className="text-foreground leading-relaxed mb-6">
              In no event shall Wild Nature Journey or its suppliers be liable for any damages arising out of the use or
              inability to use the materials on our website, even if we have been notified of the possibility of such
              damage.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Revisions</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We may revise these terms of service at any time without notice. By using this website you agree to be
              bound by the current version of these terms of service.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact Information</h2>
            <p className="text-foreground leading-relaxed mb-6">
              If you have any questions about these Terms, please contact us at legal@wildnaturejourney.com
            </p>
          </div>
        </div>
      </main>
  )
}
