import * as yup from "yup";
import {i18n} from "../redux/features/LangSlice";


const RegistrationSchema = (lang) => {
    const invalidEmailError = i18n.t('registerScreen.invalidEmailError', {locale: lang})
    const emailRequiredError = i18n.t('registerScreen.emailRequiredError', {locale: lang})
    const usernameRequiredError = i18n.t('registerScreen.usernameRequiredError', {locale: lang})
    const shortUsernameError = i18n.t('registerScreen.shortUsernameError', {locale: lang})
    const longUsernameError = i18n.t('registerScreen.longUsernameError', {locale: lang})
    const passwordRequiredError = i18n.t('registerScreen.passwordRequiredError', {locale: lang})
    const shortPasswordError = i18n.t('registerScreen.shortPasswordError', {locale: lang})
    const longPasswordError = i18n.t('registerScreen.longPasswordError', {locale: lang})
    return yup.object().shape({
        email: yup.string().email(`${invalidEmailError}`).required(`${emailRequiredError}`),
        username: yup.string().required(`${usernameRequiredError}`)
            .min(4, `${shortUsernameError}`)
            .max(15, `${longUsernameError}`),
        password: yup.string().required(`${passwordRequiredError}`)
            .min(4, `${shortPasswordError}`)
            .max(15, `${longPasswordError}`),
    });
}
export default RegistrationSchema
