import {
    Row,
    Col,
    Table,
    Button,
    notification,
    Popconfirm,
    Tooltip,
} from "antd";
import { POST, GET } from "../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TableGlobalSearchAnimated,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
    TableShowingEntriesV2,
} from "../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faTrash,
    faUserGear,
} from "@fortawesome/pro-regular-svg-icons";
import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { faPlus } from "@fortawesome/pro-light-svg-icons";
import ModalInstuctor from "./ModalInstuctor";
import { useState } from "react";

export default function TableInstructor(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;
    console.log("dataSource", dataSource);
    const navigate = useNavigate();

    const {
        mutate: mutateDeactivateStudent,
        loading: loadingDeactivateStudent,
    } = POST(`api/user_deactivate`, "students_active_list");

    const handleDeactivate = (record) => {
        mutateDeactivateStudent(record, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Student",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Student",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    const onChangeTable = (sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };
    const [toggleModalInstructorAdd, setToggleModalInstructorAdd] = useState({
        open: false,
        data: null,
    });
    const { mutate: mutateDeleteAdmin, loading: loadingDeleteAdmin } = POST(
        `api/instructor_delete`,
        "instructor_add"
    );

    const handleDeleteDeduction = (record) => {
        mutateDeleteAdmin(
            { id: record.id },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        notification.success({
                            message: "Instrutor",
                            description: res.message,
                        });
                    } else {
                        notification.error({
                            message: "Instrutor",
                            description: res.message,
                        });
                    }
                },
            }
        );
    };
    return (
        <Row gutter={[12, 12]} id="tbl_wrapper">
            <Col xs={24} sm={24} md={24}>
                <div className="tbl-top-filter">
                    <Row gutter={[15, 15]}>
                        <Col>
                            <TableGlobalSearchAnimated
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[10, 10]}>
                        <Col>
                            <TableShowingEntriesV2 />
                        </Col>
                        <Col>
                            <TablePageSize
                                tableFilter={tableFilter}
                                setTableFilter={setTableFilter}
                            />
                        </Col>
                    </Row>
                </div>
            </Col>

            <Col xs={24} sm={24} md={24}>
                <Table
                    className="ant-table-default ant-table-striped"
                    dataSource={dataSource && dataSource.data.data}
                    rowKey={(record) => record.id}
                    pagination={false}
                    bordered={false}
                    onChange={onChangeTable}
                    scroll={{ x: "max-content" }}
                >
                    <Table.Column
                        title="Action"
                        key="action"
                        dataIndex="action"
                        align="center"
                        render={(text, record) => {
                            return (
                                <>
                                    <Button
                                        type="link"
                                        className="text-primary"
                                        name="btn_edit"
                                        onClick={() =>
                                            setToggleModalInstructorAdd(
                                                (ps) => ({
                                                    ...ps,
                                                    open: true,
                                                    data: record,
                                                })
                                            )
                                        }
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Button>

                                    <Popconfirm
                                        title="Are you sure to delete this data?"
                                        onCancel={() => {
                                            notification.error({
                                                message: "Instructor",
                                                description: "Data not Deleted",
                                            });
                                        }}
                                        onConfirm={() => {
                                            handleDeleteDeduction(record);
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            type="link"
                                            className="text-danger"
                                            name="btn_delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </Popconfirm>
                                </>
                            );
                        }}
                    />

                    <Table.Column
                        title="Fullname"
                        key="fullname"
                        dataIndex="fullname"
                        sorter={true}
                    />
                    <Table.Column
                        title="Email"
                        key="email"
                        dataIndex="email"
                        sorter={true}
                    />

                    <Table.Column
                        title="Aviablility Hours"
                        key="aviablility_hours"
                        sorter
                        dataIndex="aviablility_hours"
                    />
                </Table>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <div className="tbl-bottom-filter">
                    <TableShowingEntriesV2 />

                    <TablePagination
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        total={
                            dataSource &&
                            dataSource.data &&
                            dataSource.data.total > 0
                                ? dataSource.data.total
                                : 0
                        }
                        howLessItems={true}
                        showSizeChanger={false}
                        tblIdWrapper="tbl_wrapper"
                    />
                </div>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <ModalInstuctor
                    toggleModalInstructorAdd={toggleModalInstructorAdd}
                    setToggleModalInstructorAdd={setToggleModalInstructorAdd}
                />
            </Col>
        </Row>
    );
}
