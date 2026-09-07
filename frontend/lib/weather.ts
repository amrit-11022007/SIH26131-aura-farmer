import { useState, useEffect } from "react";
import { WeatherData } from "@/types";
import { DEMO_WEATHER } from "./demo-data";

export interface LatLng {
  latitude: number;
  longitude: number;
  locationName?: string;
}

// Default location: Niphad, Nashik District, Maharashtra (Major agricultural hub)
export const DEFAULT_LOCATION: LatLng = {
  latitude: 20.0059,
  longitude: 73.7898,
  locationName: "Niphad, Nashik District",
};

/**
 * Fetches real live weather data from Open-Meteo API
 * Open-Meteo is a free, open-source weather API requiring no API key.
 */
export async function fetchLiveWeather(
  lat: number = DEFAULT_LOCATION.latitude,
  lon: number = DEFAULT_LOCATION.longitude,
  locationName: string = DEFAULT_LOCATION.locationName || "Local Farm Region"
): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,rain,showers,precipitation,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m&timezone=auto`;

    const res = await fetch(url);
    if (!res.ok) {
      console.warn("Open-Meteo weather API response not OK, using fallback weather data.");
      return DEMO_WEATHER;
    }

    const data = await res.json();
    const current = data.current || {};

    const temperature = Math.round((current.temperature_2m ?? 27.5) * 10) / 10;
    const humidity = Math.round((current.relative_humidity_2m ?? 82) * 10) / 10;
    const rainfall = Math.round(((current.precipitation ?? current.rain ?? 0.0)) * 10) / 10;
    const windSpeed = Math.round((current.wind_speed_10m ?? 12.0) * 10) / 10;

    // Disease Conduciveness Logic (Agri-Meteorological standard)
    // High relative humidity (> 75%) + Warm temp (18-35°C) creates high fungal/bacterial spore incubation risk
    const isHumidityConducive = humidity >= 75;
    const isTempConducive = temperature >= 18 && temperature <= 35;
    const diseaseConducive = isHumidityConducive && isTempConducive;

    // Calculate risk increase percentage dynamically
    const baseRiskPercent = Math.min(
      95,
      Math.max(10, Math.round((humidity / 100) * 60 + (rainfall > 0 ? 25 : 5) + (temperature > 25 ? 15 : 5)))
    );

    let explanation = "";
    if (diseaseConducive) {
      explanation = `Live Open-Meteo data (${temperature}°C, ${humidity}% RH): High humidity combined with warm ambient temperature creates optimal microclimate for fungal spore (Blight/Mildew) germination.`;
    } else if (humidity >= 65) {
      explanation = `Live Open-Meteo data (${temperature}°C, ${humidity}% RH): Moderate humidity levels. Monitor crops regularly for early symptom development.`;
    } else {
      explanation = `Live Open-Meteo data (${temperature}°C, ${humidity}% RH): Low weather-induced disease risk currently. Standard preventive crop management recommended.`;
    }

    return {
      location: locationName,
      temperature,
      humidity,
      rainfall,
      wind_speed: windSpeed,
      disease_conducive: diseaseConducive,
      risk_change_percent: baseRiskPercent,
      explanation,
    };
  } catch (err) {
    console.warn("Failed to fetch live Open-Meteo weather data, using fallback:", err);
    return DEMO_WEATHER;
  }
}

/**
 * Custom React Hook to get live weather with auto browser geolocation
 */
export function useLiveWeather(initialLocation: LatLng = DEFAULT_LOCATION) {
  const [weather, setWeather] = useState<WeatherData>(DEMO_WEATHER);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather(lat: number, lon: number, name: string) {
      setLoading(true);
      const data = await fetchLiveWeather(lat, lon, name);
      if (isMounted) {
        setWeather(data);
        setLoading(false);
      }
    }

    // Try browser Geolocation first if available
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          loadWeather(pos.coords.latitude, pos.coords.longitude, "My Current Field (Live Geolocation)");
        },
        () => {
          // Geolocation permission denied or failed: fallback to default location
          loadWeather(initialLocation.latitude, initialLocation.longitude, initialLocation.locationName || "Niphad, Nashik District");
        },
        { timeout: 5000 }
      );
    } else {
      loadWeather(initialLocation.latitude, initialLocation.longitude, initialLocation.locationName || "Niphad, Nashik District");
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return { weather, loading, error };
}
