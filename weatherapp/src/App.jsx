import { useState, useEffect } from 'react'
import './App.css'

const CITY_LIST = [
  { name: '서울', value: 'Seoul' },
  { name: '부산', value: 'Busan' },
  { name: '대구', value: 'Daegu' },
  { name: '제주', value: 'Jeju' },
  { name: '도쿄', value: 'Tokyo' },
  { name: '뉴욕', value: 'New York' },
];

function getSeason(month) {
  if ([12, 1, 2].includes(month)) return 'winter';
  if ([3, 4, 5].includes(month)) return 'spring';
  if ([6, 7, 8].includes(month)) return 'summer';
  return 'autumn';
}

// 날씨별 애니메이션 클래스 반환
function getWeatherAnim(desc) {
  if (!desc) return '';
  const d = desc.toLowerCase();
  if (d.includes('rain') || d.includes('비')) return 'weather-anim-rain';
  if (d.includes('cloud') || d.includes('구름')) return 'weather-anim-cloud';
  if (d.includes('snow') || d.includes('눈')) return 'weather-anim-snow';
  if (d.includes('clear') || d.includes('맑')) return 'weather-anim-sun';
  if (d.includes('thunder')) return 'weather-anim-thunder';
  return 'weather-anim-default';
}

function App() {
  const [city, setCity] = useState('Seoul');
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [season, setSeason] = useState(getSeason(new Date().getMonth() + 1));
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const [forecast, setForecast] = useState([]); // 주간 예보

  // 내 위치 날씨 가져오기
  useEffect(() => {
    if (!isCurrentLocation) return;
    setLoading(true);
    setError('');
    if (!navigator.geolocation) {
      setError('이 브라우저는 위치 정보를 지원하지 않습니다.');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // 현재 날씨
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&APIkey=bdff61d6ba94aeaa2e47bed54157fca6`)
          .then((res) => res.json())
          .then((result) => {
            setWeather({
              temp: result.main.temp,
              desc: result.weather[0].description,
              icon: result.weather[0].icon,
              humidity: result.main.humidity,
              wind: result.wind.speed,
              feels: result.main.feels_like,
              city: result.name,
            });
            setCity(result.name);
            setLoading(false);
            setError('');
          })
          .catch(() => {
            setError('위치 기반 날씨 정보를 불러올 수 없습니다.');
            setLoading(false);
          });
        // 5일 예보
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=Metric&APIkey=bdff61d6ba94aeaa2e47bed54157fca6`)
          .then((res) => res.json())
          .then((result) => {
            setForecast(processForecast(result));
          });
      },
      () => {
        setError('위치 권한이 거부되었습니다.');
        setLoading(false);
      }
    );
  }, [isCurrentLocation]);

  // 도시 날씨 가져오기
  useEffect(() => {
    if (isCurrentLocation) return;
    setLoading(true);
    setError('');
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&APIkey=bdff61d6ba94aeaa2e47bed54157fca6`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== 200) {
          setError('날씨 정보를 찾을 수 없습니다.');
          setWeather(null);
          setLoading(false);
          return;
        }
        setWeather({
          temp: result.main.temp,
          desc: result.weather[0].description,
          icon: result.weather[0].icon,
          humidity: result.main.humidity,
          wind: result.wind.speed,
          feels: result.main.feels_like,
          city: result.name,
        });
        setLoading(false);
        setError('');
      })
      .catch(() => {
        setError('날씨 정보를 불러올 수 없습니다.');
        setWeather(null);
        setLoading(false);
      });
    // 5일 예보
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&APIkey=bdff61d6ba94aeaa2e47bed54157fca6`)
      .then((res) => res.json())
      .then((result) => {
        setForecast(processForecast(result));
      });
  }, [city, isCurrentLocation]);

  // 계절 정보 갱신
  useEffect(() => {
    setSeason(getSeason(new Date().getMonth() + 1));
  }, [city]);

  // 5일 예보 데이터 가공 (매일 12:00 데이터만 추출)
  function processForecast(result) {
    if (!result.list) return [];
    const daily = {};
    result.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      const hour = item.dt_txt.split(' ')[1].split(':')[0];
      if (hour === '12') {
        daily[date] = item;
      }
    });
    return Object.values(daily).slice(0, 5);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search.trim());
      setIsCurrentLocation(false);
      setSearch('');
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setIsCurrentLocation(false);
  };

  const handleCurrentLocation = () => {
    setIsCurrentLocation(true);
    setError('');
  };

  // 요일 구하기
  function getDay(dateStr) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const d = new Date(dateStr);
    return days[d.getDay()];
  }

  return (
    <div className={`weather-container season-${season}`}>
      <h1 className="weather-title">날씨 정보</h1>
      <form className="city-search-form" onSubmit={handleSearch}>
        <input
          className="city-search-input"
          type="text"
          placeholder="도시 이름을 입력하세요 (영문)"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="city-search-btn" type="submit">검색</button>
      </form>
      <div className="city-select-wrapper">
        <select
          className="city-select"
          value={city}
          onChange={handleCityChange}
          disabled={isCurrentLocation}
        >
          {CITY_LIST.map(c => (
            <option key={c.value} value={c.value}>{c.name}</option>
          ))}
        </select>
        <button className="current-location-btn" onClick={handleCurrentLocation} type="button">
          내 위치 날씨
        </button>
      </div>
      <div className={`weather-card ${getWeatherAnim(weather?.desc)}`}>
        {loading ? (
          <div className="weather-loading">
            <div className="loader"></div>
            <div>날씨 정보를 불러오는 중...</div>
          </div>
        ) : error ? (
          <div className="weather-error">{error}</div>
        ) : weather ? (
          <>
            <div className="weather-city">{weather.city}</div>
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
              alt="날씨 아이콘"
            />
            <div className="weather-info">
              <div className="weather-temp">{weather.temp}°C</div>
              <div className="weather-desc">{weather.desc}</div>
              <div className="weather-detail">
                <span>체감: {weather.feels}°C</span>
                <span>습도: {weather.humidity}%</span>
                <span>풍속: {weather.wind} m/s</span>
              </div>
            </div>
          </>
        ) : null}
      </div>
      {/* 주간 예보 */}
      {forecast.length > 0 && (
        <div className="forecast-wrapper">
          <h2 className="forecast-title">5일간 예보</h2>
          <div className="forecast-list">
            {forecast.map((item, idx) => (
              <div className="forecast-card" key={idx}>
                <div className="forecast-day">{getDay(item.dt_txt)}</div>
                <img
                  className="forecast-icon"
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="예보 아이콘"
                />
                <div className="forecast-temp">{Math.round(item.main.temp)}°C</div>
                <div className="forecast-desc">{item.weather[0].description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App
