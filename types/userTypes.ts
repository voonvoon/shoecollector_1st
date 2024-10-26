
export interface UserType {
    id: string, // add this to satisfy ts whne do authOptions.ts
    name: string;
    email: string;
    role: string;
    password:string;
    image?: string; // Optional property for image

  }
