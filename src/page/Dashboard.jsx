import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [totalFunds, setTotalFunds] = useState(0);

  const getTotalFunds = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/fund/get-total-funds`,
      { method: "GET" })
      .then(res => res.json())
      .then(resp => setTotalFunds(resp.data[0].totalFunds))
  }

  useEffect(() => {
    getTotalFunds();
  }, [])

  return (
    <Form.Group className="text-center mt-5 mx-5 py-4">
      <Form.Label>Total Fund</Form.Label>
      <Form.Control className='text-center' type="number" disabled readOnly value={totalFunds} />
    </Form.Group>
  )
}

export default Dashboard;