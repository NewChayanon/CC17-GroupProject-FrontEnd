import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      {/* for temporary use */}
      <button className="bg-red-400" onClick={() => navigate("/home")}>
        Redirect to HOME
      </button>
      <button className="bg-blue-300" onClick={() => navigate("/login")}>
        Redirect to Login
      </button>
    </div>
  );
}
