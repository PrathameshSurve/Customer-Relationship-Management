export interface User {
    name: string;
    uemail: string;
    upassword: string;
    initialSetupCompleted: boolean;
}

export interface UpdateUser{
    selectedIndustry?: string | null;
  selectedSecurityQuestion?: string | null;
  securityAnswer?: string | null;
}