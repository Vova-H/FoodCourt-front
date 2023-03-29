import {createSlice} from '@reduxjs/toolkit';
import {I18n} from "i18n-js";
import {localization} from "../../../lang";
import * as Localization from "expo-localization";

export const i18n = new I18n(localization)

const initialState = {
    lang: "en"
}

i18n.locale = Localization.locale;
i18n.enableFallback = true;

const languageSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.lang = action.payload;
            i18n.locale = action.payload
        }
    },
});
export const {changeLanguage} = languageSlice.actions
export default languageSlice.reducer;
