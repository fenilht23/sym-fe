import { useEffect, useState } from "react";
import ListTable from "../component/ListTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormModal from "../component/FormModal";

const Fund = () => {
  const tableColumns = [
    "#", "name", "date", "fund"
  ];

  const formInput = [
    { label: "Name", name: "name", type: "select", required: true },
    { label: "Date", name: "date", type: "date", required: true },
    { label: "Fund", name: "fund", type: "number", required: true },
  ]

  const [tableDatas, setTableDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [optionDatas, setOptionDatas] = useState([]);

  const getAllMember = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/member/get-all-members`,
      { method: "GET" })
      .then(res => res.json())
      .then(res => setOptionDatas(res.data))
  }

  const getFundsByCurrentMonth = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/fund/get-funds-by-current-month`,
      { method: "GET" })
      .then(res => res.json())
      .then(res => setTableDatas(res.data))
  }

  const onSubmit = (formData) => {
    console.log('formData', formData)
  }

  useEffect(() => {
    getAllMember();
    getFundsByCurrentMonth();
  }, [])

  return (
    <Row className="d-flex justify-content-md-center">
      <Col>
        <Card>
          <Card.Header as="h5">
            <Row className="d-flex justify-content-around">
              <Col className="my-auto">Fund</Col>
              <Col className="my-auto"><Button variant="success" onClick={() => setOpen(!open)}>Add Fund</Button></Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <ListTable tableColumns={tableColumns} tableDatas={tableDatas} />
            <FormModal formInput={formInput} title="Fund" open={open} setOpen={setOpen} optionDatas={optionDatas} onSubmit={onSubmit} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Fund;