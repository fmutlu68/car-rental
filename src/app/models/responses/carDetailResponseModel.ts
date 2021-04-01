import { CarDetail } from "../entities/carDetail";
import { ResponseModel } from "./responseModel";

export interface CarDetailResponseModel extends ResponseModel {
    carDetails: CarDetail[];
}
