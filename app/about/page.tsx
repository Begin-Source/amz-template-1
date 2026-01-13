import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Mountain, Users, Target, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Wild Nature Journey",
  description: "Learn about our mission to provide honest, expert reviews of camping and outdoor gear.",
}

export default function AboutPage() {
  return (
    <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                About Wild Nature Journey
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your trusted source for honest camping and outdoor gear reviews
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-foreground leading-relaxed mb-6">
                Wild Nature Journey was founded by a group of passionate outdoor enthusiasts who were frustrated with
                the lack of honest, detailed gear reviews online. We believe that quality equipment can make the
                difference between a good adventure and a great one.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                Our team has decades of combined experience in backpacking, camping, mountaineering, and wilderness
                survival. We personally test every product we review, logging hundreds of miles on trails and countless
                nights under the stars to bring you the most accurate information possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Mountain className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Our Mission</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        To provide comprehensive, unbiased reviews that help outdoor enthusiasts make informed gear
                        decisions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Our Team</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Experienced outdoor professionals with expertise in backpacking, camping, and wilderness
                        survival.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Our Process</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Every product is field-tested in real conditions before we write a review. No shortcuts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Our Values</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Honesty, transparency, and a deep respect for the outdoor environment guide everything we do.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Transparency & Affiliate Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We earn commissions from qualifying purchases through Amazon affiliate links on this site. This helps
                support our testing and content creation, but it never influences our honest opinions and
                recommendations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We only recommend products we've personally tested and believe in. If we don't like something, we'll
                tell you, regardless of potential earnings.
              </p>
            </div>
          </div>
        </div>
      </main>
  )
}
