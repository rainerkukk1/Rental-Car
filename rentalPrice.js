const DAY_IN_MS = 24 * 60 * 60 * 1000;
const MONTH_NO_APRIL = 3;
const MONTH_NO_OCTOBER = 9;

function price(pickupDate, dropoffDate, carType, age) {
  const rentDays = totalRentDays(pickupDate, dropoffDate);
  const highSeason = isHighSeason(pickupDate, dropoffDate)

  if (isDriverUnderAge(age)) {
    return "Driver too young.";
  }

  if (isYoungDriver(age, carType)) {
    return "Drivers younger than 21 can only rent compact cars.";
  }   

  let basePrice = calculatePrice(age, rentDays);

  let rentalPrice = calculateTotalPrice(age, carType, rentDays, highSeason, basePrice)

  return formatPrice(rentalPrice)
}
function calculateTotalPrice(basePrice, age, carType, rentDays, highSeason) {
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
  return age <= 25 && carType === "Racer";
}

function isYoungDriver(age) {
  return age <= 21 && carType !== "Compact";
}

function isLongRental(rentDays) {
  rentDays > 10;
}

function formatPrice(rentalPrice) {
  return 'Price: $' + rentalPrice.toFixed(2);
}

exports.price = price;