/* --- STATE --- */
export interface AuthState {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  isUserVerified: boolean;
  userDetails: object | any;
}
