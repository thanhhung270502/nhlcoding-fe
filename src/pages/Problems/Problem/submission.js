import './submission.scss';

function Submission() {
    return (
        <div className="py-4 px-5">
            <div className="submission-head">
                <div className="d-flex align-items-center">
                    <div className="col-1-1">Status</div>
                    <div className="col-1-2">Language</div>
                    <div className="col-1-2">Runtime</div>
                    <div className="col-1-2">Memory</div>
                    <div className="col-1-3">Notes</div>
                </div>
            </div>
            <div className="submission-body">
                <div className="d-flex align-items-center py-2">
                    <div className="col-1-1">
                        <div className="d-flex flex-column submission-body-status">
                            <div className="status accept">Accepted</div>
                            <div className="date">Sep 05, 2023</div>
                        </div>
                    </div>
                    <div className="col-1-2">
                        <div className="language">Javascript</div>
                    </div>
                    <div className="col-1-2">2169 ms</div>
                    <div className="col-1-2">14.2MB</div>
                    <div className="col-1-3">...</div>
                </div>
                <div className="d-flex align-items-center py-2">
                    <div className="col-1-1">
                        <div className="d-flex flex-column submission-body-status">
                            <div className="status denied">Wrong answer</div>
                            <div className="date">Sep 05, 2023</div>
                        </div>
                    </div>
                    <div className="col-1-2">
                        <div className="language">Python</div>
                    </div>
                    <div className="col-1-2">...</div>
                    <div className="col-1-2">...</div>
                    <div className="col-1-3">...</div>
                </div>
                <div className="d-flex align-items-center py-2">
                    <div className="col-1-1">
                        <div className="d-flex flex-column submission-body-status">
                            <div className="status accept">Accepted</div>
                            <div className="date">Sep 05, 2023</div>
                        </div>
                    </div>
                    <div className="col-1-2">
                        <div className="language">Java</div>
                    </div>
                    <div className="col-1-2">2169 ms</div>
                    <div className="col-1-2">14.2MB</div>
                    <div className="col-1-3">...</div>
                </div>
            </div>
        </div>
    );
}

export default Submission;
