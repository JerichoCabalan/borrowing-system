import { Row, Button, Col, Table } from "antd";
import { useEffect, useState } from "react";
import { GET } from "../../../providers/useAxiosQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import TableRoom from "./TableRoom";
import ModalRoomForm from "./ModalRoomForm";

export default function PageRoom() {
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
        `api/room?${new URLSearchParams(tableFilter)}`,
        "room_add"
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);
    const [toggleModalRoomAdd, setToggleModalRoomAdd] = useState({
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
                            setToggleModalRoomAdd((ps) => ({
                                ...ps,
                                open: true,
                            }))
                        }
                    >
                        Add Room
                    </Button>
                </Col>

                <Col xs={24} sm={24} md={24}>
                    <TableRoom
                        dataSource={dataSource}
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        sortInfo={sortInfo}
                        setSortInfo={setSortInfo}
                    />
                </Col>

                <Col xs={24} sm={24} md={24}>
                    <ModalRoomForm
                        toggleModalRoomAdd={toggleModalRoomAdd}
                        setToggleModalRoomAdd={setToggleModalRoomAdd}
                    />
                </Col>
            </Row>
        </>
    );
}
