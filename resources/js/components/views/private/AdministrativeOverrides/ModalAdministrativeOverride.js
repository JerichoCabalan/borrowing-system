import { Button, Col, Form, Modal, notification, Row } from "antd";
import React, { useEffect } from "react";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import { POST } from "../../../providers/useAxiosQuery";
import notificationErrors from "../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function ModalAdministrativeOverride(props) {
    const {
        toggleModalAdministrativeOverride,
        setToggleModalAdministrativeOverride,
    } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalAdministrativeOverride({
            open: false,
            data: null,
        });
    };
    const { mutate: mutateModalIns } = POST(`api/admin_add`, [
        "administrative_overrides_add",
    ]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleModalAdministrativeOverride.data &&
                toggleModalAdministrativeOverride.data.id
                    ? toggleModalAdministrativeOverride.data.id
                    : "",
            date_approved: values.date_approved
                ? moment(values.date_approved).format("YYYY-MM-DD")
                : "",
        };

        let notifMessage = toggleModalAdministrativeOverride.data?.id
            ? "Edit AdministrativeOverride"
            : "Add AdministrativeOverride";

        mutateModalIns(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/administrativeoverride/add");
                    setToggleModalAdministrativeOverride({
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
        if (toggleModalAdministrativeOverride.open) {
            form.setFieldsValue({
                override_type: toggleModalAdministrativeOverride.data
                    ? toggleModalAdministrativeOverride.data.override_type
                    : "",
                justifications: toggleModalAdministrativeOverride.data
                    ? toggleModalAdministrativeOverride.data.justifications
                    : "",
                date_approved: toggleModalAdministrativeOverride.data
                    ? toggleModalAdministrativeOverride.data.date_approved
                    : "",
            });
        }

        return () => {};
    }, [toggleModalAdministrativeOverride]);
    return (
        <Modal
            title={
                (toggleModalAdministrativeOverride?.data?.id ? "EDIT" : "ADD") +
                " AdministrativeOverride"
            }
            width={700}
            open={toggleModalAdministrativeOverride.open}
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
                        <Form.Item name="override_type">
                            <FloatInput
                                placeholder="Override Type"
                                label="Override Type"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="justifications">
                            <FloatInput
                                placeholder="Justifications"
                                label="Justifications"
                                required
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={12}>
                        <Form.Item name="date_approved">
                            <FloatDatePicker
                                placeholder="Date Approved"
                                label="Date Approved"
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
