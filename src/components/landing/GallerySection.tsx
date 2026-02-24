import { motion } from "framer-motion";

const galleryItems = [
  { style: "Oil Painting", description: "Rich textures & golden tones", image: "/images/oil-painting.jpg" },
  { style: "Watercolor", description: "Soft washes & gentle blending", image: "/images/watercolor.png" },
  { style: "Pop Art", description: "Bold colors & graphic energy", image: "/images/pop-art.png" },
  { style: "Renaissance", description: "Noble bearing & dramatic light", image: "/images/renaissance.png" },
  { style: "Art Nouveau", description: "Flowing lines & organic forms", image: "/images/art-nouveau.png" },
  { style: "Impressionist", description: "Dappled light & visible strokes", image: "/images/impressionist.png" },
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
            Six Stunning Styles
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
                {/* Background image */}
                <img
                  src={item.image}
                  alt={`${item.style} pet portrait example`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />

                {/* Style label overlay */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-center">
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
