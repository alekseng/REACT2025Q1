import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('This field is required'),
  age: yup
    .number()
    .min(0, 'Age can not be a negative')
    .typeError('Age must be a number')
    .required('This field is required'),
  email: yup.string().email().required('This field is required'),
  password: yup
    .string()
    .matches(/(?=.*\d)/, 'Password must contain at least one digit')
    .matches(/(?=.*\W)/, 'Password must contain at least one special character')
    .matches(
      /(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least one lowercase letter'
    )
    .required('This field is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('This field is required'),
  gender: yup.string().required('This field is required'),
  picture: yup
    .mixed<FileList>()
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) =>
        !value ||
        (value[0] && ['image/jpeg', 'image/png'].includes(value[0].type))
    )
    .test(
      'fileSize',
      'File is too large',
      (value) => !value || (value[0] && value[0].size <= 2 * 1024 * 1024)
    )
    .required('This field is required'),
  country: yup.string().required('This field is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
});
