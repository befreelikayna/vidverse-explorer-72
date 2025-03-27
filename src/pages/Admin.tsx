
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateAdmin } from "@/lib/socialMedia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Lock, User } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      const isAuthenticated = authenticateAdmin(username, password);

      if (isAuthenticated) {
        localStorage.setItem("isAdminAuthenticated", "true");
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-2 text-gray-400">Enter your credentials to access the admin panel</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
