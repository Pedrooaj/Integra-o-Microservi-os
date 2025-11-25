import { Observable } from "rxjs";

export interface AuthGrpcService {
    validate(data: { token: string }): Observable<{ status: number, userId: string, valid: boolean }>;
}
