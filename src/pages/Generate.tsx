import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";

const styles = [
  { name: "Oil Painting", image: "/images/oil-painting.jpg" },
  { name: "Watercolor", image: "/images/watercolor.png" },
  { name: "Pop Art", image: "/images/pop-art.png" },
  { name: "Renaissance", image: "/images/renaissance.png" },
  { name: "Art Nouveau", image: "/images/art-nouveau.png" },
  { name: "Impressionist", image: "/images/impressionist.png" },
];

const Generate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [creditBalance, setCreditBalance] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);
      // Fetch credit balance
      supabase
        .from("profiles")
        .select("credit_balance")
        .eq("user_id", session.user.id)
        .single()
        .then(({ data }) => {
          if (data) setCreditBalance(data.credit_balance);
        });
      setLoading(false);
    });
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 10 * 1024 * 1024) return; // 10MB max
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyle || creditBalance < 1) return;
    // TODO: Phase 4 — call edge function for generation pipeline
    alert("Generation will be implemented in Phase 4. Your selected style: " + selectedStyle);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="h-12 w-48" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="font-serif text-xl font-bold text-gradient-gold">Create Portrait</h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">{creditBalance} credits</span>
        </div>
      </header>

      <div className="container px-4 lg:px-8 py-10 max-w-5xl">
        {/* Step 1: Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">1. Upload your pet's photo</h2>
          <p className="text-muted-foreground mb-6">Choose a clear, well-lit photo of your pet</p>

          <div className="flex flex-col sm:flex-row gap-6">
            <label
              className="flex-1 flex flex-col items-center justify-center p-10 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Pet preview" className="max-h-64 rounded-lg object-contain" />
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted-foreground/40 mb-4" />
                  <span className="text-sm text-muted-foreground">Click to upload or drag & drop</span>
                  <span className="text-xs text-muted-foreground/60 mt-1">JPG, PNG up to 10MB</span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </motion.div>

        {/* Step 2: Choose Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">2. Choose your style</h2>
          <p className="text-muted-foreground mb-6">Select the artistic style for your portrait</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {styles.map((style) => (
              <Card
                key={style.name}
                onClick={() => setSelectedStyle(style.name)}
                className={`relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedStyle === style.name
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
                    : "hover:shadow-luxury"
                }`}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3 text-center">
                  <span className="font-serif text-sm font-semibold text-primary-foreground">{style.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Step 3: Generate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          {creditBalance < 1 ? (
            <div className="p-6 rounded-xl border border-border bg-card mb-4">
              <p className="text-muted-foreground mb-3">You need at least 1 credit to generate a portrait</p>
              <Button asChild className="rounded-full">
                <Link to="/dashboard">Buy Credits</Link>
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!uploadedFile || !selectedStyle}
              className="rounded-full px-10 h-13 text-base shadow-luxury"
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              Generate Portrait (1 credit)
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Generate;
