import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16" role="contentinfo">
      <div className="container px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <Link to="/" className="font-serif text-2xl font-bold text-gradient-gold">RexPet</Link>
            <p className="mt-3 text-sm text-secondary-foreground/60 max-w-xs leading-relaxed">
              Luxury AI pet portraits. Transform your beloved companion into timeless art.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-secondary-foreground/40 mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#gallery" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Gallery</a></li>
                <li><a href="#pricing" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Pricing</a></li>
                <li><a href="#faq" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-secondary-foreground/40 mb-4">Account</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/login" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Sign In</Link></li>
                <li><Link to="/signup" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Sign Up</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/40">© {new Date().getFullYear()} RexPet. All rights reserved.</p>
          <p className="text-xs text-secondary-foreground/40">Made with ♥ for pet lovers in the EU</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
