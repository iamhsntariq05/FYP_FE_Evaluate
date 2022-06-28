import axios from "axios";
import { userType } from "src/types/user.enum";
import { loginStart, loginSuccess, loginError } from "./authSlice";

const API_URL = "http://localhost:8000/api";

// Asynchronous thunk action
export function loginStudent(email: string, password: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(loginStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/auth/student/login`, {
        password,
        email,
        // password: "nimo",
        // email: "nn@nn.com",
      });
      // console.log(data);
      localStorage.setItem("studentId", data.student._id);
      localStorage.setItem("email", data.student.email);
      const { token, student } = data;
      localStorage.setItem("id", student._id);
      const user = student;
      dispatch(loginSuccess({ token, user }));
    } catch (error) {
      console.log(error);

      dispatch(loginError("error"));
    }
  };
}
export function loginFaculty(email: string, password: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(loginStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/auth/faculty/login`, {
        password,
        email,
        // email:fac@fac.com
        // password:fac123
      });
      // console.log(data);
      const { token, faculty } = data;
      localStorage.setItem("id", faculty._id);
      const user = faculty;
      localStorage.setItem("facultyId", data.faculty._id);
      localStorage.setItem("token", token);
      localStorage.setItem("type", userType.FACULTY);
      dispatch(loginSuccess({ token, user }));
    } catch (error) {
      console.log(error);

      dispatch(loginError("error"));
    }
  };
}
export function loginAdmin(email: string, password: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(loginStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/auth/admin/login`, {
        password,
        email,
        // email:fac@fac.com
        // password:fac123
      });
      // console.log(data);
      localStorage.setItem("adminId", data.admin._id);
      const { token, admin } = data;
      localStorage.setItem("id", admin._id);
      const user = admin;
      dispatch(loginSuccess({ token, user }));
    } catch (error) {
      console.log(error);

      dispatch(loginError("error"));
    }
  };
}
