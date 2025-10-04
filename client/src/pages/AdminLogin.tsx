import { useLocation } from "wouter";
import Header from "@/components/Header";
import AdminLoginForm from "@/components/AdminLoginForm";

export default function AdminLogin() {
  const [, setLocation] = useLocation();

  const handleLogin = (data: any) => {
    //todo: remove mock functionality
    console.log("Admin login:", data);
    if (data.username === "admin" && data.password === "admin123") {
      setLocation("/admin/dashboard");
    } else {
      alert("Invalid credentials. Try: admin / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center px-4 py-20">
        <AdminLoginForm onLogin={handleLogin} />
      </main>
    </div>
  );
}
