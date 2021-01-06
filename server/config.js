const databaseURL = "mongodb://localhost:27017/";
const JWT_PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "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\n" +
    "-----END RSA PRIVATE KEY-----\n";

const JWT_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\n" +
    "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEArvPrp2SLIHWGYsht26x6\n" +
    "80bqTC4NhxRxy3UVifNEt4OZOGB8A4KS6tM31SGhviK5meY5JsJ4+mTrjx6s128O\n" +
    "usJwAn9dKpTOURdW6MwxYbqMeEh0YM0sgizslNoCGbBuBPqngTP0WEPCpKbqeQSN\n" +
    "LRVm7fkWCx2tDLvWGypEipO9hfuHDrJbdQDRtQKCmL2AiPkjDhzFQsqA3IU/BV3D\n" +
    "75CzYbeW4tOedZtmwL05EI17eYwfyAwxxKt84QkTvedNdFJ4lfzDJaPmwn6qb+4k\n" +
    "lJJD8XjsNVEHSqm2g89okVEywsGPKN7w0pjNBDs2T13swmPGTuirKK8ku/eLFqJe\n" +
    "qwUzo0FQZ8v7S6zp+ALQeWNSa9s0Deh1X71pxoWHHMtqJgNGCERHBmMYvRxxBYpi\n" +
    "GKir087X9ZUdyCdMMIHXvTJRL+p/2dtK84IhVuXrwgAtUdjUpNzEMpUO6oLmjDXs\n" +
    "UY038tLHpXSO4fZEllp1AbCxR0T6OIhB2JFxP2ZPCh882pAa1d1tK2hOBnUt1zP1\n" +
    "DexGjVLqcufnwDPEt/EM1qo6PnQ9GfAwYQIhERh+b7EfRstG6ldbtv+jRE1OopGl\n" +
    "gUuIys4+mGAlJKPMg0HaGyC+QdFlg0UxOJw64AjEbgMlgGi5jYpJDzh9coTGj0Ki\n" +
    "TIpmBe1fV8/e0CczPr8GVoECAwEAAQ==\n" +
    "-----END PUBLIC KEY-----\n";


module.exports = {
    databaseURL: databaseURL,
    JWT_PRIVATE_KEY: JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY: JWT_PUBLIC_KEY,
};
