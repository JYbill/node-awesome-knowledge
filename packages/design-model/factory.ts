enum CarType {
  default = 'car',
  audi = 'Audi',
  bwm = 'BWM',
  benz = 'BENZ',
}
interface ICar {
  name: CarType;
}
abstract class Car implements ICar {
  abstract name: CarType;
}
class AudiCar extends Car {
  name: CarType = CarType.audi;
}
class BwmCar extends Car {
  name: CarType = CarType.bwm;
}
class BenzCar extends Car {
  name: CarType = CarType.benz;
}

class CarFactory {
  static creator(carType: CarType): Car {
    let car: Car | undefined;
    switch (carType) {
      case CarType.audi:
        car = new AudiCar();
        break;
      case CarType.bwm:
        car = new BwmCar();
        break;
      case CarType.benz:
        car = new BenzCar();
        break;
      default:
        break;
    }
    if (!car) {
      throw new Error('car is undefined');
    }
    return car;
  }
}

const myCar = CarFactory.creator(CarType.benz);
console.log(myCar);
