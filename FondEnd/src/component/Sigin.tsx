import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (user) => {
      const { data } = await axios.post(`http://localhost:3000/signin`, user);
      localStorage.setItem("user", JSON.stringify(data));
      return data.product;
    },
    onSuccess: () => {
      alert("Đăng nhập thành công");
      navigate(`/`); // Chuyển hướng sau khi đăng nhập thành công
    }
  });

  const onSubmit = (user) => {
    mutate(user);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng Nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input type="email" id="email" {...register("email")} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.email && 'border-red-500'}`} />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email phải có ít nhất 3 ký tự</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input type="password" id="password" {...register("password")} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.password && 'border-red-500'}`} />
            {errors.password && <p className="text-red-500 text-sm mt-1">Mật khẩu không hợp lệ</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">SignIn</button>

        </form>
        <Link to="/signup" className="text-decoration-none">Chưa có tài khoản? Đăng Ký ngay</Link>

      </div>
    </div>
  );
}

export default SignIn;
