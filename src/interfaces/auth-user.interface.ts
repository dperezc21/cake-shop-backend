export interface RegisterUserInterface {
    id?: number,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    role?: string
}

export type UserInterface = Omit<RegisterUserInterface, 'password'>;