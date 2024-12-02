import { Button, Col, Form, Modal, notification, Row } from "antd";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import FloatInput from "../../../providers/FloatInput";
import FloatSelect from "../../../providers/FloatSelect";
import notificationErrors from "../../../providers/notificationErrors";
import { POST } from "../../../providers/useAxiosQuery";

export default function ModalStudentForm(props) {
    const { toggleModalStudentAdd, setToggleModalStudentAdd } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalStudentAdd({
            open: false,
            data: null,
        });
    };

    const { mutate: mutateModalStudent } = POST(`api/student_add`, ["student"]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleModalStudentAdd.data && toggleModalStudentAdd.data.id
                    ? toggleModalStudentAdd.data.id
                    : "",

            date_of_birth: values.date_of_birth
                ? moment(values.date_of_birth).format("YYYY-MM-DD")
                : "",

            date_enrolled: values.date_enrolled
                ? moment(values.date_enrolled).format("YYYY-MM-DD")
                : "",
        };

        let notifMessage = toggleModalStudentAdd.data?.id
            ? "Edit Student"
            : "Add Student";

        mutateModalStudent(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/student/add");
                    setToggleModalStudentAdd({
                        open: false,
                        data: null,
                        category: "Student",
                    });
                } else {
                    notification.error({
                        message: notifMessage,
                        description: res.message,
                        category: "Student",
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    useEffect(() => {
        if (toggleModalStudentAdd.open) {
            form.setFieldsValue({
                student_number: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.student_number
                    : "",
                first_name: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.first_name
                    : "",
                last_name: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.last_name
                    : "",

                email: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.email
                    : "",
                date_of_birth: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.date_of_birth
                    : "",
                year_level: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.year_level
                    : "",
                enrollment_status: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.enrollment_status
                    : "",
                date_enrolled: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.date_enrolled
                    : "",
                financial_hold: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.financial_hold
                    : "",
            });
        }

        return () => {};
    }, [toggleModalStudentAdd]);

    return (
        <Modal
            title={
                (toggleModalStudentAdd.data?.id ? "EDIT" : "ADD") + " Student"
            }
            width={700}
            open={toggleModalStudentAdd.open}
            onCancel={handleCancel}
            footer={[
                <Button
                    className="btn-main-primary outlined"
                    size="large"
                    key="cancel"
                    onClick={handleCancel}
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
                        <Form.Item name="student_number">
                            <FloatInput
                                placeholder="Student Number"
                                label="Student Number"
                                required
                            />
                        </Form.Item>
                    </Col>
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
                        <Form.Item name="date_of_birth">
                            <FloatDatePicker
                                placeholder="Date Of Birth"
                                label="Date Of Birth"
                                format="YYYY-MM-DD"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="year_level">
                            <FloatInput
                                placeholder="Year Level"
                                label="Year Level"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="enrollment_status">
                            <FloatSelect
                                label="Enrollment Status"
                                placeholder="Enrollment Status"
                                required
                                options={[
                                    {
                                        label: "Active",
                                        value: "Active",
                                    },
                                    {
                                        label: "Inctive",
                                        value: "Inctive",
                                    },
                                    {
                                        label: "Graduated",
                                        value: "Graduated",
                                    },
                                ]}
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="date_enrolled">
                            <FloatDatePicker
                                placeholder="Date Enrolled"
                                label="Date Enrolled"
                                format="YYYY-MM-DD"
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
