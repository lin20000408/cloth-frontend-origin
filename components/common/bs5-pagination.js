// boostrap5 sytle pagination
import ReactPaginate from 'react-paginate'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'

export default function BS5Pagination({ forcePage, onPageChange, pageCount }) {
  return (
    <ReactPaginate
      forcePage={forcePage}
      // nextLabel="下一頁 >"
      nextLabel={<MdKeyboardDoubleArrowRight />}
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      // previousLabel="< 上一頁"
      previousLabel={<MdKeyboardDoubleArrowLeft />}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  )
}
