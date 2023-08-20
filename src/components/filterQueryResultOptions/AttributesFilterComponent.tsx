import { Form } from "react-bootstrap";

interface AttributeData {
  [key: string]: string[]; // Each attribute key maps to an array of strings
}

const AttributesFilterComponent = () => {
  const attributeData: AttributeData[] = [
    { color: ["red", "blue", "green"] },
    { ram: ["1 TB", "2 TB"] }
  ];

  return (
    <>
      {attributeData.map((item, idx) => (
        <div key={idx} className="mb-3">
          <Form.Label>
            <b>{Object.keys(item)[0]}</b> {/* Object.keys(item) returns an array, so [0] accesses the first key */}
          </Form.Label>
          {item[Object.keys(item)[0]].map((i, idx) => (
            <Form.Check key={idx} type="checkbox" label={i} />
          ))}
        </div>
      ))}
    </>
  );
};

export default AttributesFilterComponent;
