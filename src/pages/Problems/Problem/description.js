import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById } from "~/api/problems";
import MarkDown from "~/components/MarkDown";

function Description() {
    const { id } = useParams();
    const [problem, setProblem] = useState({
        id: 0,
        title: "",
        level_id: 0,
        level_name: "",
        description: ""
    });

    useEffect(() => {
        async function fetchProblemByID(id) {
            const res = await getProblemById(id);
            setProblem(res.body);
        }

        fetchProblemByID(id);
    }, [id]);

    return (
        <div className="problem-description px-5 py-4">
            <div className="title">{`${problem.id}. ${problem.title}`}</div>
            <div className="level">
                Level: <span className={`level-${problem.level_id}`}>{problem.level_name}</span>
            </div>
            <div className="description">
                <MarkDown text={problem.description} />
            </div>
        </div>
    );
}

export default Description;
