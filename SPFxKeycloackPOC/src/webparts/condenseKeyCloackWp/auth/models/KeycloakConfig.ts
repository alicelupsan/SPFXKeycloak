import { KeycloakOnLoad, KeycloakFlow, KeycloakResponseType } from "keycloak-js";

export interface KeycloakConfig {
  clientId: string;
  realm: string;
  scope: string;
  redirectUri: string;
  onload: KeycloakOnLoad;
  url: string;
  flow: KeycloakFlow;
  responseType: KeycloakResponseType;
}

export const CondenseKeyCloakConfig: KeycloakConfig = {
  clientId : "KeycloakASPNETCore",
  realm : "condense",
  url: "https://keycloak-demo.virtualcorp.ch/auth",
  redirectUri : window.location.origin,
  scope : "openid profile email",
  onload: "login-required",
  flow: "implicit",
  responseType: "id_token token"
}

