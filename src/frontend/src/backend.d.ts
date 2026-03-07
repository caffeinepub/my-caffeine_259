import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AdmissionEntry {
    contact: string;
    dateOfBirth: string;
    yogaCode: string;
    name: string;
    submittedAt: bigint;
    idProof: string;
    email: string;
    idProofFileUrl?: ExternalBlob;
    address: string;
}
export interface CampInfo {
    timing: string;
    instructor: string;
    name: string;
    location: string;
}
export interface AttendanceRecord {
    present: boolean;
    yogaCode: string;
}
export interface backendInterface {
    addCamp(name: string, location: string, timing: string, instructor: string): Promise<void>;
    getAdmissionCount(): Promise<bigint>;
    getAllAdmissions(username: string, password: string): Promise<Array<AdmissionEntry>>;
    getAllCamps(): Promise<Array<CampInfo>>;
    /**
     * / New: Get attendance records for a specific date
     */
    getAttendance(date: string, username: string, password: string): Promise<Array<AttendanceRecord>>;
    /**
     * / New: Get all dates with saved attendance records
     */
    getAttendanceDates(username: string, password: string): Promise<Array<string>>;
    getCamp(name: string): Promise<CampInfo>;
    /**
     * / New: Save attendance records for a specific date
     */
    saveAttendance(date: string, records: Array<[string, boolean]>, username: string, password: string): Promise<void>;
    submitAdmission(name: string, address: string, contact: string, email: string, dateOfBirth: string, idProof: string, idProofFileUrl: ExternalBlob | null): Promise<string>;
}
