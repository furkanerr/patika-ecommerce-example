
import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email girin.")
    .required("Zorunlu bir alan."),
  password: yup
    .string()
    .min(5, "Şifre mininmum 5 karakter olmalıdır.")
    .required("Zorunlu alan."),
  
});

export default validations;