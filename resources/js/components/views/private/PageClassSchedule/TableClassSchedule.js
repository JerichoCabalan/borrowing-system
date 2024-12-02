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
import ModalClassSchedule from "./ModalClassSchedule";
import { useState } from "react";

export default function TableClassSchedule(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;

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
    const [toggleModalClassSchedule, setToggleModalClassSchedule] = useState({
        open: false,
        data: null,
    });

    return (
        <Row gutter={[12, 12]} id="tbl_wrapper">
            <Col xs={24} sm={24} md={24}>
                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none hide"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => navigate(`/class-schedule/add`)}
                    size="large"
                >
                    Add Student
                </Button>
            </Col>
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
                                            setToggleModalClassSchedule(
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
                                        title="Are you sure to deactivate this data?"
                                        onConfirm={() => {
                                            handleDeactivate(record);
                                        }}
                                        onCancel={() => {
                                            notification.error({
                                                message: "Student",
                                                description:
                                                    "Data not deactivated",
                                            });
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
                        title="Start Time / End Time"
                        key="start_time"
                        dataIndex="start_time"
                        render={(text, record) => {
                            return (
                                <>
                                    {record.start_time} - {record.end_time}
                                </>
                            );
                        }}
                        sorter
                    />
                    <Table.Column
                        title="Day of Week"
                        key="day_of_week"
                        dataIndex="day_of_week"
                        sorter
                    />

                    <Table.Column
                        title="Max Student"
                        key="max_student"
                        dataIndex="max_student"
                        sorter={true}
                    />
                    <Table.Column
                        title="Semester"
                        key="semester"
                        sorter
                        dataIndex="semester"
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
                <ModalClassSchedule
                    toggleModalClassSchedule={toggleModalClassSchedule}
                    setToggleModalClassSchedule={setToggleModalClassSchedule}
                />
            </Col>
        </Row>
    );
}
