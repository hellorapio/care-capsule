import Link from "next/link";
import Image from "next/image";
import { FaEye } from "react-icons/fa"; 


const Login = () => {
  return (
    <div className="flex h-screen">
      {/* left-side*/}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <Image src="/logologin.png" alt="Logo" width={207} height={67} />
          </div>

          <h1 className="text-4xl w-[50%] font-bold text-[#2BADE8] text-center mb-2">
            Welcome to CareCapsule
          </h1>
        </div>
      </div>

      {/* right-side*/}
      <div className="w-1/2 flex flex-col justify-center px-12 bg-gray-100">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-700 "
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-3 text-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300   "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 text-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 "
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer">
                <FaEye className="fas faeye text-xl" />
              </span>
            </div>
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-[#2BADE8] hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2BADE8] text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-600"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center border py-3 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <Image
              src="/google.png"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Google
          </button>
          <button className="w-full flex items-center justify-center border py-3 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <Image
              src="/facebook.png"
              alt="Facebook"
              width={20}
              height={20}
              className="mr-2"
            />
            Facebook
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account yet?{" "}
            <Link href="/register" className="text-[#2BADE8] hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
