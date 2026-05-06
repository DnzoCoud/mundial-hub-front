// src/pages/RegisterPage.tsx
import { useState } from 'react';
import InputWithIcon from '../components/InputWithIcon';
import styles from '../styles/RegisterPage.module.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { validateRegisterForm } from '../validations/registerValidation';
import logoImg from '../assets/LogoMundialBLanco.png';
import fondoImg from '../assets/FondoMundial.png';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateRegisterForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccessMsg('');
    setErrors({});

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessMsg(data.message);
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      } else {
        setErrors({ general: data.message || 'Error al registrar' });
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
          <h2 className={styles.title}>Crear Cuenta</h2>
          <p className={styles.subtitle}>Regístrate y únete al Mundial 2026 Hub.</p>
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              name="fullName"
              type="text"
              placeholder="Nombre completo"
              value={formData.fullName}
              onChange={handleChange}
              icon={<FaUser />}
              error={errors.fullName}
            />
            <InputWithIcon
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              icon={<FaEnvelope />}
              error={errors.email}
            />
            <InputWithIcon
              name="password"
              type="password"
              placeholder="Crear una contraseña"
              value={formData.password}
              onChange={handleChange}
              icon={<FaLock />}
              error={errors.password}
              helperText="Debe tener al menos 8 caracteres"
            />
            <InputWithIcon
              name="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={<FaLock />}
              error={errors.confirmPassword}
            />
            {errors.general && <div className={styles.errorGeneral}>{errors.general}</div>}
            {successMsg && <div className={styles.success}>{successMsg}</div>}
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Registrando...' : 'Registrarme'}
            </button>
          </form>
          <div className={styles.divider}>
            <hr />
            <span>¿Ya tienes una cuenta?</span>
            <hr />
          </div>
          <div className={styles.loginLink}>
            <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;