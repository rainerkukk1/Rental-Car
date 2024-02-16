const DAY_IN_MS = 24 * 60 * 60 * 1000;
const MONTH_NO_APRIL = 3;
const MONTH_NO_OCTOBER = 9;

function price(pickupDate, dropoffDate, carType, licenseAge, age) {
  const rentDays = totalRentDays(pickupDate, dropoffDate); 
  const highSeason = isHighSeason(pickupDate, dropoffDate)
  console.log(highSeason)

  if (isDriverUnderAge(age)) {
    return "Driver too young.";
  }

  if (isYoungDriver(age, carType)) {
    return "Drivers younger than 21 can only rent compact cars.";
  }
  
  if (!isLicenseValid(licenseAge)) {
    return "Licenses under 1 year old cannot rent cars."
  }

  let basePrice = calculatePrice(age, rentDays);

  let rentalPrice = calculateTotalPrice(basePrice, age, carType, rentDays, highSeason, licenseAge)
  return formatPrice(rentalPrice)
}
function calculateTotalPrice(basePrice, age, carType, rentDays, highSeason, licenseAge, isWeekend) {
  let rentalPrice = basePrice;
  if (highSeason) {
    rentalPrice = basePrice * 1.15;
  }

  if (isRaceUnder25(carType, age) && highSeason) {
    rentalPrice = basePrice * 1.5;
  }

  if (isLongRental(rentDays) && !highSeason) {
    rentalPrice = basePrice * 0.9;
  }
  
  if (!isLicenseOlder(licenseAge)) {
    rentalPrice = basePrice * 1.3;
  }

  if (!isLicenseOlderOlder(licenseAge) && highSeason) {
    rentalPrice = basePrice + 15;
  }

  if (isWeekend) {
    basePrice *= 1.05
  }

  return rentalPrice;
}


function calculatePrice(age, rentDays) {
  return age * rentDays;
}

function totalRentDays(pickupDate, dropoffDate) {
  const firstDate = new Date(pickupDate)
  const secondDate = new Date(dropoffDate)

  return Math.round((secondDate - firstDate) / DAY_IN_MS) + 1;
}

function isHighSeason(pickupDate, dropoffDate) {
  const pickupMonth = new Date(pickupDate).getMonth();
  const dropoffMonth = new Date(dropoffDate).getMonth();

  if ((pickupMonth >= MONTH_NO_APRIL && pickupMonth <= MONTH_NO_OCTOBER) ||
    (dropoffMonth >= MONTH_NO_APRIL && dropoffMonth <= MONTH_NO_OCTOBER) ||
    (pickupMonth < MONTH_NO_APRIL && dropoffMonth > MONTH_NO_OCTOBER)) {
    return true;
  }
}

function isDriverUnderAge(age) {
  return age < 18;
}

function isRaceUnder25(carType, age) {
  console.log(carType)
  return age <= 25 && carType === "Racer";
}

function isYoungDriver(age, carType) {
  return age <= 21 && carType !== "Compact";
}

function isLongRental(rentDays) {
  return rentDays > 10;
}

function formatPrice(rentalPrice) {
  return 'Price: $' + rentalPrice.toFixed(2);
}

function isLicenseValid(licenseAge) {
  return licenseAge >= 1;
}

function isLicenseOlder(licenseAge) {
  return licenseAge >= 2;
}

function isLicenseOlderOlder(licenseAge) {
  return licenseAge >= 3;
}

function countWeekends(pickupDate, dropoffDate) {
  let count = 0;
  let currentDate = new Date(pickupDate);

  while (currentDate <= dropoffDate) {
    const day = currentDate.getDay();
    if (day === 0 || day === 6) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return count;
}




exports.price = price;
exports.isHighSeason = isHighSeason;
exports.calculateTotalPrice = calculateTotalPrice;
exports.calculatePrice = calculatePrice;
exports.totalRentDays = totalRentDays;
exports.isDriverUnderAge = isDriverUnderAge;
exports.isRaceUnder25 = isRaceUnder25;
exports.isYoungDriver = isYoungDriver;
exports.isLongRental = isLongRental;
exports.formatPrice = formatPrice;
exports.isLicenseValid = isLicenseValid;
exports.isLicenseOlder = isLicenseOlder;
exports.isLicenseOlderOlder = isLicenseOlderOlder;
