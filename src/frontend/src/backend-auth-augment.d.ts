// Augments backendInterface and Backend class with authorization mixin methods.
// Required when the authorization component is installed but the backend
// generator did not emit these methods into backend.d.ts.
import "./backend";

declare module "./backend" {
  interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    getCallerUserRole(): Promise<{ __tag: string }>;
    isCallerAdmin(): Promise<boolean>;
    assignCallerUserRole(user: unknown, role: unknown): Promise<void>;
  }

  // Augment Backend instance type so it satisfies the updated backendInterface
  interface Backend {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    getCallerUserRole(): Promise<{ __tag: string }>;
    isCallerAdmin(): Promise<boolean>;
    assignCallerUserRole(user: unknown, role: unknown): Promise<void>;
  }
}
