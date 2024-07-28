import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
}

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Signed In", type: "SUCCESS" });
      navigate("/home");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    }
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Submitting data:", data);
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-6 p-6 bg-white rounded shadow-lg" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h2>

      <label className="text-gray-700 text-sm font-bold flex flex-col">
        E-mail
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 mt-1 text-xs">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-2 px-3 mt-1 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "At least 6 characters",
            }
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <span className="flex items-center justify-between mt-4 space-x-4">
        <span className="text-sm text-gray-600">
          Not Registered?
          <Link className="underline ml-1 text-blue-600 hover:text-blue-800" to='/register'>Create an Account</Link>
        </span>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-500 text-xl transition duration-200">Login</button>
      </span>
    </form>
  );
}

export default SignIn;
