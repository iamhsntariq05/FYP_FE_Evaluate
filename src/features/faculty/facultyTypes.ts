export interface IFaculty {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  slots: string[];
  role: string;
  title: string;
  supervisorQuota: string;
  contact: string;
  userId: string;
  isAdmin: boolean;
  isCoordinator: boolean;
  isEvaluator: boolean;
  fypStage: number;
  image: string;
  isActive: boolean;
  password: string;
}
