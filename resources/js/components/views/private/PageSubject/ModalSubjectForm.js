import { Button, Col, Form, Modal, notification, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatInput from "../../../providers/FloatInput";
import FloatSelect from "../../../providers/FloatSelect";
import FloatTimePicker from "../../../providers/FloatTimePicker";
import notificationErrors from "../../../providers/notificationErrors";
import { POST } from "../../../providers/useAxiosQuery";

export default function ModalSubjectForm(props) {
    const { toggleModalSubjectAdd, setToggleModalSubjectAdd, department_id } =
        props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalSubjectAdd({
            open: false,
            data: null,
        });
    };

    const { mutate: mutateModalSubject } = POST(`api/subject_add`, ["subject"]);

    const onFinish = (values) => {
        let formattedWeeklyHours =
            values.weekly_hours && moment(values.weekly_hours).isValid()
                ? moment(values.weekly_hours).format("HH:mm")
                : null;

        let data = {
            ...values,

            weekly_hours: formattedWeeklyHours, // Ensure it's correctly formatted or null

            id:
                toggleModalSubjectAdd.data && toggleModalSubjectAdd.data.id
                    ? toggleModalSubjectAdd.data.id
                    : "",

            department_id,
        };

        let notifMessage = toggleModalSubjectAdd.data?.id
            ? "EditSubject"
            : "AddSubject";

        mutateModalSubject(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/subject/add");
                    setToggleModalSubjectAdd({
                        open: false,
                        data: null,
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
        if (toggleModalSubjectAdd.open) {
            form.setFieldsValue({
                subject_code: toggleModalSubjectAdd.data
                    ? toggleModalSubjectAdd.data.subject_code
                    : "",
                credits: toggleModalSubjectAdd.data
                    ? toggleModalSubjectAdd.data.credits
                    : "",
                last_name: toggleModalSubjectAdd.data
                    ? toggleModalSubjectAdd.data.last_name
                    : "",

                weekly_hours: toggleModalSubjectAdd.data
                    ? toggleModalSubjectAdd.data.weekly_hours
                    : "",
            });
        }

        return () => {};
    }, [toggleModalSubjectAdd]);
    // const handleWeeklyHoursChange = (time) => {
    //     if (time && moment(time).isValid()) {
    //         const formattedTime = moment(time).format("HH:mm");
    //         form.setFieldsValue({ weekly_hours: formattedTime });
    //     } else {
    //         form.setFieldsValue({ weekly_hours: null }); // Set to null if invalid time
    //     }
    // };

    return (
        <Modal
            title={
                (toggleModalSubjectAdd.data?.id ? "EDIT" : "ADD") + " Subject"
            }
            width={700}
            open={toggleModalSubjectAdd.open}
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
                        <Form.Item
                            name="subject_id
"
                        >
                            <FloatInput
                                placeholder="Subject"
                                label="Subject"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="department_id">
                            <FloatInput
                                placeholder="Department"
                                label="Department"
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
                        <Form.Item name="credits">
                            <FloatInput
                                placeholder="Credits"
                                label="Credits"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="weekly_hours">
                            <FloatInput
                                placeholder="Weekly Hours"
                                label="Weekly Hours"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="semester">
                            <FloatSelect
                                label="Semester"
                                placeholder="Semester"
                                required
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
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
