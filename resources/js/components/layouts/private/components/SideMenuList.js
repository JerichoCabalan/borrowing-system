import {
    faBuildingUser,
    faCalendar,
    faChalkboardTeacher,
    faEnvelope,
    faHome,
    faNoteSticky,
    faScaleBalanced,
    faSchool,
    faShieldKeyhole,
    faUsers,
} from "@fortawesome/pro-light-svg-icons";
import { faClock, faWagonCovered } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";

export const adminHeaderMenuLeft = (
    <>
        {/* <div className="ant-menu-left-icon">
            <Link to="/subscribers/current">
                <span className="anticon">
                    <FontAwesomeIcon icon={faUsers} />
                </span>
                <Typography.Text>Subscribers</Typography.Text>
            </Link>
        </div> */}
    </>
);

export const adminHeaderDropDownMenuLeft = () => {
    const items = [
        // {
        //     key: "/subscribers/current",
        //     icon: <FontAwesomeIcon icon={faUsers} />,
        //     label: <Link to="/subscribers/current">Subscribers</Link>,
        // },
    ];

    return <Menu items={items} />;
};

export const adminSideMenu = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FontAwesomeIcon icon={faHome} />,
        moduleCode: "M-01",
    },
    {
        title: "Enrollment",
        path: "/enrollment",
        icon: <FontAwesomeIcon icon={faScaleBalanced} />,
        children: [
            {
                title: "Enrollment",
                path: "/enrollment/add",
                moduleCode: "M-02",
            },
        ],
    },
    {
        title: "Class Schedule",
        path: "/class-schedule/add",
        icon: <FontAwesomeIcon icon={faCalendar} />,
        children: [
            {
                title: "Class Schedule",
                path: "/class-schedule/add",
                moduleCode: "M-02",
            },
        ],
    },
    {
        title: "Student",
        path: "/student",
        icon: <FontAwesomeIcon icon={faUsers} />,
        children: [
            {
                title: "Student",
                path: "/student/add",
                moduleCode: "M-04",
            },
        ],
    },
    {
        title: "Intructor",
        path: "/instructor",
        icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
        children: [
            {
                title: "Intructor",
                path: "/instructor/add",
                moduleCode: "M-04",
            },
        ],
    },
    {
        title: "Room",
        path: "/room",
        icon: <FontAwesomeIcon icon={faSchool} />,
        children: [
            {
                title: "Room",
                path: "/room/add",
                moduleCode: "M-04",
            },
        ],
    },
    {
        title: "Subject",
        path: "/subject",
        icon: <FontAwesomeIcon icon={faNoteSticky} />,
        children: [
            {
                title: "Subject",
                path: "/subject/add",
                moduleCode: "M-04",
            },
        ],
    },
    // {
    //     title: "Waitlist",
    //     path: "/waitlist",
    //     icon: <FontAwesomeIcon icon={faWagonCovered} />,
    //     children: [
    //         {
    //             title: "Waitlist",
    //             path: "/waitlist/add",
    //             moduleCode: "M-04",
    //         },
    //     ],
    // },
    {
        title: "Department",
        path: "/department",
        icon: <FontAwesomeIcon icon={faBuildingUser} />,
        children: [
            {
                title: "Department",
                path: "/department/add",
                moduleCode: "M-04",
            },
        ],
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: <FontAwesomeIcon icon={faEnvelope} />,
        children: [
            {
                title: "Notifications",
                path: "/notification/add",
                moduleCode: "M-04",
            },
        ],
    },
    {
        title: "AdministrativeOverrides",
        path: "/administrativeoverride",
        icon: <FontAwesomeIcon icon={faShieldKeyhole} />,
        children: [
            {
                title: "AdministrativeOverrides",
                path: "/administrativeoverride/add",
                moduleCode: "M-05",
            },
        ],
    },
    // {
    //     title: "System Settings",
    //     path: "/system-settings",
    //     icon: <FontAwesomeIcon icon={faCogs} />,
    //     children: [
    //         {
    //             title: "Email Templates",
    //             path: "/system-settings/email-templates",
    //             moduleCode: "M-06",
    //         },
    //     ],
    // },
];
