'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Container } from '@/components/container'
import { Badge } from '@/components/badge'

export default function Terms() {
  return (
    <main className="min-h-screen bg-background">
      <Header showAuth={true} />
      
      <section className="py-20 md:py-32">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Last updated: June 2026
            </p>
          </div>

          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Examessy, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  Examessy provides online test series, study materials, and analytics for exam preparation. Our services include but are not limited to practice tests, performance analytics, and study resources.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground mb-4">
                  To access certain features of our service, you may be required to create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and complete information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
                <p className="text-muted-foreground mb-4">
                  Our pricing plans are as follows:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>All payments are one-time and non-refundable unless otherwise stated</li>
                  <li>We reserve the right to modify pricing at any time</li>
                  <li>Payment is processed through secure third-party payment gateways</li>
                  <li>Access to premium features is granted upon successful payment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  All content on Examessy, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Test questions and answers</li>
                  <li>Study materials and explanations</li>
                  <li>Analytics and performance data</li>
                  <li>Website design and code</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  are the exclusive property of Examessy and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. User Conduct</h2>
                <p className="text-muted-foreground mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Share your account credentials with others</li>
                  <li>Attempt to reverse engineer or hack our systems</li>
                  <li>Use our service for any illegal purposes</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with other users' experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Privacy Policy</h2>
                <p className="text-muted-foreground">
                  Your use of Examessy is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal information. Please review our Privacy Policy carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground">
                  Examessy is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or completeness of our service. We do not guarantee that our service will be uninterrupted or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  In no event shall Examessy be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may modify these terms at any time. Continued use of our service after such modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-muted-foreground mt-2">
                  Email: contact@examessy.com<br />
                  Address: Examessy Education Pvt Ltd, Bangalore, India
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
