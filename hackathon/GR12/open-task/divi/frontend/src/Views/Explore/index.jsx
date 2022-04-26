import { Row } from 'react-bootstrap';
import Filters from '../../../src/Components/Explore/Filters'
import Properties from '../../Components/Explore/Properties'
import './styles.css';

const Explore = () => {
  return (
    <>
      <Row className="Properties-filters">
        <Filters className="Filters" />
      </Row>
      <Properties/>
    </>
  );
}

export default Explore;
