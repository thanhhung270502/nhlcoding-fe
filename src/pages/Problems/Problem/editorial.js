import MarkDown from '~/components/MarkDown';
import style from './editorial.module.scss';
import { getProblemById } from '~/api/problems';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Editorial = () => {
    const { id } = useParams();
    const [text, setText] = useState("");

    useEffect(() => {
        async function fetchProblemByID(id) {
            const res = await getProblemById(id);
            setText(res.body.instruction);
        }

        fetchProblemByID(id);
    }, [id]);

    return (
        <div className={style.container}>
            <div className={style.title}>Instruction Article</div>
            <div className={style.approach}>
                <MarkDown text={text} />
            </div>
        </div>
    );
};

export default Editorial;
