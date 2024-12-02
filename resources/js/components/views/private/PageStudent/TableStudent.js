import { faPencil, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, notification, Popconfirm, Row, Table } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TableGlobalSearchAnimated,
    TablePageSize,
    TablePagination,
    TableShowingEntriesV2,
} from "../../../providers/CustomTableFilter";
import ModalStudentForm from "./ModalStudentForm";
import { POST } from "../../../providers/useAxiosQuery";

export default function TableStudent(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;

    const navigate = useNavigate();
    const [toggleModalStudentAdd, setToggleModalStudentAdd] = useState({
        open: false,
        data: null,
    });
    const onChangeTable = (sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };
    const { mutate: mutateDeleteAdmin, loading: loadingDeleteAdmin } = POST(
        `api/student_delete`,
        "student_add"
    );

    const handleDeleteDeduction = (record) => {
        mutateDeleteAdmin(
            { id: record.id },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        notification.success({
                            message: "Notifications",
                            description: res.message,
                        });
                    } else {
                        notification.error({
                            message: "Notifications",
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
                                            setToggleModalStudentAdd((ps) => ({
                                                ...ps,
                                                open: true,
                                                data: record,
                                            }))
                                        }
                                    >
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Button>

                                    <Popconfirm
                                        title="Are you sure to delete this data?"
                                        onCancel={() => {
                                            notification.error({
                                                message: "Student",
                                                description: "Data not deleted",
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
                        title="Student Number"
                        key="student_number"
                        dataIndex="student_number"
                        sorter
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
                        title="Date of Birth"
                        key="date_of_birth"
                        sorter
                        dataIndex="date_of_birth"
                    />
                    <Table.Column
                        title="Year Level"
                        key="year_level"
                        sorter
                        dataIndex="year_level"
                    />
                    <Table.Column
                        title="Enrollement Status"
                        key="enrollment_status"
                        sorter
                        dataIndex="enrollment_status"
                    />
                    <Table.Column
                        title="Date Enrolled"
                        key="date_enrolled"
                        sorter
                        dataIndex="date_enrolled"
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
                <ModalStudentForm
                    toggleModalStudentAdd={toggleModalStudentAdd}
                    setToggleModalStudentAdd={setToggleModalStudentAdd}
                />
            </Col>
        </Row>
    );
}
