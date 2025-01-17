import { useEffect, useState } from "react";
import "./App.css";

type Forecast = {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
};

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>([]);

    const requestWeather = async () => {
        const weather = await fetch("api/weatherforecast");
        console.log(weather);

        const weatherJson = await weather.json();
        console.log(weatherJson);

        setForecasts(weatherJson);
    };

    useEffect(() => {
        requestWeather();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Weather</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(
                        forecasts.length > 0 ? forecasts : [
                            {
                                date: "N/A",
                                temperatureC: 0,
                                temperatureF: 0,
                                summary: "No forecasts",
                            },
                        ]
                    ).map((w) => {
                        return (
                            <tr key={w.date}>
                                <td>{w.date}</td>
                                <td>{w.temperatureC}</td>
                                <td>{w.temperatureF}</td>
                                <td>{w.summary}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </header>
        </div>
    );
}

export default App;
