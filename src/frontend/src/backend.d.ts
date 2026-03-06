import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CampInfo {
    timing: string;
    instructor: string;
    name: string;
    location: string;
}
export interface backendInterface {
    addCamp(name: string, location: string, timing: string, instructor: string): Promise<void>;
    getAllCamps(): Promise<Array<CampInfo>>;
    getCamp(name: string): Promise<CampInfo>;
}
