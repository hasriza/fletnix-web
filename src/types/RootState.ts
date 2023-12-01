import { AuthState } from 'app/pages/Auth/slice/types';
import { DetailPageState } from 'app/pages/DetailPage/slice/types';
import { ListingState } from 'app/pages/Listing/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth?: AuthState;
  detailPage?: DetailPageState;
  listing?: ListingState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
