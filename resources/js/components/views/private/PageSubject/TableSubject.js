import { faPencil, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, notification, Popconfirm, Row, Table } from "antd";
import React, { useState } from "react";
import {
    TableGlobalSearchAnimated,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
    TableShowingEntriesV2,
} from "../../../providers/CustomTableFilter";

import ModalSubjectForm from "./ModalSubjectForm";
export default function TableSubject(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;

    const onChangeTable = (sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };

    const [toggleModalSubjectAdd, setToggleModalSubjectAdd] = useState({
        open: false,
        data: null,
    });

    const { mutate: mutateDeleteAdmin, loading: loadingDeleteAdmin } = POST(
        `api/subject_delete`,
        "subject_add"
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
                                        className="text-primary hide"
                                        onClick={() =>
                                            setToggleModalSubjectAdd((ps) => ({
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
                                        onConfirm={() => {
                                            handleDeleteDeduction(record);
                                        }}
                                        onCancel={() => {
                                            notification.error({
                                                message: "Subject",
                                                description: "Data not deleted",
                                            });
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            type="link"
                                            className="text-danger hide"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </Popconfirm>
                                </>
                            );
                        }}
                    />

                    <Table.Column
                        title="Department"
                        key="department_id"
                        dataIndex="department_id"
                        sorter={true}
                    />
                    <Table.Column
                        title="Subject Code"
                        key="subject_code"
                        dataIndex="subject_code"
                        sorter={true}
                    />
                    <Table.Column
                        title="Credits"
                        key="credits"
                        sorter
                        dataIndex="credits"
                    />
                    <Table.Column
                        title="weekly_hours"
                        key="weekly_hours"
                        sorter
                        dataIndex="weekly_hours"
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
                    <TableShowingEntries />
                    <TablePagination
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        setPaginationTotal={dataSource?.data.total}
                        showLessItems={true}
                        showSizeChanger={false}
                        tblIdWrapper="tbl_wrapper"
                    />
                </div>
            </Col>
            <ModalSubjectForm
                toggleModalSubjectAdd={toggleModalSubjectAdd}
                setToggleModalSubjectAdd={setToggleModalSubjectAdd}
            />
        </Row>
    );
}
