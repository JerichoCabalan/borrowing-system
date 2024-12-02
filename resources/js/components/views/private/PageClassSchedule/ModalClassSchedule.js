import { Button, Col, Form, Modal, notification, Row, TimePicker } from "antd";
import React, { useEffect } from "react";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import moment from "moment";
import { POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";

export default function ModalClassSchedule(props) {
    const { toggleModalClassSchedule, setToggleModalClassSchedule } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalClassSchedule({
            open: false,
            data: null,
        });
    };
    const { mutate: mutateModalIns } = POST(`api/class_schedule_add`, [
        "class_schedule",
    ]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleModalClassSchedule.data &&
                toggleModalClassSchedule.data.id
                    ? toggleModalClassSchedule.data.id
                    : "",
        };

        let notifMessage = toggleModalClassSchedule.data?.id
            ? "Edit Class Schedule"
            : "Add Class Schedule";

        mutateModalIns(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/class-schedule/add");
                    setToggleModalClassSchedule({
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
        if (toggleModalClassSchedule.open) {
            form.setFieldsValue({
                start_time: toggleModalClassSchedule.data
                    ? toggleModalClassSchedule.data.start_time
                    : "",
                end_time: toggleModalClassSchedule.data
                    ? toggleModalClassSchedule.data.end_time
                    : "",
                day_of_week: toggleModalClassSchedule.data
                    ? toggleModalClassSchedule.data.day_of_week
                    : "",
                max_student: toggleModalClassSchedule.data
                    ? toggleModalClassSchedule.data.max_student
                    : "",
                semester: toggleModalClassSchedule.data
                    ? toggleModalClassSchedule.data.semester
                    : "",
            });
        }

        return () => {};
    }, [toggleModalClassSchedule]);

    return (
        <Modal
            title="Class Schedule"
            width={700}
            open={toggleModalClassSchedule.open}
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
                        <Form.Item name="start_time">
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
                                placeholder="Start Time"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="end_time">
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
                                placeholder="End Time"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="day_of_week">
                            <FloatSelect
                                placeholder="Day Of Week"
                                label="Day Of Week"
                                options={[
                                    {
                                        label: "Monday",
                                        value: "Monday",
                                    },
                                    {
                                        label: "Tuesday",
                                        value: "Tuesday",
                                    },
                                    {
                                        label: "Wednesday",
                                        value: "Wednesday",
                                    },
                                    {
                                        label: "Thursday",
                                        value: "Thursday",
                                    },
                                    {
                                        label: "Friday",
                                        value: "Friday",
                                    },
                                    {
                                        label: "Saturday",
                                        value: "Saturday",
                                    },
                                    {
                                        label: "Sunday",
                                        value: "Sunday",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="max_student">
                            <FloatInput
                                placeholder="Max  Student"
                                label="Max  Student"
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
                        <Form.Item name="semester">
                            <FloatSelect
                                placeholder="Semester"
                                label="Semester"
                                options={[
                                    {
                                        label: "First",
                                        value: "First",
                                    },
                                    {
                                        label: "Second",
                                        value: "Second",
                                    },
                                    {
                                        label: "Summer",
                                        value: "Summer",
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
