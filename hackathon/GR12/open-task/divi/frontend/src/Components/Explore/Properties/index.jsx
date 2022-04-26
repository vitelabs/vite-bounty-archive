import { Container, Row } from 'react-bootstrap';
import Property from '../Property'
import './styles.css';

const Properties = () => {
  return (
    <>
      <Container>
        <Row className="Properties">
          <Property className="Property" propertyId={1}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH/Night" rooms="5 bed rooms" image={'/images/landingImage.png'} />
          <Property className="Property" propertyId={2}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/landingImage.png'} />
          <Property className="Property" propertyId={3}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/example5.png'} />
          <Property className="Property" propertyId={4}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/example5.png'} />
          <Property className="Property" propertyId={5}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/landingImage.png'} />
          <Property className="Property" propertyId={6}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/landingImage.png'} />
          <Property className="Property" propertyId={7}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/example5.png'} />
          <Property className="Property" propertyId={8}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/example5.png'} />
          <Property className="Property" propertyId={9}  title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/landingImage.png'} />
          <Property className="Property" propertyId={10} title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/landingImage.png'} />
          <Property className="Property" propertyId={11} title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/example5.png'} />
          <Property className="Property" propertyId={12} title="Miami Penthouse" text="Miami, FL- USA" price="186.87 ETH"       rooms="5 bed rooms" image={'/images/example5.png'} />
        </Row>
      </Container>
    </>
  );
}

export default Properties;
