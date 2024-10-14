import { jwtDecode } from "jwt-decode";

const jwt = (token: string) => {
    return jwtDecode(token);
};

const tokenIsInvalid = (token: string) => {
    if (token === undefined || !token || token === "") return false;

    const decoded = jwt(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp! < currentTime;
};

export { jwt, tokenIsInvalid };
