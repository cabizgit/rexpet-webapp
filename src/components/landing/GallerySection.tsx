import { motion } from "framer-motion";

const galleryItems = [
  { style: "Oil Painting", description: "Rich textures & golden tones" },
  { style: "Watercolor", description: "Soft washes & gentle blending" },
  { style: "Pop Art", description: "Bold colors & graphic energy" },
  { style: "Renaissance", description: "Noble bearing & dramatic light" },
  { style: "Art Nouveau", description: "Flowing lines & organic forms" },
  { style: "Impressionist", description: "Dappled light & visible strokes" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background" aria-labelledby="gallery-heading">
      <div className="container px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-primary mb-3"
          >
            The Gallery
          </motion.p>
          <motion.h2
            id="gallery-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Eight Stunning Styles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Each style is crafted by AI to capture your pet's unique personality in a new artistic dimension.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.style}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-muted shadow-luxury hover:shadow-luxury-lg transition-shadow duration-500 cursor-pointer">
                {/* Placeholder gradient simulating art style */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-navy-light/60 to-primary/30 group-hover:scale-105 transition-transform duration-700" />

                {/* Style label overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center mb-4 bg-background/10 backdrop-blur-sm">
                    <span className="font-serif text-2xl text-primary-foreground font-bold">{item.style[0]}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-1">{item.style}</h3>
                  <p className="text-sm text-primary-foreground/70">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
