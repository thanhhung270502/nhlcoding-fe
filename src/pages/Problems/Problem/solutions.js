import { useCallback, useState } from 'react';
import './problem.scss';
import Split from 'react-split-grid';
import { langs } from '@uiw/codemirror-extensions-langs';
import Description from './description';
import Code from './code';
import images from '~/assets/images';

function Solution() {
    return (
        <div className="p-5">
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center problem-solution-search">
                    <div className="problem-solution-search-icon">
                        <i class="uil uil-search"></i>
                    </div>
                    <div className="problem-solution-search-input">
                        <input type="text" placeholder="Search for solution" className="form-control" />
                    </div>
                </div>
                <div className="problem-solution-sort">Sort by</div>
            </div>
            <div className="problem-solution-items">
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 problem-solution-item">
                    <div className="fw-bold title">3 Method's || C++ || JAVA || PYTHON || Beginner Friendly🔥🔥🔥</div>
                    <div className="d-flex align-items-center info">
                        <div className="d-flex align-items-center py-2">
                            <div className="avatar">
                                <img className="img-fluid" src="/images/avt.png" alt="" />
                            </div>
                            <div className="ps-2 name">kane-ly</div>
                            <div className="px-4">Jun 10, 2023</div>
                            <div className="d-flex">
                                <div className="tag">C++</div>
                                <div className="tag">Java</div>
                                <div className="tag">Python</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Solution;
