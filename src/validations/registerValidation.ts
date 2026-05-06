// src/validations/registerValidation.ts
export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateRegisterForm = (data: RegisterFormData) => {
  const errors: Record<string, string> = {};

  const nameRegex = /^[a-zA-ZáéíóúñÑüÜ\s]+$/;
  const trimmedName = data.fullName?.trim() || '';
  if (!trimmedName) errors.fullName = 'El nombre completo es obligatorio';
  else if (trimmedName.length < 2) errors.fullName = 'El nombre debe tener al menos 2 caracteres';
  else if (trimmedName.length > 100) errors.fullName = 'El nombre no puede exceder 100 caracteres';
  else if (!nameRegex.test(trimmedName)) errors.fullName = 'El nombre solo puede contener letras y espacios';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = data.email?.trim() || '';
  if (!trimmedEmail) errors.email = 'El correo es obligatorio';
  else if (trimmedEmail.length > 150) errors.email = 'El correo no puede exceder 150 caracteres';
  else if (!emailRegex.test(trimmedEmail)) errors.email = 'Ingresa un correo electrónico válido';

  if (!data.password) errors.password = 'La contraseña es obligatoria';
  else if (data.password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres';
  else if (data.password.length > 128) errors.password = 'La contraseña no puede exceder 128 caracteres';

  if (data.password !== data.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';

  return errors;
};