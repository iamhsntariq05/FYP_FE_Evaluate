import DescriptionIcon from "@mui/icons-material/Description";
import { ManageFaculty } from "src/components/admin/ManageFaculty";
import { ManageStudents } from "src/components/admin/ManageStudents";
import AdminCard from "src/components/adminprofile";
import ComplaintListAdmin from "src/components/Complain/complaintAdmin";
import ComplaintList from "src/components/Complain/ComplaintList";
import Submission from "src/components/dashboard/Project_submission";
import RubricList from "src/components/deliverables/RubricList";
import { PlagarismContainer } from "src/components/plagarismChecker/PlagarismContainer";
import { ProjectRequestList } from "src/components/projectRequest/ProjectRequestList";
import { AutomatedScheduler } from "src/components/scheduler/AutomatedScheduler";
import { SchedulerCalender } from "src/components/scheduler/SchedulerCalender";
// import { Projectdetails } from "src/components/EvaluatorsManagement/Projectdetails";
import { timeslot } from "src/components/Timeslotfaculty/TImeslot";
import AddFacultyContainer from "src/containers/AddFacultyContainer";
import AddStudentContainer from "src/containers/AddStudentContainer";
import AuthContainer from "src/containers/AuthContainer";
import GroupContainer from "src/containers/ComplaintContainer";
import { DeliverablesContainer } from "src/containers/DeliverablesContainer";
import { DeliverablesContainerStudent } from "src/containers/DeliverablesContainerStudent";
import DmcContainer from "src/containers/DmcContainer";
import { EvaluationTeams } from "src/containers/EvaluationTeamsContainer";
import FacultyDashboardContainer from "src/containers/FacultyDashboardContainer";
import { StudentContainer as FacultyStudentContainer } from "src/containers/facultyStudentRelationshipContainer";
import MeetingLoggerContainer from "src/containers/MeetingLoggerContainer";
import ProfileContainer from "src/containers/ProfileContainer";
import ProfileContainerFaculty from "src/containers/ProfileContainerFaculty";
import ProjectContainer from "src/containers/ProjectContainer";
import { StudentContainer } from "src/containers/StudentContainer";
import StudentGroupContainer from "src/containers/StudentGroupContainer";
import { TemplateContainer } from "src/containers/TemplateContainer";

export const routes = [
  {
    title: "auth",
    path: "/login",
    private: false,
    component: AuthContainer,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },
  {
    title: "Home",
    path: "/home",
    private: true,
    component: FacultyDashboardContainer,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },
  {
    title: "profile",
    path: "/profile",
    private: true,
    component: ProfileContainer,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },
  {
    title: "profile",
    path: "/faculty-profile",
    private: true,
    component: ProfileContainerFaculty,
    subRoutes: [],
  },
  {
    title: "group",
    path: "/project-group",
    private: true,
    component: StudentGroupContainer,
    subRoutes: [],
  },
  {
    title: "project",
    path: "/projects",
    private: true,
    component: ProjectContainer,
    subRoutes: [],
  },
  {
    title: "Deliverables",
    path: "/deliverables/faculty",
    private: true,
    component: DeliverablesContainer,
    subRoutes: [],
  },
  {
    title: "Deliverables",
    path: "/deliverables/admin",
    private: true,
    icon: DescriptionIcon,
    component: DeliverablesContainer,
    subRoutes: [],
  },

  {
    title: "RubricList",
    path: "/rubric-list",
    private: true,
    component: RubricList,
    subRoutes: [],
  },
  {
    title: "Evaluator Teams",
    path: "/evaluator-teams",
    private: true,
    component: EvaluationTeams,
    subRoutes: [],
  },
  {
    title: "templates",
    path: "/templates",
    private: true,
    component: TemplateContainer,
    subRoutes: [],
  },
  {
    title: "students",
    path: "/students",
    private: true,
    component: StudentContainer,
    subRoutes: [],
  },
  {
    title: " Faculty Students",
    path: "/facultyStudents",
    private: true,
    component: FacultyStudentContainer,
    subRoutes: [],
  },
  {
    title: "meeting-logger",
    path: "/meeting-logger",
    private: true,
    component: MeetingLoggerContainer,
    subRoutes: [],
  },

  // admin routes
  {
    path: "/manage/students",
    private: true,
    component: ManageStudents,
    subRoutes: [],
  },
  {
    title: "Time slot",
    path: "/timeslot",
    private: true,
    component: timeslot,
    subRoutes: [],
  },
  {
    path: "/add-students",
    private: true,
    component: AddStudentContainer,
    subRoutes: [],
  },
  {
    path: "/add-faculty",
    private: true,
    component: AddFacultyContainer,
    subRoutes: [],
  },
  {
    path: "/manage/faculty",
    private: true,
    component: ManageFaculty,
    subRoutes: [],
  },
  // {
  //   path: "/project/details",
  //   private: true,
  //   component: Projectdetails,
  //   subRoutes: [],
  // },
  {
    path: "/complaint/managecomplaints",
    private: true,
    component: GroupContainer,
    subRoutes: [],
  },
  {
    path: "/complaint/complainlist",
    private: true,
    component: ComplaintList,
    subRoutes: [],
  },
  {
    path: "/deliverables/student",
    private: true,
    component: DeliverablesContainerStudent,
    subRoutes: [],
  },
  {
    path: "/complaint/admincomplaint",
    private: true,
    component: ComplaintListAdmin,
    subRoutes: [],
  },
  // {
  //   path: "/report-dmc",
  //   private: true,
  //   subRoutes: [],
  //   component: DmcContainer,
  // },
  {
    path: "/calendar",
    private: true,
    component: SchedulerCalender,
    subRoutes: [],
  },
  {
    path: "/admin-profile",
    private: true,
    component: AdminCard,
    subRoutes: [],
    //   { icon: InfoIcon, component: HomePage1, path: "/page1", title: "Home Page 1" },
    //   { icon: NewReleasesIcon, component: HomePage2, path: "/page2", title: "Home Page 2" },
    // ],
  },
  {
    path: "/report-dmc",
    private: true,
    component: DmcContainer,
    subRoutes: [],
  },
  {
    path: "/project-requests",
    private: true,
    component: ProjectRequestList,
    subRoutes: [],
  },
  {
    path: "/plagiarism-checker",
    private: true,
    component: PlagarismContainer,
    subRoutes: [],
  },
  {
    path: "/automated-scheduler",
    private: true,
    component: AutomatedScheduler,
    subRoutes: [],
  },
];
