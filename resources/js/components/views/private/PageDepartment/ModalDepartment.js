import { Button, Col, Form, Modal, notification, Row } from "antd";
import React, { useEffect } from "react";
import FloatSelect from "../../../providers/FloatSelect";
import FloatInput from "../../../providers/FloatInput";
import FloatDatePicker from "../../../providers/FloatDatePicker";
import notificationErrors from "../../../providers/notificationErrors";
import { POST } from "../../../providers/useAxiosQuery";
import { useNavigate } from "react-router-dom";

export default function ModalDepartment(props) {
    const { toggleModalDepartment, setToggleModalDepartment } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleCancel = () => {
        setToggleModalDepartment({
            open: false,
            data: null,
        });
    };

    const { mutate: mutateModalDepartment } = POST(`api/department_add`, [
        "department",
    ]);

    const onFinish = (values) => {
        let data = {
            ...values,
            id:
                toggleModalDepartment.data && toggleModalDepartment.data.id
                    ? toggleModalDepartment.data.id
                    : "",
        };

        let notifMessage = toggleModalDepartment.data?.id
            ? "Edit Department"
            : "Add Department";

        mutateModalDepartment(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: notifMessage,
                        description: res.message,
                    });
                    navigate("/department/add");
                    setToggleModalDepartment({
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
        if (toggleModalDepartment.open) {
            form.setFieldsValue({
                department_name: toggleModalDepartment.data
                    ? toggleModalDepartment.data.department_name
                    : "",
            });
        }

        return () => {};
    }, [toggleModalDepartment]);
    return (
        <Modal
            title={
                (toggleModalDepartment.data?.id ? "EDIT" : "ADD") +
                " Department"
            }
            width={500}
            open={toggleModalDepartment.open}
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
                        <Form.Item name="department_name">
                            <FloatInput
                                placeholder="Department Name"
                                label="Department Name"
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>{" "}
            </Form>
        </Modal>
    );
}
