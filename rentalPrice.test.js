const rental = require('./rentalPrice')


describe('price tests', () => {
    test('Is driver over 18', () => {
        expect(rental.price('2024-01-01', '2024-02-02', 'Compact', 15, 15)).toBe('Driver too young.');
    });

    test('Is driver elligible to rent other cars', () => {
        expect(rental.price('2024-01-01', '2024-02-02', 'Racer', 15, 20)).toBe('Drivers younger than 21 can only rent compact cars.');
    });

    test('Is license older than 1 year', () => {
        expect(rental.price('2024-01-01', '2024-02-02', 'Compact', 0, 20)).toBe('Licenses under 1 year old cannot rent cars.');
    });

    test ('base price', () => {
        expect(rental.price('2024-02-19', '2024-03-03', 'Compact', 15, 20)).toBe('Price: $284.00');
    });

}); 

describe('function tests', () => {
    test('Is high season', () => {
        expect(rental.isHighSeason('2024-05-05', '2024-06-05')).toBe(true);
    });

    test('is racer under 25', () => {
        expect(rental.isRaceUnder25('Racer', 20)).toBe(true);
    });
    test('is long rental', () => {
        expect(rental.isLongRental(11)).toBe(true);
    });
    test('is license older', () => {
        expect(rental.isLicenseOlder(2)).toBe(true);
    });
    test('is license older older', () => {
        expect(rental.isLicenseOlderOlder(3)).toBe(true);
    });
});

describe('calculateTotalPrice tests', () => {
    test('calculateTotalPrice tests', () => {
        expect(rental.calculateTotalPrice(200, 0, 20, 'Compact', 10, true, 1, 0)).toBe(215);
    });

    test('Racer under 25', () => {
        expect(rental.calculateTotalPrice(200, 0, 24, 'Racer', 10, true, 1, 0)).toBe(215);
    });

});

test('calculatePrice tests', () => {
    expect(rental.calculatePrice(20, 10)).toBe(200);
});
test('total rent days', () => {
    expect(rental.totalRentDays('2024-01-01', '2024-02-02')).toBe(33);
});

describe('isHighSeason tests', () => {
  test('Pickup and dropoff in high season', () => {
    expect(rental.isHighSeason('2024-05-05', '2024-06-05')).toBe(true);
  });

  test('Pickup and dropoff outside high season', () => {
    expect(rental.isHighSeason('2024-03-05', '2024-11-05')).toBe(true);
  });
});

describe('tunnitoot tests', () => {
    test('is it weekend', () => {
        expect(rental.calculateTotalPrice(150, 50, 24, 'Racer', 10, true, 1, 1)).toBe(152.50);
    });

    test('count weekends', () => {
        expect(rental.countWeekends('2024-02-24', '2024-02-25')).toBe(2);
    });
});
