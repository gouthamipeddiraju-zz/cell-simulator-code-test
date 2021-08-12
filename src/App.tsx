import Cells from './components/cells'
import { Navbar , Container, Nav, Row, Col} from 'react-bootstrap';
const App = () => {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Cell simulator</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/gouthamipeddiraju/cell-simulator-code-test">Github</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Container fluid>
        <Row>
          <Col>
            <Cells />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
