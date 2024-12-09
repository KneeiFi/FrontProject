export interface UserDTO {
  id: number;
  nickname: string | null;
  phoneNumber: string | null;
  userOnlineStatus: number; 
  lastLoggedIn: string | null; 
  userDescription: string | null;
  userIconFileName: string | null;
}

  export interface UserLoginDTO {
    login: string;
    password: string;
  }
  
  export interface CreateUserDTO {
    nickname: string;
    password: string;
    phoneNumber?: string;
    userDescription?: string;
    userIconFileName?: string;
  }