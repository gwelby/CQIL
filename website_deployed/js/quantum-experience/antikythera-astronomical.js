/**
 * AntikytheraQuantumMechanism Astronomical Calculations
 * Contains astronomical calculation methods for the AntikytheraQuantumMechanism class
 */

// Extend the AntikytheraQuantumMechanism prototype with astronomical calculation methods
(function() {
    // Reference to the prototype
    const proto = AntikytheraQuantumMechanism.prototype;
    
    // Constants
    const PHI = 1.618033988749895; // Golden ratio (φ)
    const DEG_TO_RAD = Math.PI / 180;
    const RAD_TO_DEG = 180 / Math.PI;
    
    /**
     * Convert a JavaScript Date to Julian Day
     * @param {Date} date - JavaScript Date to convert
     * @returns {Number} - Julian Day Number
     * @private
     */
    proto._toJulianDay = function(date) {
        // Get UTC components
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // 1-12
        const day = date.getUTCDate();
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes();
        const second = date.getUTCSeconds();
        
        // Calculate decimal day
        const decimalDay = day + (hour / 24) + (minute / 1440) + (second / 86400);
        
        // Adjust month and year
        let adjYear = year;
        let adjMonth = month;
        if (month <= 2) {
            adjYear -= 1;
            adjMonth += 12;
        }
        
        // Calculate Julian Day
        const a = Math.floor(adjYear / 100);
        const b = 2 - a + Math.floor(a / 4);
        
        return Math.floor(365.25 * (adjYear + 4716)) + 
               Math.floor(30.6001 * (adjMonth + 1)) + 
               decimalDay + b - 1524.5;
    };
    
    /**
     * Calculate celestial positions for a given Julian Day
     * @param {Number} jd - Julian Day
     * @returns {Object} - Celestial positions and other data
     * @private
     */
    proto._calculateCelestialPositions = function(jd) {
        // Calculate days since J2000.0 (a common astronomical epoch)
        const T = (jd - 2451545.0) / 36525; // Julian centuries since J2000.0
        
        // Sun's mean longitude (in degrees)
        let sunLongitude = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360;
        if (sunLongitude < 0) sunLongitude += 360;
        
        // Sun's mean anomaly (in degrees)
        let sunMeanAnomaly = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
        if (sunMeanAnomaly < 0) sunMeanAnomaly += 360;
        
        // Sun's equation of center
        const sunEqCenter = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(sunMeanAnomaly * DEG_TO_RAD) +
                           (0.019993 - 0.000101 * T) * Math.sin(2 * sunMeanAnomaly * DEG_TO_RAD) +
                           0.000289 * Math.sin(3 * sunMeanAnomaly * DEG_TO_RAD);
        
        // Sun's true longitude
        const sunTrueLongitude = sunLongitude + sunEqCenter;
        
        // Moon's mean longitude (in degrees)
        let moonLongitude = 218.3165 + 481267.8813 * T;
        moonLongitude = moonLongitude % 360;
        if (moonLongitude < 0) moonLongitude += 360;
        
        // Moon's mean anomaly (in degrees)
        let moonMeanAnomaly = 134.9634 + 477198.8675 * T;
        moonMeanAnomaly = moonMeanAnomaly % 360;
        if (moonMeanAnomaly < 0) moonMeanAnomaly += 360;
        
        // Moon's corrected longitude (simplified)
        const moonCorrection = 6.289 * Math.sin(moonMeanAnomaly * DEG_TO_RAD);
        const moonTrueLongitude = (moonLongitude + moonCorrection) % 360;
        
        // Calculate lunar phase from sun-moon angle
        const elongation = (moonTrueLongitude - sunTrueLongitude + 360) % 360;
        const lunarPhase = elongation / 360; // 0 to 1
        
        // Calculate Mercury position (simplified)
        const mercuryPeriod = 87.969; // days
        const mercuryOffset = 20 * Math.sin((jd % mercuryPeriod) / mercuryPeriod * 2 * Math.PI);
        const mercuryLong = (sunTrueLongitude + mercuryOffset + 360) % 360;
        
        // Calculate Venus position (simplified)
        const venusPeriod = 224.701; // days
        const venusOffset = 10 * Math.sin((jd % venusPeriod) / venusPeriod * 2 * Math.PI);
        const venusLong = (sunTrueLongitude + venusOffset + 360) % 360;
        
        // Calculate Mars position (simplified)
        const marsPeriod = 686.98; // days
        const marsOffset = 15 * Math.sin((jd % marsPeriod) / marsPeriod * 2 * Math.PI);
        const marsLong = (sunTrueLongitude + marsOffset + 360) % 360;
        
        // Calculate Jupiter position (simplified)
        const jupiterPeriod = 4332.59; // days
        const jupiterOffset = 9 * Math.sin((jd % jupiterPeriod) / jupiterPeriod * 2 * Math.PI);
        const jupiterLong = (sunTrueLongitude + jupiterOffset + 360) % 360;
        
        // Calculate Saturn position (simplified)
        const saturnPeriod = 10759.22; // days
        const saturnOffset = 8 * Math.sin((jd % saturnPeriod) / saturnPeriod * 2 * Math.PI);
        const saturnLong = (sunTrueLongitude + saturnOffset + 360) % 360;
        
        // Calculate zodiac signs (0-11)
        const getZodiacIndex = (longitude) => Math.floor(longitude / 30) % 12;
        
        return {
            sun: {
                longitude: sunTrueLongitude,
                zodiacSign: getZodiacIndex(sunTrueLongitude)
            },
            moon: {
                longitude: moonTrueLongitude,
                zodiacSign: getZodiacIndex(moonTrueLongitude)
            },
            lunarPhase: lunarPhase,
            planets: {
                mercury: { 
                    longitude: mercuryLong, 
                    zodiacSign: getZodiacIndex(mercuryLong) 
                },
                venus: { 
                    longitude: venusLong, 
                    zodiacSign: getZodiacIndex(venusLong) 
                },
                mars: { 
                    longitude: marsLong, 
                    zodiacSign: getZodiacIndex(marsLong) 
                },
                jupiter: { 
                    longitude: jupiterLong, 
                    zodiacSign: getZodiacIndex(jupiterLong) 
                },
                saturn: { 
                    longitude: saturnLong, 
                    zodiacSign: getZodiacIndex(saturnLong) 
                }
            },
            date: {
                julianDay: jd
            }
        };
    };
    
    /**
     * Calculate the year in the 19-year Metonic cycle
     * @param {Date} date - Current date
     * @returns {Number} - Metonic year (1-19)
     * @private
     */
    proto._calculateMetonicYear = function(date) {
        // The Metonic cycle aligns the solar and lunar calendars
        // Year 1 of the cycle was 1 BCE
        const year = date.getFullYear();
        return ((year + 1) % 19) + 1;
    };
    
    /**
     * Calculate eclipse predictions
     * @param {Number} jd - Julian Day
     * @returns {Array} - Array of eclipse predictions
     * @private
     */
    proto._calculateEclipsePredictions = function(jd) {
        const positions = this.astronomy.positions;
        if (!positions) return [];
        
        // Eclipse prediction is based on proximity to lunar nodes and full/new moon
        // Saros cycle is approximately 6585.3213 days (18 years, 11 days, 8 hours)
        const sarosCycle = 6585.3213;
        
        // Simulate eclipse conditions
        // In reality, eclipses occur when the Moon is near a node of its orbit
        // We'll simulate this with a simplified model
        
        const eclipses = [];
        
        // Check if we're near a node (simplified)
        const isNearNode = Math.abs(Math.sin(positions.moon.longitude * DEG_TO_RAD)) < 0.1;
        
        // Check if we're near new moon or full moon
        const isNearNewMoon = positions.lunarPhase < 0.05 || positions.lunarPhase > 0.95;
        const isNearFullMoon = Math.abs(positions.lunarPhase - 0.5) < 0.05;
        
        // If we're near a node and near new/full moon, predict an eclipse
        if (isNearNode && (isNearNewMoon || isNearFullMoon)) {
            const eclipseType = isNearNewMoon ? 'solar' : 'lunar';
            
            // Calculate days until exact alignment
            const daysToEclipse = isNearNewMoon ? 
                (positions.lunarPhase < 0.05 ? positions.lunarPhase * 30 : (1 - positions.lunarPhase) * 30) : 
                Math.abs(positions.lunarPhase - 0.5) * 30;
            
            // Calculate date of eclipse
            const eclipseDate = new Date(this.state.currentDate);
            eclipseDate.setDate(eclipseDate.getDate() + daysToEclipse);
            
            // Calculate eclipse magnitude (simplified)
            const magnitude = 1 - (daysToEclipse / 3);
            
            // Add eclipse prediction
            eclipses.push({
                type: eclipseType,
                date: eclipseDate,
                magnitude: magnitude,
                sarosNumber: Math.floor((jd - 2451545.0) / sarosCycle) % 223
            });
        }
        
        // Also predict eclipses in the next Saros cycle
        const nextSarosDate = new Date(this.state.currentDate);
        nextSarosDate.setDate(nextSarosDate.getDate() + sarosCycle);
        
        return eclipses;
    };
    
    /**
     * Calculate overall celestial alignment strength (0-1)
     * This affects the quantum coherence
     * @returns {Number} - Alignment strength (0-1)
     * @private
     */
    proto._calculateCelestialAlignment = function() {
        const positions = this.astronomy.positions;
        if (!positions) return 0;
        
        // Alignment is stronger when:
        // 1. Planets are in harmonic angles (phi-related)
        // 2. Moon is at specific phases (new, quarter, full)
        // 3. Planets are at specific zodiac signs
        
        let alignment = 0;
        
        // Moon phase alignment (strongest at new, quarter, full)
        const moonPhaseAlignment = 1 - 2 * Math.abs(positions.lunarPhase % 0.25 - 0.125) / 0.25;
        alignment += moonPhaseAlignment * 0.3; // 30% weight
        
        // Calculate sun-moon angle (phi resonance)
        const sunMoonAngle = Math.abs(positions.sun.longitude - positions.moon.longitude);
        const phiAngle = 360 / PHI;
        const sunMoonPhiAlignment = 1 - Math.min(1, Math.abs(sunMoonAngle % phiAngle - phiAngle/2) / (phiAngle/2));
        alignment += sunMoonPhiAlignment * 0.2; // 20% weight
        
        // Mercury-Venus phi alignment
        const mercuryVenusAngle = Math.abs(positions.planets.mercury.longitude - positions.planets.venus.longitude);
        const mercuryVenusPhiAlignment = 1 - Math.min(1, Math.abs(mercuryVenusAngle % phiAngle - phiAngle/2) / (phiAngle/2));
        alignment += mercuryVenusPhiAlignment * 0.15; // 15% weight
        
        // Venus-Mars phi alignment
        const venusMarsAngle = Math.abs(positions.planets.venus.longitude - positions.planets.mars.longitude);
        const venusMarsPhiAlignment = 1 - Math.min(1, Math.abs(venusMarsAngle % phiAngle - phiAngle/2) / (phiAngle/2));
        alignment += venusMarsPhiAlignment * 0.15; // 15% weight
        
        // Zodiac sign alignment (planets in same sign or opposition)
        const zodiacAlignment = this._calculateZodiacAlignment();
        alignment += zodiacAlignment * 0.2; // 20% weight
        
        // Ensure result is between 0 and 1
        return Math.min(1, Math.max(0, alignment));
    };
    
    /**
     * Calculate zodiac sign alignment
     * @returns {Number} - Alignment strength (0-1)
     * @private
     */
    proto._calculateZodiacAlignment = function() {
        const positions = this.astronomy.positions;
        if (!positions) return 0;
        
        // Count planets in each sign
        const signCount = Array(12).fill(0);
        
        signCount[positions.sun.zodiacSign]++;
        signCount[positions.moon.zodiacSign]++;
        signCount[positions.planets.mercury.zodiacSign]++;
        signCount[positions.planets.venus.zodiacSign]++;
        signCount[positions.planets.mars.zodiacSign]++;
        signCount[positions.planets.jupiter.zodiacSign]++;
        signCount[positions.planets.saturn.zodiacSign]++;
        
        // Find maximum concentration
        const maxConcentration = Math.max(...signCount);
        
        // Calculate alignment (normalized)
        return (maxConcentration - 1) / 6;
    };
    
    /**
     * Get the name of a zodiac sign
     * @param {Number} index - Zodiac sign index (0-11)
     * @returns {String} - Zodiac sign name with symbol
     * @private
     */
    proto._getZodiacSign = function(index) {
        const signs = [
            "♈ Aries", "♉ Taurus", "♊ Gemini", "♋ Cancer", 
            "♌ Leo", "♍ Virgo", "♎ Libra", "♏ Scorpio",
            "♐ Sagittarius", "♑ Capricorn", "♒ Aquarius", "♓ Pisces"
        ];
        return signs[index % 12];
    };
    
    /**
     * Get the name of the lunar phase
     * @param {Number} phase - Lunar phase (0-1)
     * @returns {String} - Lunar phase name
     * @private
     */
    proto._getLunarPhaseName = function(phase) {
        if (phase < 0.025 || phase >= 0.975) return "New Moon";
        if (phase < 0.25) return "Waxing Crescent";
        if (phase < 0.275) return "First Quarter";
        if (phase < 0.475) return "Waxing Gibbous";
        if (phase < 0.525) return "Full Moon";
        if (phase < 0.725) return "Waning Gibbous";
        if (phase < 0.775) return "Last Quarter";
        return "Waning Crescent";
    };
    
    /**
     * Format next eclipse information
     * @returns {String} - Formatted eclipse information
     * @private
     */
    proto._formatNextEclipse = function() {
        if (!this.astronomy.eclipses || this.astronomy.eclipses.length === 0) {
            return "None predicted";
        }
        
        const eclipse = this.astronomy.eclipses[0];
        const eclipseDate = eclipse.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const eclipseType = eclipse.type.charAt(0).toUpperCase() + eclipse.type.slice(1);
        return `${eclipseType} on ${eclipseDate}`;
    };
    
})();
