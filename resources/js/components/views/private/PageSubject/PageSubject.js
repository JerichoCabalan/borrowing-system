import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET } from "../../../providers/useAxiosQuery";
import ModalSubjectForm from "./ModalSubjectForm";
import TableSubject from "./TableSubject";

export default function PageSubject() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        status: "Active",
        from: location.pathname,
    });

    useEffect(() => {
        setTableFilter({
            page: 1,
            page_size: 50,
            search: "",
            sort_field: "created_at",
            sort_order: "desc",
        });

        setSortInfo({
            order: "descend",
            columnKey: "created_at",
        });

        return () => {};
    }, [location]);

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/subject?${new URLSearchParams(tableFilter)}`,
        "subject_add"
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);
    const [toggleModalSubjectAdd, setToggleModalSubjectAdd] = useState({
        open: false,
        data: null,
    });

    return (
        <>
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24}>
                    <Button
                        className="btn-main-primary"
                        type="primary"
                        size="large"
                        key="submit"
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={() =>
                            setToggleModalSubjectAdd((ps) => ({
                                ...ps,
                                open: true,
                            }))
                        }
                    >
                        Add Subject
                    </Button>
                </Col>

                <Col xs={24} sm={24} md={24}>
                    <TableSubject
                        dataSource={dataSource}
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        sortInfo={sortInfo}
                        setSortInfo={setSortInfo}
                    />
                </Col>

                <Col xs={24} sm={24} md={24}>
                    <ModalSubjectForm
                        toggleModalSubjectAdd={toggleModalSubjectAdd}
                        setToggleModalSubjectAdd={setToggleModalSubjectAdd}
                    />
                </Col>
            </Row>
        </>
    );
}
