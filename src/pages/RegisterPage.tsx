// src/pages/RegisterPage.tsx
import { AuthApi } from '@/app/infrastructure/api/auth.api';
import type { RegisterPayload } from '@/app/infrastructure/http/types/register-payload.type';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import fondoImg from '../assets/FondoMundial.png';
import logoImg from '../assets/LogoMundialBLanco.png';
import InputWithIcon from '../components/InputWithIcon';
import styles from '../styles/RegisterPage.module.css';
import { validateRegisterForm } from '../validations/registerValidation';
import type { ApiException } from '@/app/infrastructure/exceptions/api.exception';

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterPayload>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

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
      await AuthApi.register(formData)
      navigate("/login")
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
          <h2 className={styles.title}>Crear Cuenta</h2>
          <p className={styles.subtitle}>Regístrate y únete al Mundial 2026 Hub.</p>
          <form onSubmit={handleSubmit}>
            <InputWithIcon
              name="fullName"
              type="text"
              placeholder="Nombre completo"
              value={formData.fullName}
              onChange={handleInputChange}
              icon={<FaUser />}
              error={errors.fullName}
            />
            <InputWithIcon
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              icon={<FaEnvelope />}
              error={errors.email}
            />
            <InputWithIcon
              name="password"
              type="password"
              placeholder="Crear una contraseña"
              value={formData.password}
              onChange={handleInputChange}
              icon={<FaLock />}
              error={errors.password}
              helperText="Debe tener al menos 8 caracteres"
            />
            <InputWithIcon
              name="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              icon={<FaLock />}
              error={errors.confirmPassword}
            />
            {errors.general && <div className={styles.errorGeneral}>{errors.general}</div>}
            {successMsg && <div className={styles.success}>{successMsg}</div>}
            <Button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Registrando...' : 'Registrarme'}
            </Button>
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