import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { anonymousClient, jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "https://safalife-api.achmdndy.dev/auth/v1",
    plugins: [
        expoClient({
            scheme: "safalife",
            storagePrefix: "safalife",
            storage: SecureStore,
        }),
        anonymousClient(),
        jwtClient(),
    ]
});