import DicodingLogo from "../../assets/img/dicoding_logo.png";
import RegisterInput from "@/components/app/RegisterInput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { asyncUserRegister } from "@/states/users/action";

const Register = () => {
  const { loadingBar } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleRegister = ({ email, password, name }) => {
    dispatch(asyncUserRegister({ email, password, name }));
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
      {/* Left side with logo */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="text-white text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            <img
              src={DicodingLogo}
              alt="Dicoding Forum"
              className="w-32 h-32 mx-auto mb-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 object-contain"
            />
            <h2 className="text-3xl font-bold mb-4">Join Our Community!</h2>
            <p className="text-lg text-white/80">
              Start your learning journey today
            </p>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
            <div className="mb-8 text-center">
              {/* Show logo on mobile */}
              <div className="lg:hidden mb-6">
                <img
                  src={DicodingLogo}
                  alt="Dicoding Forum"
                  className="w-24 h-24 mx-auto rounded-lg shadow-md object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Sign up to get started</p>
            </div>

            <RegisterInput
              handleSubmit={handleRegister}
              isLoading={loadingBar.default !== 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
