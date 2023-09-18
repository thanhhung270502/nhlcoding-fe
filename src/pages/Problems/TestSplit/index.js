import Split from 'react-split-grid';
import './test.scss';
import Code from '../Problem/code';

function TestSplit() {
    return (
        <div className="test-body">
            <Split
                render={({ getGridProps, getGutterProps }) => (
                    <div className="gridd h-100" {...getGridProps()}>
                        <div className="test-a">a</div>
                        <div className="gutter-row gutter-row-1" {...getGutterProps('row', 1)} />
                        <div className="test-b">
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                            <div>b</div>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

export default TestSplit;
