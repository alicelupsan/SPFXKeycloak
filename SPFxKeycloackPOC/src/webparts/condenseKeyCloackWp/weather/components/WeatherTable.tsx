import * as React from 'react';
import { IWeatherTableProps } from './IWeatherTableProps';

export default class WeatherTable extends React.Component<IWeatherTableProps> {
  public render(): React.ReactElement<IWeatherTableProps> {
    return (
      <div>
        {(!this.props.weatherForecast) && <p><em>Loading...</em></p>}

        {this.props.weatherForecast && <table className='table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temp. (C)</th>
              <th>Temp. (F)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {this.props.weatherForecast.map(forecast => {
              return <tr>
                <td>{ forecast.dateFormatted }</td>
                <td>{ forecast.temperatureC }</td>
                <td>{ forecast.temperatureF }</td>
                <td>{ forecast.summary }</td>
              </tr>;
            })}
          </tbody>
        </table>}
      </div>);
  }
}
