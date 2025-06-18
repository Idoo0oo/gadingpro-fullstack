import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { faq } from "../data/index";

const FaqComponent = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleAccordionToggle = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <div className="faq py-5 bg-white">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center fw-bold">Pertanyaan Yang Sering Ditanyakan</h2>
            <p className="text-muted mx-auto text-center"
               style={{ maxWidth: "600px" }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, asperiores.
            </p>
          </Col>
        </Row>
        <Row className="row-cols-lg-2 row-cols-1 g-3 pt-5">
          {faq.map((data) => {
            const isActive = activeKey === data.eventKey;
            return (
              <Col key={data.id}>
                <Accordion 
                  className="shadow-sm"
                  activeKey={activeKey}
                  onSelect={handleAccordionToggle}
                >
                  <Accordion.Item eventKey={data.eventKey}>
                    <Accordion.Header>
                      <div className="d-flex justify-content-between align-items-center w-100 me-3">
                        <span>{data.title}</span>
                        <div 
                          className={`accordion-icon ${isActive ? 'active' : ''}`}
                          style={{
                            transition: 'all 0.3s ease',
                            color: isActive ? '#007bff' : '#6c757d'
                          }}
                        >
                          {isActive ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      {data.desc}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            )
          })}
        </Row>
      </Container>

      {/* Custom CSS untuk styling tambahan */}
      <style jsx>{`
        .accordion-icon {
          pointer-events: none;
        }
        
        .accordion-button:not(.collapsed) .accordion-icon {
          color: #ff6b35 !important;
        }
        
        .accordion-button {
          position: relative;
        }
        
        .accordion-button::after {
          display: none !important;
        }
      `}</style>
    </div>
  )
}

export default FaqComponent