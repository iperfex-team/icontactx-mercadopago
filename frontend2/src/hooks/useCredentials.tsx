interface Credentials {
    token: string;
    icid: string;
    lic: string;
}

export const useCredentials = () => {
    // Codifica las credenciales
    const encodeCredentials = ({ token, icid, lic }: Credentials) => {
        return btoa(`${token}:${icid}:${lic}`);
    };

    // Genera la URL con las credenciales
    const generateUrl = (productUrl: string, { token, icid, lic }: Credentials) => {
        const baseUrl = import.meta.env.VITE_SURVEY_OUT_DOMAIN_URL
            ? import.meta.env.VITE_SURVEY_OUT_DOMAIN_URL as string
            : productUrl;

        const encodedCredentials = encodeCredentials({ token, icid, lic });
        return `${baseUrl}/auth?c=${encodedCredentials}`;
    };

    const redirectTo = (productUrl: string, { token, icid, lic }: Credentials) => {
        const url = generateUrl(productUrl, { token, icid, lic });
        // window.location.href = url;
        window.open(`${url}`, "_blank");
    };

    return { redirectTo };
};
