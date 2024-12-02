import { Button, Col, Form, Modal, notification, Row } from "antd";
import React, { useEffect } from "react";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import { POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";

export default function ModalInstuctor(props) {
    const { toggleModalInstructorAdd, setToggleModalInstructorAdd } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalInstructorAdd({
            open: false,
            data: null,
        });
    };
    const { mutate: mutateModalIns } = POST(`api/instructor_add`, [
        "instructor",
    ]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleModalInstructorAdd.data &&
                toggleModalInstructorAdd.data.id
                    ? toggleModalInstructorAdd.data.id
                    : "",
        };

        let notifMessage = toggleModalInstructorAdd.data?.id
            ? "Edit Instructor"
            : "Add Instructor";

        mutateModalIns(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/instructor/add");
                    setToggleModalInstructorAdd({
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
        if (toggleModalInstructorAdd.open) {
            form.setFieldsValue({
                first_name: toggleModalInstructorAdd.data
                    ? toggleModalInstructorAdd.data.first_name
                    : "",
                last_name: toggleModalInstructorAdd.data
                    ? toggleModalInstructorAdd.data.last_name
                    : "",
                email: toggleModalInstructorAdd.data
                    ? toggleModalInstructorAdd.data.email
                    : "",
                aviablility_hours: toggleModalInstructorAdd.data
                    ? toggleModalInstructorAdd.data.aviablility_hours
                    : "",
            });
        }

        return () => {};
    }, [toggleModalInstructorAdd]);
    return (
        <Modal
            title={
                (toggleModalInstructorAdd.data?.id ? "EDIT" : "ADD") +
                " INSTRUCTOR"
            }
            width={700}
            open={toggleModalInstructorAdd.open}
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
                        <Form.Item name="first_name">
                            <FloatInput
                                placeholder="First name"
                                label="First name"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="last_name">
                            <FloatInput
                                placeholder="Last name"
                                label="Last name"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="email">
                            <FloatInput
                                placeholder="Email"
                                label="Email"
                                required
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="aviablility_hours">
                            <FloatSelect
                                options={[
                                    { label: "6:00 AM", value: "6:00 AM" },
                                    { label: "6:30 AM", value: "6:30 AM" },
                                    { label: "7:00 AM", value: "7:00 AM" },
                                    { label: "7:30 AM", value: "7:30 AM" },
                                    { label: "8:00 AM", value: "8:00 AM" },
                                    { label: "8:30 AM", value: "8:30 AM" },
                                    { label: "9:00 AM", value: "9:00 AM" },
                                    { label: "9:30 AM", value: "9:30 AM" },
                                    { label: "10:00 AM", value: "10:00 AM" },
                                    { label: "10:30 AM", value: "10:30 AM" },
                                    { label: "11:00 AM", value: "11:00 AM" },
                                    { label: "11:30 AM", value: "11:30 AM" },
                                    { label: "12:00 PM", value: "12:00 PM" },
                                    { label: "12:30 PM", value: "12:30 PM" },
                                    { label: "1:00 PM", value: "1:00 PM" },
                                    { label: "1:30 PM", value: "1:30 PM" },
                                    { label: "2:00 PM", value: "2:00 PM" },
                                    { label: "2:30 PM", value: "2:30 PM" },
                                    { label: "3:00 PM", value: "3:00 PM" },
                                    { label: "3:30 PM", value: "3:30 PM" },
                                    { label: "4:00 PM", value: "4:00 PM" },
                                    { label: "4:30 PM", value: "4:30 PM" },
                                    { label: "5:00 PM", value: "5:00 PM" },
                                    { label: "5:30 PM", value: "5:30 PM" },
                                    { label: "6:00 PM", value: "6:00 PM" },
                                ]}
                                placeholder="Aviablility Hours"
                                label="Aviablility Hours"
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
