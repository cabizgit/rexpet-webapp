import { motion } from "framer-motion";
import { Truck, ShieldCheck, Frame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Frame, title: "Museum-Quality Prints", description: "Premium canvas or fine-art paper, professionally finished" },
  { icon: Truck, title: "Shipped to Your Door", description: "Carefully packaged and delivered across Europe" },
  { icon: ShieldCheck, title: "Secure Checkout", description: "Add to cart and pay once — simple and safe" },
];

const PrintShopSection = () => {
  return (
    <section id="prints" className="py-24 lg:py-32 bg-background" aria-labelledby="prints-heading">
      <div className="container px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-primary mb-3"
          >
            Physical Prints
          </motion.p>
          <motion.h2
            id="prints-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Bring Your Art Home
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Love your AI portrait? Order a stunning physical print delivered straight to your door. Add your favourites to cart and checkout when ready.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground">{feat.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild className="rounded-full px-8 h-13 text-base shadow-luxury">
            <Link to="/signup">Get Started & Print</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PrintShopSection;
