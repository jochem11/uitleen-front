export type createUserRequestModel = {
  firstname: string;
  insertion?: string;
  lastname: string;
  email: string;
  cardNumber: number;
  groupId: number;
  courseId: number;
};

export default createUserRequestModel;
