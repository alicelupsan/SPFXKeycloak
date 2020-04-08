import { SPHttpClient, HttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { KeycloakInstance } from 'keycloak-js';

export class WeatherService {
  private baseUrl: string;
  private httpClient: SPHttpClient;
  private authService: KeycloakInstance;

  constructor(baseUrl, authService, httpClient) {
    this.baseUrl = baseUrl;
    this.authService = authService;
    this.httpClient = httpClient;
  }

  getWeatherForecast(): Promise<IWeatherForecast[]> {

    return this.httpClient.get(this.baseUrl + '/WeatherForecast', SPHttpClient.configurations.v1,
      this.getHeaders())
      .then((response) => response.json())
      .then((responseJSON): Promise<IWeatherForecast[]> => {
        let articleList: IWeatherForecast[] = responseJSON as IWeatherForecast[];
        return Promise.resolve(articleList);
      })
      .catch(() => {
        console.error("Error occured in 'WeatherForecast.ts' at method 'getWeatherForecast'");
        return null;
      });



    // .then((result) => IWeatherForecast[] {
    //   return result.json().then((json) : IWeatherForecast[] => {
    //     let forecasts = json as IWeatherForecast[];
    //     return forecasts;
    //   });
    // })
    // .catch(ex => {
    //   console.error(ex);
    //   return null;
    // });
  }

  private getHeaders(): ISPHttpClientOptions {
    const headers: ISPHttpClientOptions = {
      headers: { "Authorization": "Bearer " + this.authService.token }
    };

    return headers;
  }
}
