import * as Yup from "yup";
import {i18n} from "../redux/features/LangSlice";

const invalidEmailError = i18n.t('registerScreen.invalidEmailError')
const emailRequiredError = i18n.t('registerScreen.emailRequiredError')
const usernameRequiredError = i18n.t('registerScreen.usernameRequiredError')
const shortUsernameError = i18n.t('registerScreen.shortUsernameError')
const longUsernameError = i18n.t('registerScreen.longUsernameError')
const passwordRequiredError = i18n.t('registerScreen.passwordRequiredError')
const shortPasswordError = i18n.t('registerScreen.shortPasswordError')
const longPasswordError = i18n.t('registerScreen.longPasswordError')


const RegistrationSchema = Yup.object().shape({
    email: Yup.string().email(invalidEmailError).required(emailRequiredError),
    username: Yup.string().required(usernameRequiredError)
        .min(4, shortUsernameError)
        .max(15, longUsernameError),
    password: Yup.string().required(passwordRequiredError)
        .min(4, shortPasswordError)
        .max(15, longPasswordError),
});

export default RegistrationSchema
