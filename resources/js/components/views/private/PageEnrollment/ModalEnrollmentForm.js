import { Button, Col, Form, Modal, notification, Row } from "antd";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import FloatInput from "../../../providers/FloatInput";
import FloatSelect from "../../../providers/FloatSelect";
import notificationErrors from "../../../providers/notificationErrors";
import { POST } from "../../../providers/useAxiosQuery";

export default function ModalEnrollmentForm(props) {
    const { toggleModalStudentAdd, setToggleModalStudentAdd } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalStudentAdd({
            open: false,
            data: null,
        });
    };

    const { mutate: mutateModalStudent } = POST(`api/enrollment_add`, [
        "enrollment",
    ]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleModalStudentAdd.data && toggleModalStudentAdd.data.id
                    ? toggleModalStudentAdd.data.id
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
                    navigate("/enrollment/add");
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
                date_enrolled: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.date_enrolled
                    : "",
                subject_code: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.subject_code
                    : "",
                grade: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.grade
                    : "",

                status: toggleModalStudentAdd.data
                    ? toggleModalStudentAdd.data.status
                    : "",
            });
        }

        return () => {};
    }, [toggleModalStudentAdd]);

    return (
        <Modal
            title={
                (toggleModalStudentAdd.data?.id ? "EDIT" : "ADD") +
                " Enrollment"
            }
            width={700}
            open={toggleModalStudentAdd.open}
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
                        <Form.Item name="date_enrolled">
                            <FloatDatePicker
                                placeholder="Date Enrolled"
                                label="Date Enrolled"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="subject_code">
                            <FloatInput
                                placeholder="Subject Code"
                                label="Subject Code"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item
                            name="grade"
                            rules={[
                                {
                                    pattern: /^\d+(\.\d{2})?$/,
                                    message:
                                        "Please enter a valid grade (e.g. 12.00)",
                                },
                            ]}
                        >
                            <FloatInput
                                placeholder="Grade"
                                label="Grade"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="status">
                            <FloatSelect
                                placeholder="Status"
                                label="Status"
                                required
                                options={[
                                    {
                                        label: "Completed",
                                        value: "Completed",
                                    },
                                    {
                                        label: "Dropped",
                                        value: "Dropped",
                                    },
                                    {
                                        label: "Waitlisted",
                                        value: "Waitlisted",
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
