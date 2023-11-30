import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { useEffect, useState } from 'react';
import style from './markdown.module.scss';

const MarkDown = ({ text }) => {
    // const [markdown, setMarkdown] = useState('');

    // useEffect(() => {
    //     import('./solution.md').then((res) => {
    //         fetch(res.default)
    //             .then((res) => res.text())
    //             .then((res) => setMarkdown(res))
    //             .catch((err) => console.log(err));
    //     });
    // }, []);

    return (
        <ReactMarkdown
            children={text}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                        <div style={{ overflowY: 'auto' }}>
                            <div className={style.subtitle}>{match[1]}</div>
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                className={`${style.code_block} ${className}`}
                                PreTag="div"
                            />
                        </div>
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    );
                },
                h1({ node, children }) {
                    return <h1 className={style.subtitle}>{children}</h1>;
                },
                p({ node, children }) {
                    return <p className={style.normal_text}>{children}</p>;
                },
            }}
        />
    );
}

export default MarkDown;