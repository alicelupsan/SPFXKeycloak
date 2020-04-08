import { KeycloakConfig, CondenseKeyCloakConfig } from '../models/KeycloakConfig';
import Keycloak, { KeycloakInstance, KeycloakResponseType } from 'keycloak-js';
import React from 'react';

export class KeycloakService {

  private client:KeycloakInstance;

  constructor(config:KeycloakConfig){

      this.client = Keycloak(config);
      this.client.responseType =  config.responseType;
  }

  getClient(){
    return this.client;
  }
}
