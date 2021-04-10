import { Car } from "./car";
import { CreditCard } from "./creditCard";
import { RentalRent } from "./rentalRent";

export class RentalRentDetail {
    currentRental : RentalRent;
    dayNumber : number;
    car : Car;
    paymentAmount : number;
    currentCreditCard : CreditCard;
}