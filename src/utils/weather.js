const TEMPERATURE_UNITS =  {
    metric: { sysName: 'metric', name: 'Celsius', suffix: '°C'},
    imperial: { sysName: 'imperial', name: 'Fahrenheit', suffix: '°F'},
}

const swapUnits = (currentUnit) => {
    const { metric, imperial } = TEMPERATURE_UNITS;
    return currentUnit === metric ? imperial : metric;
}

export { TEMPERATURE_UNITS, swapUnits }