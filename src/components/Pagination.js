import React from "react";
const Pagination = ({ postPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(totalPosts);

    return (
        <nav>
            <ul className="pagination">
                {

                    pageNumbers.map(number => (
                        <li onClick={() => paginate(number)}
                            key={number} className='page-item' >
                            <a className="page-link">
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination