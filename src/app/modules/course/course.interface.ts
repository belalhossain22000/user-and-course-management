import { Model, Types } from "mongoose";


export type TCourse = {
    title: string;
    instructor: string;
    categoryId: Types.ObjectId;
    price: number;
    tags: { name: string; isDeleted: boolean }[];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    durationInWeeks: number;
    details: {
        level: string;
        description: string;
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TQuery = { page?: number | undefined; limit?: number | undefined; sortBy?: string | undefined; sortOrder?: string | undefined; minPrice: any; maxPrice: any; tags: any; startDate: any; endDate: any; language: any; provider: any; durationInWeeks: any; level: any; }


export interface TCourseModel extends Model<TCourse> {
    // eslint-disable-next-line no-unused-vars
    isCourseExists(id: string): Promise<TCourse | null>;
}

//query string
//http://localhost:5000/api/courses?page=2&limit=10&sortBy=price&sortOrder=desc&minPrice=20&maxPrice=100&tags=Programming&startDate=2023-01-01&endDate=2023-12-31&language=English&provider=Tech%20Academy&durationInWeeks=8&level=Intermediate

