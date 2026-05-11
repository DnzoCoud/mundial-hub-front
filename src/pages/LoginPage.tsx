// src/pages/LoginPage.tsx
import { AuthApi } from '@app/app/infrastructure/api/auth.api';
import type { ApiException } from '@app/app/infrastructure/exceptions/api.exception';
import { type LoginPayload } from '@app/app/infrastructure/http/types/login-payload.type';
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import fondoImg from '../assets/FondoMundial.png';
import logoImg from '../assets/LogoMundialBLanco.png';
import InputWithIcon from '../components/InputWithIcon';
import styles from '../styles/LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {

      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const data = await AuthApi.login(formData)
      localStorage.setItem('token', data.token);
      navigate("/dashboard")
    } catch (error) {
      const errorCustom = error as ApiException
      setErrors({ general: errorCustom.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.background} style={{ backgroundImage: `url(${fondoImg})` }}>
      <div className={styles.container}>
        <img src={logoImg} alt="Logo Mundial 2026" className={styles.logo} />
        <div className={styles.card}>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <p className={styles.subtitle}>Accede a tu cuenta.</p>
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              icon={<FaEnvelope />}
              error={errors.email}
            />
            <div className={styles.passwordWrapper}>
              <InputWithIcon
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                icon={<FaLock />}
                error={errors.password}
              />
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Olvidé mi contraseña
              </Link>
            </div>
            {errors.general && <div className={styles.errorGeneral}>{errors.general}</div>}
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>
          <div className={styles.divider}>
            <hr />
            <span>¿No tienes cuenta?</span>
            <hr />
          </div>
          <div className={styles.registerLink}>
            <Link to="/register">Registrate aquí</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;