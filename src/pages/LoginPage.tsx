// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputWithIcon from '../components/InputWithIcon';
import styles from '../styles/LoginPage.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import logoImg from '../assets/LogoMundialBLanco.png';
import fondoImg from '../assets/FondoMundial.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
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
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Guardar token y datos del usuario
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userFullName', data.fullName || '');
        // Redirigir a la página principal o dashboard
        navigate('/dashboard');
      } else {
        setErrors({ general: data.message || 'Error al iniciar sesión' });
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión con el servidor' });
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
              onChange={handleChange}
              icon={<FaEnvelope />}
              error={errors.email}
            />
            <div className={styles.passwordWrapper}>
              <InputWithIcon
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
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