import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (user) => {
      const { data } = await axios.post(`http://localhost:3000/signup`, user);
      return data.product;
    },
    onSuccess: () => {
      alert("Đăng ký thành công");
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      });
      navigate(`/signin`); 
    }
  });

  const onSubmit = (user) => {
    mutate(user);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center mb-4">Đăng ký</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Tên</label>
                  <input type="text" id="username" {...register("username")} className={`form-control ${errors.username && 'is-invalid'}`} />
                  {errors.username && <div className="invalid-feedback">Tên phải có ít nhất 3 ký tự</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" id="email" {...register("email")} className={`form-control ${errors.email && 'is-invalid'}`} />
                  {errors.email && <div className="invalid-feedback">Email không hợp lệ</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <div className="input-group">
                    <input type={showPassword ? "text" : "password"} id="password" {...register("password")} className={`form-control ${errors.password && 'is-invalid'}`} />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                  {errors.password && <div className="invalid-feedback">Mật khẩu phải có ít nhất 6 ký tự</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>

                  <div className='input-group'>
                    <input type="password" id="confirmPassword" {...register("confirmPassword")} className={`form-control ${errors.confirmPassword && 'is-invalid'}`} />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="invalid-feedback">Mật khẩu không khớp</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">Đăng ký</button>
              </form>
              <div className="text-center">
                <Link to="/signin" className="text-decoration-none">Đã có tài khoản? Đăng nhập ngay</Link>
              </div>
              <div className="text-center mt-4">
                <span className="text-muted">Hoặc đăng nhập bằng:</span>
                <button className="btn btn-outline-primary mx-2">
                  <i className="fab fa-google"></i> Google
                </button>
                <button className="btn btn-outline-primary mx-2">
                  <i className="fab fa-facebook-f"></i> Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
