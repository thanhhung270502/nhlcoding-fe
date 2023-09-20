import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const CustomEditor = (props) => {
    const { data, handleChange } = props;

    return <CKEditor editor={Editor} data={data} onChange={handleChange} />;
};

export default CustomEditor;
