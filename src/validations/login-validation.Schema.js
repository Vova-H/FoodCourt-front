import * as yup from "yup";
import {i18n} from "../redux/features/LangSlice";


const LoginSchema = (lang) => {
    const invalidEmailError = i18n.t('loginScreen.invalidEmailError', {locale: lang});
    const passwordRequiredError = i18n.t('loginScreen.passwordRequiredError', {locale: lang});
    const emailRequiredError = i18n.t('loginScreen.emailRequiredError', {locale: lang});

    return yup.object().shape({
        email: yup.string().email(`${invalidEmailError}`).required(`${emailRequiredError}`),
        password: yup.string().required(`${passwordRequiredError}`)
    });
};

export default LoginSchema

