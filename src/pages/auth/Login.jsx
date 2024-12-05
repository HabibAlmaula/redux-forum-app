import DicodingLogo from "../../assets/img/dicoding_logo.png";
import { useNavigate } from "react-router";
import { home } from "@/routes/routeName";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncLoginUser } from "@/states/authUser/action";
import LoginInput from "@/components/app/LoginInput";
import { requestState } from "@/utils/requestState";

const Login = () => {
  const  authUser = useSelector((state) => state.authUser.authUser);
  const loadingState = useSelector((state) => state.authUser.requestState);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncLoginUser({ email, password }));
  };

  useEffect(() => {
    if (authUser !== null) {
      navigate(home);
    }
  });

  return (
    <div className="flex w-full h-screen ">
      {/* Left side with logo */}
      <div className="hidden lg:flex lg:w-2/3 items-center justify-center p-8 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
        <div className="text-white text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <img
              src={DicodingLogo}
              alt="Dicoding Forum"
              className="w-32 h-32 mx-auto mb-6 transform hover:scale-105 transition-transform duration-300 object-contain"
            />
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg text-white/80">
              Sign in to continue your learning journey
            </p>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-4 md:p-8 ">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
            <div className="mb-8 text-center">
              {/* Show logo on mobile */}
              <div className="lg:hidden mb-6">
                <img
                  src={DicodingLogo}
                  alt="Dicoding Forum"
                  className="w-24 h-24 mx-auto object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
              <p className="text-gray-600">Please sign in to your account</p>
            </div>
            <LoginInput
              onSubmit={onLogin}
              isLoading={loadingState === requestState.loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
