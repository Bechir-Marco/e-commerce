import { Pagination } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

type PaginationComponentProps = {
  categoryName: any;
  searchQuery: any;
  paginationLinksNumber: any;
  pageNum: any;
};

const PaginationComponent = ({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}: PaginationComponentProps) => {
   const category = categoryName ? `category/${categoryName}/` : '';
   const search = searchQuery ? `search/${searchQuery}/` : '';
   const url = `/product-list/${category}${search}`;
  return (
    <Pagination>
      <LinkContainer to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </LinkContainer>
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
      {pageNum === paginationLinksNumber ? (
        <span>
          <Pagination.Next disabled />
        </span>
      ) : (
        <LinkContainer to={`${url}${pageNum + 1}`}>
          <Pagination.Next />
        </LinkContainer>
      )}
    </Pagination>
  );
};

export default PaginationComponent;
