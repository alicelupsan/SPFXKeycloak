import * as React from 'react';
import styles from './CondenseKeyCloackWp.module.scss';
import { ICondenseKeyCloackWpProps } from './ICondenseKeyCloackWpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { KeycloakService } from '../../../../lib/webparts/condenseKeyCloackWp/auth/services/KeycloakService';
import { KeycloakInstance, KeycloakTokenParsed } from 'keycloak-js';
import { WeatherService } from '../weather/services/WeatherService';
import { CondenseKeyCloakConfig } from '../auth/models/KeycloakConfig';
import WeatherTable from '../weather/components/WeatherTable';

export interface ICondenseKeyCloackWpState {
  weatherForecast: IWeatherForecast[];
  loggedInUserEmail: string;
}

export default class CondenseKeyCloackWp extends React.Component<ICondenseKeyCloackWpProps, ICondenseKeyCloackWpState> {

  private baseUrl: string = "https://keycloak-demo-api.ngrok.io";
  private keycloakService: KeycloakService;
  private client: KeycloakInstance;
  private weatherService: WeatherService;

  constructor() {
    super();
    this.state = {
      weatherForecast: null,
      loggedInUserEmail: null
    }
  }


  componentDidMount() {
    this.keycloakService = new KeycloakService(CondenseKeyCloakConfig);
    this.client = this.keycloakService.getClient();
    this.client.init({ onLoad: CondenseKeyCloakConfig.onload, flow: CondenseKeyCloakConfig.flow }).then((auth) => {

      if (!auth) {
        // window.location.reload();
        console.log("Not Authenticated");
      } else {
        console.log("Authenticated");

        console.log("this is the token: ");

        let parsedToken: any = this.client.tokenParsed;
        console.log(parsedToken);

        this.setState({
            loggedInUserEmail: parsedToken.email
        })

        this.weatherService = new WeatherService(this.baseUrl, this.client, this.props.httpClient);
        this.weatherService.getWeatherForecast().then(value => {
          this.setState({
            weatherForecast: value,

          });
          console.log(value);
        });
      }
    })
      .catch((err) => {
        console.error(err);
      });
  }

  public render(): React.ReactElement<ICondenseKeyCloackWpProps> {
    return (
      <div className={styles.condenseKeyCloackWp} >
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to Keycloak Demo! {this.state.loggedInUserEmail}</span>
              <p className={styles.description}>{escape(this.props.description)}</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <WeatherTable weatherForecast={this.state.weatherForecast}></WeatherTable>
            </div>
          </div>
        </div>

      </div >
    );
  }
}
