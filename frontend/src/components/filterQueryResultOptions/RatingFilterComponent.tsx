import { Rating } from 'react-simple-star-rating';
import { Form } from 'react-bootstrap';
import { Fragment } from 'react';

type RatingFilterComponentProps = {
  setRatingsFromFilter :any
};

const RatingFilterComponent = ({
  setRatingsFromFilter,
}: RatingFilterComponentProps) => {
  return (
    <>
      <span className="fw-bold">Rating</span>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Fragment key={idx}>
          <Form.Check type="checkbox" id={`check-api-${idx}`}>
            <Form.Check.Input
              type="checkbox"
              isValid
              onChange={(e) =>
                setRatingsFromFilter((items:any) => {
                  return { ...items, [5 - idx]: e.target.checked };
                })
              }
            />
            <Form.Check.Label style={{ cursor: 'pointer' }}>
              <Rating readonly size={20} initialValue={5 - idx} />
            </Form.Check.Label>
          </Form.Check>
        </Fragment>
      ))}
    </>
  );
};

export default RatingFilterComponent;
