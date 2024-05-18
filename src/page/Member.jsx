import { useEffect, useState } from "react";
import ListTable from "../component/ListTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormModal from "../component/FormModal";

const Member = () => {
    const tableColumns = [
        "#", "name", "phone", "email"
    ];

    const formInput = [
        { label: "Name", name: "name", type: "text", required: true },
        { label: "Phone", name: "phone", type: "tel", pattern: '\\d{10}', required: true },
        { label: "Email", name: "email", type: "email", required: true },
    ]

    const [tableDatas, setTableDatas] = useState([]);
    const [open, setOpen] = useState(false);

    const getAllMember = async () => {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/member/get-all-members`,
            { method: "GET" })
            .then(res => res.json())
            .then(res => setTableDatas(res.data))
    }

    const onSubmit = (formData) => {
        console.log('formData', formData)
    }

    useEffect(() => {
        getAllMember();
    }, [])

    return (
        <Row className="d-flex justify-content-md-center">
            <Col>
                <Card>
                    <Card.Header as="h5">
                        <Row className="d-flex justify-content-around">
                            <Col className="my-auto">Member</Col>
                            <Col className="my-auto"><Button variant="success" onClick={() => setOpen(!open)}>Add Member</Button></Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <ListTable tableColumns={tableColumns} tableDatas={tableDatas} />
                        <FormModal formInput={formInput} title="Member" open={open} setOpen={setOpen} onSubmit={onSubmit} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Member;