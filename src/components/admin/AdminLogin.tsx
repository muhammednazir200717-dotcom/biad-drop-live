import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[360px]">
        <h1 className="font-heading text-4xl tracking-[4px] text-foreground text-center mb-2">ADMIN</h1>
        <p className="font-body text-xs tracking-[4px] text-muted-foreground text-center uppercase mb-10">
          Brand Owner Access
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-body tracking-[2px] text-sm border-border bg-card"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-body tracking-[2px] text-sm border-border bg-card"
            required
          />
          {error && (
            <p className="font-body text-xs tracking-[2px] text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full font-body text-[10px] tracking-[4px] uppercase rounded-none"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
