import jwt_decode from "jwt-decode";

const ParseJWTHelper = (token) => {
    return jwt_decode(token);
}
export default ParseJWTHelper
