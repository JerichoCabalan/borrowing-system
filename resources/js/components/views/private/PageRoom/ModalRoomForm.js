import { Button, Col, Form, Modal, notification, Row } from "antd";
import React, { useEffect } from "react";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";

export default function ModalRoomForm(props) {
    const { toggleModalRoomAdd, setToggleModalRoomAdd } = props;

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalRoomAdd({
            open: false,
            data: null,
        });
    };
    const { mutate: mutateModalRoom } = POST(`api/room_add`, ["room"]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleModalRoomAdd.data && toggleModalRoomAdd.data.id
                    ? toggleModalRoomAdd.data.id
                    : "",
        };

        let notifMessage = toggleModalRoomAdd.data?.id
            ? "Edit Room"
            : "Add Room";

        mutateModalRoom(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/room/add");
                    setToggleModalRoomAdd({
                        open: false,
                        data: null,
                    });
                } else {
                    notification.error({
                        message: notifMessage,
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    useEffect(() => {
        if (toggleModalRoomAdd.open) {
            form.setFieldsValue({
                room_number: toggleModalRoomAdd.data
                    ? toggleModalRoomAdd.data.room_number
                    : "",
                building_name: toggleModalRoomAdd.data
                    ? toggleModalRoomAdd.data.building_name
                    : "",
                subject_code: toggleModalRoomAdd.data
                    ? toggleModalRoomAdd.data.subject_code
                    : "",
                room_capacity: toggleModalRoomAdd.data
                    ? toggleModalRoomAdd.data.room_capacity
                    : "",
                room_type: toggleModalRoomAdd.data
                    ? toggleModalRoomAdd.data.room_type
                    : "",
            });
        }

        return () => {};
    }, [toggleModalRoomAdd]);

    return (
        <Modal
            title={(toggleModalRoomAdd.data?.id ? "EDIT" : "ADD") + " ROOM"}
            width={700}
            open={toggleModalRoomAdd.open}
            onCancel={handleCancel}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key="cancel"
                    // onClick={handleCancel}
                >
                    CANCEL
                </Button>,
                <Button
                    className="btn-main-primary"
                    type="primary"
                    size="large"
                    key="submit"
                    onClick={() => form.submit()}
                >
                    SUBMIT
                </Button>,
            ]}
        >
            <Form form={form} onFinish={onFinish}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="room_number">
                            <FloatInput
                                placeholder="Room Number"
                                label="Room Number"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="building_name">
                            <FloatInput
                                placeholder="Building Name"
                                label="Building Name"
                                required
                            />
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="subject_code">
                            <FloatInput
                                placeholder="Subject Code"
                                label="Subject Code"
                                required
                            />
                        </Form.Item>
                    </Col> */}
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="room_capacity">
                            <FloatInput
                                placeholder="Room Capacity"
                                label="Room Capacity"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="room_type">
                            <FloatSelect
                                placeholder="Room Type"
                                label="Room Type"
                                options={[
                                    {
                                        value: "Lecture",
                                        label: "Lecture",
                                    },

                                    {
                                        value: "Lababoratory",
                                        label: "Lababoratory",
                                    },
                                    {
                                        value: "Studio",
                                        label: "Studio",
                                    },
                                    {
                                        value: "Semenar",
                                        label: "Semenar",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
