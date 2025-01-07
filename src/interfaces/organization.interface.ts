
export interface OrganizationInterface {
    id?: number;
    organizationName: string;
    email: string;
    phone: string;
    image?: string;
    description: string;
}

export interface OrganizationRegister {
    userName: string;
    lastName: string;
    organizationName: string;
    organizationEmail: string;
    role: string;
    phone: string;
    email: string;
    password: string;
    description?: string;
}