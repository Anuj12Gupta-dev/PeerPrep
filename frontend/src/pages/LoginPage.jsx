import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { isAuthenticated, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = () => {
    // Initialize Google Identity Services
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    // Prompt user to select a Google Account
    google.accounts.id.prompt();
  };

  const handleCredentialResponse = async (response) => {
    try {
      const result = await loginWithGoogle(response.credential);
      if (result.success) {
        navigate("/dashboard");
      } else {
        console.error("Login failed:", result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <div className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            Welcome to Talent IQ
          </h1>
          <p className="text-base-content/60">
            Sign in to start coding together
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-base-300 rounded-xl shadow-sm hover:bg-base-100 transition-colors duration-200"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>
        </div>

        <div className="text-center text-sm text-base-content/50 pt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>

      {/* Google Identity Services script */}
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </div>
  );
};

export default LoginPage;