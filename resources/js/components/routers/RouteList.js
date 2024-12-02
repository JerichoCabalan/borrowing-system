import { faHome, faUsers } from "@fortawesome/pro-regular-svg-icons";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Page404 from "../views/errors/Page404";
import PageRequestPermission from "../views/errors/PageRequestPermission";

import PageLogin from "../views/public/PageLogin/PageLogin";

import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageEditProfile from "../views/private/PageEditProfile/PageEditProfile";

import PageClassSchedule from "../views/private/PageClassSchedule/PageClassSchedule";
import PageInstructor from "../views/private/PageInstructor/PageInstructor";
import PageStudent from "../views/private/PageStudent/PageStudent";
import PageSubject from "../views/private/PageSubject/PageSubject";
import PageDepartment from "../views/private/PageDepartment/PageDepartment";
import PageRoom from "../views/private/PageRoom/PageRoom";
import PageNotification from "../views/private/PageNotification/PageNotification";
import PageAdministrativeOverride from "../views/private/AdministrativeOverrides/PageAdministrativeOverride";
import PageEnrollment from "../views/private/PageEnrollment/PageEnrollment";
export default function RouteList() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute
                        title="LOGIN"
                        pageId="PageLogin"
                        component={PageLogin}
                    />
                }
            />

            <Route
                path="/edit-profile"
                element={
                    <PrivateRoute
                        moduleName="Edit Profile"
                        title="User"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserProfile"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                                link: "/dashboard",
                            },
                            {
                                name: "Edit Profile",
                            },
                        ]}
                        component={PageEditProfile}
                    />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <PrivateRoute
                        // moduleCode="M-01"
                        moduleName="Dashboard"
                        title="Dashboard"
                        subtitle="ADMIN"
                        pageId="PageDashboard"
                        pageHeaderIcon={faHome}
                        breadcrumb={[
                            {
                                name: "Dashboard",
                            },
                        ]}
                        component={PageDashboard}
                    />
                }
            />

            {/* users */}
            <Route
                path="/class-schedule/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Class Schedule"
                        title="Class Schedule"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Class Schedule",
                                link: "/class-schedule/add",
                            },
                        ]}
                        component={PageClassSchedule}
                    />
                }
            />
            <Route
                path="/student/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Student"
                        title="Student"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Student",
                                link: "/student/add",
                            },
                        ]}
                        component={PageStudent}
                    />
                }
            />
            <Route
                path="/instructor/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Instructor"
                        title="Instructor"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Instructor",
                                link: "/instructor/add",
                            },
                        ]}
                        component={PageInstructor}
                    />
                }
            />

            {/* <Route
                path="/waitlist/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Waitlist"
                        title="Waitlist"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Waitlist",
                                link: "/waitlist/add",
                            },
                        ]}
                        component={PageWaitlist}
                    />
                }
            /> */}
            <Route
                path="/subject/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Student"
                        title="Student"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Student",
                                link: "/subject/add",
                            },
                        ]}
                        component={PageSubject}
                    />
                }
            />
            <Route
                path="/department/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Department"
                        title="Department"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Department",
                                link: "/department/add",
                            },
                        ]}
                        component={PageDepartment}
                    />
                }
            />
            <Route
                path="/room/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Room"
                        title="Room"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Room",
                                link: "/room/add",
                            },
                        ]}
                        component={PageRoom}
                    />
                }
            />
            <Route
                path="/enrollment/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Enrollment"
                        title="Enrollment"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Enrollment",
                                link: "/enrollment/add",
                            },
                        ]}
                        component={PageEnrollment}
                    />
                }
            />
            <Route
                path="/notification/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName="Notification"
                        title="Notification"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: "Notification",
                                link: "/notification/add",
                            },
                        ]}
                        component={PageNotification}
                    />
                }
            />
            <Route
                path="/administrativeoverride/add"
                element={
                    <PrivateRoute
                        // moduleCode="M-02"
                        moduleName=" AdministrativeOverrides"
                        title=" AdministrativeOverrides"
                        subtitle="VIEW / EDIT"
                        pageId="PageUserCurrent"
                        pageHeaderIcon={faUsers}
                        breadcrumb={[
                            {
                                name: " AdministrativeOverrides",
                                link: "/administrativeoverride/add",
                            },
                        ]}
                        component={PageAdministrativeOverride}
                    />
                }
            />

            {/* end permission */}

            <Route
                path="/request-permission"
                element={<PageRequestPermission />}
            />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
