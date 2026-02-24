import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Single",
    credits: 2,
    price: "€4.99",
    description: "Try it out",
    features: ["2 AI portrait creations", "1K resolution", "Download included", "30-day access"],
    popular: false,
  },
  {
    name: "Bundle",
    credits: 10,
    price: "€14.99",
    description: "Most popular",
    features: ["10 AI portrait creations", "1K resolution", "All 6 styles", "Download included", "30-day access"],
    popular: true,
  },
  {
    name: "Collection",
    credits: 20,
    price: "€24.99",
    description: "Best value",
    features: ["20 AI portrait creations", "1K resolution", "All 6 styles + custom", "Download included", "30-day access", "Priority generation"],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-muted/30" aria-labelledby="pricing-heading">
      <div className="container px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-primary mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Simple Credit Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Buy credits, then create portraits. No subscriptions, no hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card className={`relative h-full flex flex-col ${plan.popular ? "border-primary shadow-luxury-lg scale-[1.02]" : "border-border shadow-luxury"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2 pt-8">
                  <CardDescription className="text-sm uppercase tracking-wide">{plan.description}</CardDescription>
                  <CardTitle className="font-serif text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="font-serif text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-sm">/ {plan.credits} creations</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-6">
                  <ul className="space-y-3 flex-1" role="list">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`mt-8 w-full rounded-full`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link to="/signup">Get {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
