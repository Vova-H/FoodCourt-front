import * as Yup from "yup";
import {i18n} from "../redux/features/LangSlice";

const invalidEmailError = i18n.t('loginScreen.invalidEmailError')
const passwordRequiredError = i18n.t('loginScreen.passwordRequiredError')
const emailRequiredError = i18n.t('loginScreen.emailRequiredError')

const LoginSchema = Yup.object().shape({
    email: Yup.string().email(invalidEmailError).required(emailRequiredError),
    password: Yup.string().required(passwordRequiredError)
});

export default LoginSchema
