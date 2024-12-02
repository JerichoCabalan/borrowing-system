import { Button, Col, Form, Modal, notification, Row } from "antd";
import React, { useEffect } from "react";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import notificationErrors from "../../../providers/notificationErrors";
import { POST } from "../../../providers/useAxiosQuery";
import { useNavigate } from "react-router-dom";
import FloatTextArea from "../../../providers/FloatTextArea";
import moment from "moment";

export default function ModalNotifications(props) {
    const { toggleNotifications, setToggleNotifications } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleNotifications({
            open: false,
            data: null,
        });
    };

    const { mutate: mutateNotifications } = POST(`api/notification_add`, [
        "notification",
    ]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleNotifications.data && toggleNotifications.data.id
                    ? toggleNotifications.data.id
                    : "",
            date_sent: values.date_sent
                ? moment(values.date_sent).format("YYYY-MM-DD")
                : "",
        };

        let notifMessage = toggleNotifications.data?.id
            ? "Edit Department"
            : "Add Department";

        mutateNotifications(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/notification/add");
                    setToggleNotifications({
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
        if (toggleNotifications.open) {
            form.setFieldsValue({
                message: toggleNotifications.data
                    ? toggleNotifications.data.message
                    : "",
            });
        }

        return () => {};
    }, [toggleNotifications]);
    return (
        <Modal
            title={
                (toggleNotifications.data?.id ? "EDIT" : "ADD") +
                " Notifications"
            }
            width={500}
            open={toggleNotifications.open}
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
                        <Form.Item name="message">
                            <FloatTextArea
                                placeholder="Message"
                                label="Message"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="date_sent">
                            <FloatDatePicker
                                placeholder="Date Sent"
                                label="Date Sent"
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>{" "}
            </Form>
        </Modal>
    );
}
