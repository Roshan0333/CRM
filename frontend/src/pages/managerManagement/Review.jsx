import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Table,
  Container,
} from "react-bootstrap";
import { ChevronDown, ChevronUp } from "lucide-react";

const Review = () => {
  const [open, setOpen] = useState(null);

  const toggleDropdown = (index) => {
    setOpen(open === index ? null : index);
  };

  const projectData = [
    { id: "1.", company: "Company Name", invoice: "Invoice no." },
    { id: "2.", company: "Company Name", invoice: "Invoice no." },
  ];

  return (
    <div
      className="main-content"
      style={{ marginLeft: "0", backgroundColor: "#fefefe" }}
    >
      <style>{`
        @media (min-width: 1000px) {
          .main-content {
            margin-left: 280px !important;
            width: calc(100% - 280px) !important;
          }
        }
        @media (max-width: 999px) {
          .main-content {
            width: 100% !important;
          }
        }
      `}</style>
      <Container fluid className=" px-3 px-md-4 py-4">
        <h3
          className=" mb-4"
          style={{
            fontSize: "35px",
            color: "#5A5C69",
            letterSpacing: "1px",
            fontWeight: "500",
          }}
        >
          Review
        </h3>

        {projectData.map((project, index) => (
          <Card
            className=""
            key={project.id}
            style={{
              border: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <Card.Header
              className="d-flex justify-content-between align-items-center bg-white"
              style={{
                fontSize: "18px",
                cursor: "pointer",
                padding: "16px 20px",
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                borderBottom: open === index ? "1px solid #dee2e6" : "none",
              }}
              onClick={() => toggleDropdown(index)}
            >
              <span className="fw-bold">
                {project.id} {project.company}
              </span>
              <span
                className="d-flex align-items-center fw-semibol"
                style={{ display: "flex", gap: "300px" }}
              >
                <span className="me-3 " style={{ fontWeight: "700" }}>
                  {project.invoice}
                </span>
                {open === index ? (
                  <ChevronDown size={25} />
                ) : (
                  <ChevronUp size={25} />
                )}
              </span>
            </Card.Header>
            <div
              style={{
                boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                marginTop: "20px",
              }}
            >
              {open === index && (
                <Card.Body style={{ padding: "24px" }}>
                  <Form>
                    <Row className="g-3 g-md-4">
                      <Col xs={12} md={6}>
                        <Form.Group className="mb-3 d-flex align-items-center">
                          <Form.Label
                            className="fw-semibold me-2 mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Client Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            style={{
                              width: "307px",
                              height: "35px",
                              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center">
                          <Form.Label
                            className="fw-semibold me-2 mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Contact number
                          </Form.Label>
                          <Form.Control
                            type="text"
                            style={{
                              width: "307px",
                              height: "35px",
                              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center">
                          <Form.Label
                            className="fw-semibold me-2 mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Start date
                          </Form.Label>
                          <Form.Control
                            type="text"
                            style={{
                              width: "307px",
                              height: "35px",
                              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center">
                          <Form.Label
                            className="fw-semibold me-2 mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Service Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            style={{
                              width: "307px",
                              height: "35px",
                              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group className="mb-3 d-flex align-items-center">
                          <Form.Label
                            className="fw-semibold me-2 mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Designation
                          </Form.Label>
                          <Form.Control
                            type="text"
                            style={{
                              width: "307px",
                              height: "35px",
                              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center">
                          <Form.Label
                            className="fw-semibold me-2 mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Email id
                          </Form.Label>
                          <Form.Control
                            type="email"
                            style={{
                              width: "307px",
                              height: "35px",
                              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center">
                          <Form.Label
                            className="fw-semibold me-2 mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            End date
                          </Form.Label>
                          <Form.Control
                            type="text"
                            style={{
                              width: "307px",
                              height: "35px",
                              backgroundColor: "#FEFEFE",
                              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Form.Group>

                        <div className="text-end mt-3 d-flex gap-4">
                          <Button
                            style={{
                              backgroundColor: "#4972E8",
                              border: "none",
                              fontSize: "14px",
                              fontWeight: "500",
                              width: "157px",
                              height: "33px",
                              padding: 0,
                            }}
                          >
                            Edit Team
                          </Button>
                          <Button
                            style={{
                              backgroundColor: "#4972E8",
                              border: "none",
                              padding: 0,
                              fontSize: "14px",
                              fontWeight: "500",
                              width: "157px",
                              height: "33px",
                            }}
                          >
                            View Team
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>

                  <div className="mt-4">
                    <h6
                      className="text-center mb-4"
                      style={{
                        fontSize: "25px",
                        fontWeight: "600",
                        textDecoration: "underline",
                        color: "#333",
                      }}
                    >
                      Company Details
                    </h6>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        className="table-responsive"
                        style={{ width: "546px", height: "189px" }}
                      >
                        <Table
                          bordered
                          hover
                          className="text-center align-middle mb-0"
                          style={{ fontSize: "14px" }}
                        >
                          <thead style={{ backgroundColor: "#f8f9fa" }}>
                            <tr>
                              <th
                                style={{ fontSize: "15px", fontWeight: "600" }}
                              >
                                Service
                              </th>
                              <th
                                style={{ fontSize: "15px", fontWeight: "600" }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className="text-center"
                                style={{
                                  fontSize: "13.46px",
                                  fontWeight: "500",
                                }}
                              >
                                Logo
                              </td>
                              <td style={{ padding: "12px" }}>
                                <div className="d-flex justify-content-center gap-2 flex-wrap">
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#4972E8",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "11px",
                                      fontWeight: "500",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Video
                                  </Button>
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#4972E8",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "11px",
                                      fontWeight: "600",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Download
                                  </Button>
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#28a745",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "13px",
                                      fontWeight: "500",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Upload
                                  </Button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-center"
                                style={{
                                  fontSize: "13.46px",
                                  fontWeight: "500",
                                }}
                              >
                                Banner
                              </td>
                              <td style={{ padding: "12px" }}>
                                <div className="d-flex justify-content-center gap-2 flex-wrap">
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#4972E8",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "11px",
                                      fontWeight: "500",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Message
                                  </Button>
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#4972E8",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "11px",
                                      fontWeight: "600",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Video / Audio
                                  </Button>
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#28a745",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "13px",
                                      fontWeight: "500",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Upload
                                  </Button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="text-center"
                                style={{
                                  fontSize: "13.46px",
                                  fontWeight: "500",
                                }}
                              >
                                Bold text column
                              </td>
                              <td style={{ padding: "12px" }}>
                                <div className="d-flex justify-content-center gap-2 flex-wrap">
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#4972E8",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "11px",
                                      fontWeight: "500",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Message
                                  </Button>
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#4972E8",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "11px",
                                      fontWeight: "600",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Video / Audio
                                  </Button>
                                  <Button
                                    size="sm"
                                    style={{
                                      backgroundColor: "#28a745",
                                      border: "none",
                                      width: "85px",
                                      height: "21px",
                                      fontSize: "13px",
                                      fontWeight: "500",
                                      borderRadius: "4px",
                                      padding: 0,
                                    }}
                                  >
                                    Upload
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-end mt-3 d-flex gap-3">
                <Button
                  style={{
                    backgroundColor: "#008000",
                    border: "none",
                    height: "33px",
                    width: "157px",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Approve
                </Button>
                <Button
                  style={{
                    backgroundColor: "#FF0000",
                    border: "none",
                    height: "33px",
                    width: "157px",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Review;
