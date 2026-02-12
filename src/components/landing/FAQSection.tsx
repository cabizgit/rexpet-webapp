import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does RexPet work?",
    a: "Upload a clear photo of your pet, choose from 8 curated artistic styles (or write your own prompt), and our AI transforms it into a stunning high-resolution portrait in under a minute.",
  },
  {
    q: "What resolution are the generated images?",
    a: "All generated portraits are 1K resolution — perfect for digital display and high-quality printing up to A3 size.",
  },
  {
    q: "How long do my images stay available?",
    a: "Both your uploaded photos and generated portraits are available for 30 days. Make sure to download your favourites before they expire!",
  },
  {
    q: "Can I order a physical print?",
    a: "Absolutely! From your dashboard, you can order museum-quality prints of any completed portrait. Prices start at €79 with delivery across the EU.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards through our secure Stripe payment integration. All transactions are encrypted and PCI-compliant.",
  },
  {
    q: "What if the generation fails?",
    a: "If our AI fails to generate your portrait, your credit is automatically refunded to your account. No manual action needed.",
  },
  {
    q: "Can I delete my account and data?",
    a: "Yes. You can delete your account at any time from the Settings page. All your data, images, and personal information will be permanently removed.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-background" aria-labelledby="faq-heading">
      <div className="container px-4 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-primary mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground"
          >
            Common Questions
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4 bg-card">
                <AccordionTrigger className="text-left font-medium text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
