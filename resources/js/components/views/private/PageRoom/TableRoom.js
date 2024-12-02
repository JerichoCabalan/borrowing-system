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
import ModalRoomForm from "./ModalRoomForm";
import { useState } from "react";

export default function TableRoom(props) {
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
    const [toggleModalRoomAdd, setToggleModalRoomAdd] = useState({
        open: false,
        data: null,
    });

    const { mutate: mutateDeleteAdmin, loading: loadingDeleteAdmin } = POST(
        `api/room_delete`,
        "room_add"
    );

    const handleDeleteDeduction = (record) => {
        mutateDeleteAdmin(
            { id: record.id },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        notification.success({
                            message: "Room",
                            description: res.message,
                        });
                    } else {
                        notification.error({
                            message: "Room",
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
                                            setToggleModalRoomAdd((ps) => ({
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
                                                message: "Room",
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
                        title="Room Number"
                        key="room_number"
                        dataIndex="room_number"
                        sorter
                    />
                    <Table.Column
                        title="Building Name"
                        key="building_name"
                        dataIndex="building_name"
                        sorter={true}
                    />

                    {/* <Table.Column
                        title="A"
                        key="subject_code"
                        sorter
                        dataIndex="subject_code"
                    /> */}
                    <Table.Column
                        title="Room Capacity"
                        key="room_capacity"
                        sorter
                        dataIndex="room_capacity"
                    />
                    <Table.Column
                        title="Room type"
                        key="room_type"
                        sorter
                        dataIndex="room_type"
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
                <ModalRoomForm
                    toggleModalRoomAdd={toggleModalRoomAdd}
                    setToggleModalRoomAdd={setToggleModalRoomAdd}
                />
            </Col>
        </Row>
    );
}
