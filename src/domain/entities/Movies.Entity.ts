import { PlatformEntity } from "./Platform.Entities";
import { ReviewEntity } from "./Review.Entitis";

export class MoviesEntity{
    constructor(
        public _id:String,
        public title:String,
        public slug:String,
        public director:String,
        public score:number,
        public reviews: ReviewEntity[] = [],
        public platforms: PlatformEntity[] = [],
        public createdAt:Date,
        public UpdatedAt:Date
    ){}

}