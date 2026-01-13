import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Wild Nature Journey",
  description: "Our privacy policy and how we handle your data.",
}

export default function PrivacyPage() {
  return (
    <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: December 30, 2024</p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Introduction</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Wild Nature Journey ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Information We Collect</h2>
            <p className="text-foreground leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li className="mb-2">Email address (when you subscribe to our newsletter)</li>
              <li className="mb-2">Usage data (pages visited, time spent on site, etc.)</li>
              <li className="mb-2">Device information (browser type, operating system, IP address)</li>
              <li className="mb-2">Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-4">We use collected information for:</p>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li className="mb-2">Sending newsletters and product updates (with your consent)</li>
              <li className="mb-2">Improving our website and content</li>
              <li className="mb-2">Analyzing website traffic and user behavior</li>
              <li className="mb-2">Responding to customer inquiries</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Third-Party Services</h2>
            <p className="text-foreground leading-relaxed mb-6">
              We use third-party services like Google Analytics and Amazon Associates. These services may collect
              information about your use of our website. Please refer to their respective privacy policies for more
              information.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Your Rights</h2>
            <p className="text-foreground leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-foreground mb-6">
              <li className="mb-2">Access the personal information we hold about you</li>
              <li className="mb-2">Request correction of inaccurate information</li>
              <li className="mb-2">Request deletion of your personal information</li>
              <li className="mb-2">Unsubscribe from our mailing list at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Contact Us</h2>
            <p className="text-foreground leading-relaxed mb-6">
              If you have questions about this Privacy Policy, please contact us at privacy@wildnaturejourney.com
            </p>
          </div>
        </div>
      </main>
  )
}
