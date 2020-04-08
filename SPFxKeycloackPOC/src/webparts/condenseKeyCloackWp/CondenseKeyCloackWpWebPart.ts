import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CondenseKeyCloackWpWebPartStrings';
import CondenseKeyCloackWp from './components/CondenseKeyCloackWp';
import { ICondenseKeyCloackWpProps } from './components/ICondenseKeyCloackWpProps';
import { KeycloakService } from './auth/services/KeycloakService';
import { CondenseKeyCloakConfig } from './auth/models/KeycloakConfig';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { update } from '@microsoft/sp-lodash-subset';
import { IWeatherTableProps } from './weather/components/IWeatherTableProps';
import { WeatherService } from './weather/services/WeatherService';
import WeatherTable from './weather/components/WeatherTable';




export interface ICondenseKeyCloackWpWebPartProps {
  description: string;
}

export default class CondenseKeyCloackWpWebPart extends BaseClientSideWebPart<ICondenseKeyCloackWpWebPartProps> {



  constructor(){
    super();


  }



  public render(): void {
    const welcomeMessage: React.ReactElement<ICondenseKeyCloackWpProps > = React.createElement(
      CondenseKeyCloackWp,
      {
        description: "",
        httpClient: this.context.spHttpClient
      }
    );



    ReactDom.render(welcomeMessage, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
