import { ActivityRecommendation, WeatherResponse } from '../types/weather';

export function generateActivityRecommendations(weather: WeatherResponse): ActivityRecommendation[] {
  const current = weather.current;
  const temp = current.temperature;
  const wind = current.wind_speed_10m;
  const precip = current.precipitation;
  const humidity = current.relative_humidity_2m;
  const uv = current.uv_index;
  const code = current.weather_code;
  const isDay = current.is_day === 1;

  // Rain or storm condition helper
  const isRainingOrSnowing = code >= 51 || precip > 0.2;
  const isThunderstorm = code >= 95;
  const isSevereWind = wind > 40;

  const activities: ActivityRecommendation[] = [];

  // 1. Outdoor Running & Jogging
  let runScore = 100;
  let runStatus: ActivityRecommendation['status'] = 'Ideal';
  let runReason = 'Great outdoor conditions for a run.';
  let runTip = 'Stay hydrated and wear light breathable clothing.';

  if (isThunderstorm || isRainingOrSnowing) {
    runScore = 15;
    runStatus = 'Unfavorable';
    runReason = 'Precipitation or storm expected.';
    runTip = 'Consider indoor treadmill training or stretching.';
  } else if (temp > 32) {
    runScore = 40;
    runStatus = 'Caution';
    runReason = 'High heat index may cause dehydration.';
    runTip = 'Run early morning or evening when temperatures drop.';
  } else if (temp < 2) {
    runScore = 45;
    runStatus = 'Caution';
    runReason = 'Freezing temperature outdoor risk.';
    runTip = 'Wear insulated thermal layers and windbreakers.';
  } else if (wind > 25) {
    runScore = 60;
    runStatus = 'Good';
    runReason = 'Breezy wind resistance.';
    runTip = 'Run against wind first to return with wind assistance.';
  }

  activities.push({
    id: 'running',
    title: 'Outdoor Running & Jogging',
    category: 'sports',
    status: runStatus,
    iconName: 'Footprints',
    reason: runReason,
    tip: runTip,
    score: runScore,
  });

  // 2. Cycling & Biking
  let cycleScore = 100;
  let cycleStatus: ActivityRecommendation['status'] = 'Ideal';
  let cycleReason = 'Optimal road and weather conditions.';
  let cycleTip = 'Check tire pressure and wear bright reflective gear.';

  if (isThunderstorm || isSevereWind) {
    cycleScore = 10;
    cycleStatus = 'Unfavorable';
    cycleReason = 'Dangerous winds or lightning storm risks.';
    cycleTip = 'Avoid high speeds or open elevated roads.';
  } else if (isRainingOrSnowing) {
    cycleScore = 25;
    cycleStatus = 'Unfavorable';
    cycleReason = 'Slippery road surfaces and low visibility.';
    cycleTip = 'Ensure functioning headlights and fender guards.';
  } else if (wind > 20) {
    cycleScore = 55;
    cycleStatus = 'Caution';
    cycleReason = `Strong gusts up to ${Math.round(wind)} km/h.`;
    cycleTip = 'Hold handlebars firmly and keep center of gravity steady.';
  }

  activities.push({
    id: 'cycling',
    title: 'Cycling & Road Biking',
    category: 'sports',
    status: cycleStatus,
    iconName: 'Bike',
    reason: cycleReason,
    tip: cycleTip,
    score: cycleScore,
  });

  // 3. Outdoor Picnic & Dining
  let picnicScore = 95;
  let picnicStatus: ActivityRecommendation['status'] = 'Ideal';
  let picnicReason = 'Pleasant weather for outdoor gathering.';
  let picnicTip = 'Pack a blanket, sunscreen, and chilled beverages.';

  if (isRainingOrSnowing || isThunderstorm) {
    picnicScore = 0;
    picnicStatus = 'Unfavorable';
    picnicReason = 'Rain or storm forecast.';
    picnicTip = 'Switch to cozy indoor dining or café seating.';
  } else if (temp > 33) {
    picnicScore = 35;
    picnicStatus = 'Caution';
    picnicReason = 'Intense afternoon heat.';
    picnicTip = 'Seek shaded park trees or patio umbrellas.';
  } else if (temp < 10) {
    picnicScore = 30;
    picnicStatus = 'Caution';
    picnicReason = 'Chilly outdoor temperature.';
    picnicTip = 'Bring thermos flasks with hot tea or soup.';
  }

  activities.push({
    id: 'picnic',
    title: 'Outdoor Dining & Picnic',
    category: 'leisure',
    status: picnicStatus,
    iconName: 'UtensilsCrossed',
    reason: picnicReason,
    tip: picnicTip,
    score: picnicScore,
  });

  // 4. Stargazing & Night Sky
  let starScore = 90;
  let starStatus: ActivityRecommendation['status'] = 'Ideal';
  let starReason = 'Clear skies with crisp night visibility.';
  let starTip = 'Head away from city lights for clear Milky Way view.';

  if (isDay) {
    starScore = 50;
    starStatus = 'Caution';
    starReason = 'Daytime hours currently.';
    starTip = 'Plan for stargazing after dusk/sunset.';
  } else if (code >= 3 || isRainingOrSnowing) {
    starScore = 10;
    starStatus = 'Unfavorable';
    starReason = 'Heavy cloud cover or precipitation blocking stars.';
    starTip = 'Wait for clear high-pressure weather system.';
  }

  activities.push({
    id: 'stargazing',
    title: 'Stargazing & Astronomy',
    category: 'leisure',
    status: starStatus,
    iconName: 'Sparkles',
    reason: starReason,
    tip: starTip,
    score: starScore,
  });

  // 5. Laundry Drying Outdoors
  let laundryScore = 100;
  let laundryStatus: ActivityRecommendation['status'] = 'Ideal';
  let laundryReason = 'Sunlight and breeze will dry clothes rapidly.';
  let laundryTip = 'Hang heavy fabrics early for maximum drying efficiency.';

  if (isRainingOrSnowing) {
    laundryScore = 0;
    laundryStatus = 'Unfavorable';
    laundryReason = 'Active precipitation will wet clothes.';
    laundryTip = 'Use indoor clothes drying rack or tumble dryer.';
  } else if (humidity > 80) {
    laundryScore = 40;
    laundryStatus = 'Caution';
    laundryReason = 'High air humidity slows evaporation process.';
    laundryTip = 'Space items apart to maximize air circulation.';
  }

  activities.push({
    id: 'laundry',
    title: 'Outdoor Laundry Drying',
    category: 'home',
    status: laundryStatus,
    iconName: 'Shirt',
    reason: laundryReason,
    tip: laundryTip,
    score: laundryScore,
  });

  // 6. Driving & Travel Safety
  let driveScore = 95;
  let driveStatus: ActivityRecommendation['status'] = 'Ideal';
  let driveReason = 'Clear visibility and safe road conditions.';
  let driveTip = 'Maintain normal highway safety distances.';

  if (code === 45 || code === 48) {
    driveScore = 30;
    driveStatus = 'Caution';
    driveReason = 'Foggy conditions restricting distance visibility.';
    driveTip = 'Use low-beam headlights and reduce driving speed.';
  } else if (isThunderstorm || code === 65 || code >= 95) {
    driveScore = 20;
    driveStatus = 'Unfavorable';
    driveReason = 'Heavy rain, hydroplaning hazard or storm gusts.';
    driveTip = 'Increase follow distance and avoid flooded roads.';
  }

  activities.push({
    id: 'driving',
    title: 'Road Commute & Travel',
    category: 'travel',
    status: driveStatus,
    iconName: 'Car',
    reason: driveReason,
    tip: driveTip,
    score: driveScore,
  });

  // Sort by highest activity score first
  return activities.sort((a, b) => b.score - a.score);
}
