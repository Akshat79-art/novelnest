export interface CreateUserProfileDTO {
    userId: string;
    phone: string;
    location: string;
}

export interface SignInUserDTO {
    email: string,
    password: string
}