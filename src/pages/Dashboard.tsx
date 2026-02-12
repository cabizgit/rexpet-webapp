import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, History, Settings, Crown } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "history" | "settings">("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/login");
      else setUser(session.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="h-12 w-48" />
      </div>
    );
  }

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: Upload },
    { id: "history" as const, label: "History", icon: History },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8">
          <h1 className="font-serif text-xl font-bold text-gradient-gold">RexPet</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary/30 text-primary hover:bg-primary/5">
              <Crown className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Want your physical masterpiece?</span>
              <span className="sm:hidden">Print</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Content area */}
          <div className="flex-1 p-6 lg:p-10">
            {activeTab === "dashboard" && (
              <div className="max-w-4xl">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Welcome{user?.email ? `, ${user.email.split("@")[0]}` : ""}
                </h2>
                <p className="text-muted-foreground mb-8">Create your next pet masterpiece</p>

                {/* Credits */}
                <div className="p-6 rounded-xl bg-card border border-border shadow-luxury mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Credit Balance</p>
                      <p className="font-serif text-4xl font-bold text-foreground">0</p>
                    </div>
                    <Button className="rounded-full">Buy Credits</Button>
                  </div>
                </div>

                {/* Empty state */}
                <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card/50">
                  <Upload className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No portraits yet</h3>
                  <p className="text-muted-foreground mb-6">Upload a photo of your pet to get started</p>
                  <Button className="rounded-full">Upload Photo</Button>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="max-w-4xl">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">History</h2>
                <p className="text-muted-foreground mb-8">All your generated portraits</p>
                <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card/50">
                  <History className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No history yet</h3>
                  <p className="text-muted-foreground">Your generated portraits will appear here</p>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="max-w-2xl">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-2">Settings</h2>
                <p className="text-muted-foreground mb-8">Manage your account</p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:flex w-56 border-l border-border flex-col p-4 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </aside>
        </div>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden border-t border-border flex" aria-label="Dashboard navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
