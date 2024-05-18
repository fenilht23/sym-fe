import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";

const ListTable = ({ tableColumns, tableDatas }) => {
    return <Row className="d-flex justify-content-md-center">
        <Col md="auto">
            <Card className="text-center">
                <Card.Body className="overflow-x-scroll">
                    <Table striped>
                        <thead>
                            <tr>
                                {
                                    tableColumns?.map((item, index) => <th key={index}>{item}</th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (tableDatas && tableDatas?.length > 0) ?
                                    (tableDatas?.map((item, index) => (<tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item[tableColumns[1]]}</td>
                                        <td>{item[tableColumns[2]]}</td>
                                        <td>{item[tableColumns[3]]}</td>
                                    </tr>))) : (<tr>
                                        <td colSpan={4}>No Data Available</td>
                                    </tr>)
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Col>
    </Row>
}

export default ListTable;