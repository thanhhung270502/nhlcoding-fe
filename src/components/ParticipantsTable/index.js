import clsx from 'clsx';
import styles from './ParticipantsTable.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
const { useState, useEffect } = require('react');
const { useNavigate } = require('react-router-dom');

const limits = [5, 10, 15, 20];

const ParticipantsTable = ({ participants, page }) => {
    const navigate = useNavigate();

    const [limit, setLimit] = useState(5);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + limit;

    const currentItems = participants.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(participants.length / limit);
    const [paginateInfo, setPaginateInfo] = useState({
        currentItems,
        pageCount,
    });

    const lastAccess = (thoiGianCuoiCung) => {
        var thoiGianHienTai = new Date().getTime();
        var thoiGianCuoiCungDate = new Date(thoiGianCuoiCung);
        var thoiGianCuoiCungMiliGiay = thoiGianCuoiCungDate.getTime();
        var thoiGianDaTruyCap = thoiGianHienTai - thoiGianCuoiCungMiliGiay;

        var thoiGianDaTruyCapGiay = thoiGianDaTruyCap / 1000;

        if (thoiGianDaTruyCapGiay < 60) {
            return Math.floor(thoiGianDaTruyCapGiay) + ' giây trước';
        } else if (thoiGianDaTruyCapGiay < 3600) {
            return Math.floor(thoiGianDaTruyCapGiay / 60) + ' phút trước';
        } else if (thoiGianDaTruyCapGiay < 86400) {
            return Math.floor(thoiGianDaTruyCapGiay / 3600) + ' giờ trước';
        } else {
            return Math.floor(thoiGianDaTruyCapGiay / 86400) + ' ngày trước';
        }
    };

    const handleChangeLimit = (lim) => {
        setLimit(lim);
    };

    const handlePageClick = (event) => {};

    useEffect(() => {
        setPaginateInfo({
            currentItems,
            pageCount,
        });
    }, [currentItems, pageCount]);

    return (
        <div className={clsx(styles.participantsBody)}>
            {paginateInfo.currentItems.map((participant, index) => {
                if (index % 2 === 0) {
                    return (
                        <div className={clsx(styles.participantsRow, styles.participantsEven)}>
                            <div className={clsx(styles.participantsCol1, styles.textCenter)}>{participant.ID}</div>
                            <div className={clsx(styles.participantsCol5)}>{participant.fullName}</div>
                            <div className={clsx(styles.participantsCol1)}>{participant.role}</div>
                            <div className={clsx(styles.participantsCol1)}>{participant.group}</div>
                            <div className={clsx(styles.participantsCol3)}>{lastAccess(participant.timeToAccess)}</div>
                            <div className={clsx(styles.participantsCol1)}>
                                <button className={clsx(styles.button, styles.buttonRemove)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className={clsx(styles.participantsRow, styles.participantsOdd)}>
                            <div className={clsx(styles.participantsCol1, styles.textCenter)}>{participant.ID}</div>
                            <div className={clsx(styles.participantsCol5)}>{participant.fullName}</div>
                            <div className={clsx(styles.participantsCol1)}>{participant.role}</div>
                            <div className={clsx(styles.participantsCol1)}>{participant.group}</div>
                            <div className={clsx(styles.participantsCol3)}>{lastAccess(participant.timeToAccess)}</div>
                            <div className={clsx(styles.participantsCol1)}>
                                <button className={clsx(styles.button, styles.buttonRemove)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    );
                }
            })}
            <div className={clsx(styles.footer)}>
                <div className={clsx(styles.page)} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {limit} / page
                    <span className="ps-3">
                        <FontAwesomeIcon icon={faCaretDown} />
                    </span>
                </div>
                <ul className={clsx('dropdown-menu', styles.participantDropdown)}>
                    {limits.map((lim) => {
                        if (lim === limit) {
                            return (
                                <li
                                    className={clsx(
                                        'd-flex',
                                        'align-items-center',
                                        'justify-content-between',
                                        'dropdown-item',
                                        styles.participantDropdownItem,
                                    )}
                                    onClick={() => {
                                        handleChangeLimit(lim);
                                    }}
                                >
                                    {lim}
                                    <span>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                </li>
                            );
                        } else
                            return (
                                <li
                                    className="dropdown-item"
                                    onClick={() => {
                                        handleChangeLimit(lim);
                                    }}
                                >
                                    {lim}
                                </li>
                            );
                    })}
                </ul>
                <ReactPaginate
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    // previousClassName="page-previous"
                    activeClassName={'active'}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={paginateInfo.pageCount}
                    previousLabel="<"
                    forcePage={page - 1}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};

export default ParticipantsTable;
